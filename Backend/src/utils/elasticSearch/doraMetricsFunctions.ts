import {
  //  BuildDatabaseDataItem,
  ChangeFailureRateDataItem,
  DeploymentDataItem,
  //  LEAD_TIME_STATUS_CLOSED,
  LeadTimeDataItem,
  MeanTimeToRestoreDataItem,
  REQ_STATUS_CLOSED,
  REQ_TYPE_BUGS,
  ReqDatabaseDataItem,
  RESULT_FAIL,
  RESULT_PASS,
  STATUS_BUILT,
} from '@models/index';
import { appLogger } from '@utils/index';
import { formIntervals } from '../common';
import { getBuildTableName, getReqTableName } from './getTableNames';
import { searchAll, searchAllCount } from './sdk';

/*
interface ESBuildDatabaseDataItem {
  _id: string;
  _index: string;
  _score: number;
  _source: BuildDatabaseDataItem;
  _type: string;
}
*/

interface ESReqDatabaseDataItem {
  _id: string;
  _index: string;
  _score: number;
  _source: ReqDatabaseDataItem;
  _type: string;
}

export const getDeploymentGraphData = async ({
  fromDate,
  teamIds,
  toDate,
}: {
  fromDate: Date;
  teamIds?: string[];
  toDate: Date;
}): Promise<DeploymentDataItem[]> => {
  appLogger.info({ getDeploymentGraphData: { teamIds, fromDate, toDate } });
  const filters: any[] = [];
  if (teamIds) {
    filters.push({ terms: { teamId: teamIds } });
    //    filters.push({terms: { teamId: teamIds.map((id: string) => id.toLowerCase()) } });
  }

  const finalResult: DeploymentDataItem[] = [];

  const intervals: Date[] = formIntervals(fromDate, toDate);
  for (let i = 1; i < intervals.length; i += 1) {
    let result: number = 0; //ESBuildDatabaseDataItem[] = [];

    const timestampRange = {
      gt: Math.floor(intervals[i - 1].getTime() / 1000),
      lte: Math.floor(intervals[i].getTime() / 1000),
    };
    const filters1 = [
      ...filters,
      { range: { timestamp: timestampRange } },
      { term: { status: STATUS_BUILT } },
      { term: { result: RESULT_PASS } },
    ];
    appLogger.debug({
      getDeploymentGraphData_searchAllCount_filters1: filters1,
    });
    result = await searchAllCount(getBuildTableName(), filters1, []);
    appLogger.debug({ getDeploymentGraphData_searchAllCount_result: result });
    //    result.forEach((res: ESBuildDatabaseDataItem) => {
    //      if (res._source.status === STATUS_BUILT) {
    //        if (res._source.result === RESULT_PASS) {
    //          data.countSuccessBuilds += 1;
    //        }
    //      }
    //    });
    const data: DeploymentDataItem = {
      countSuccessBuilds: result,
      timestamp: intervals[i].getTime(),
    };
    finalResult.push(data);
  }
  return finalResult;
};

export const getLeadTimeGraphData = async ({
  fromDate,
  teamIds,
  toDate,
}: {
  fromDate: Date;
  teamIds?: string[];
  toDate: Date;
}): Promise<LeadTimeDataItem[]> => {
  appLogger.info({ getLeadTimeGraphData: { teamIds, fromDate, toDate } });
  const filters: any[] = [];
  if (teamIds) {
    filters.push({ terms: { teamId: teamIds } });
    //        filters.push({terms: { teamId: teamIds.map((id: string) => id.toLowerCase()) } });
  }

  const finalResult: LeadTimeDataItem[] = [];

  const intervals: Date[] = formIntervals(fromDate, toDate);
  for (let i = 1; i < intervals.length; i += 1) {
    const data: LeadTimeDataItem = {
      issueCount: 0,
      timestamp: intervals[i].getTime(),
      totalLeadTime: 0,
    };
    let result: ESReqDatabaseDataItem[] = [];

    const closedOnRange = {
      gt: Math.floor(intervals[i - 1].getTime() / 1000),
      lte: Math.floor(intervals[i].getTime() / 1000),
    };
    //    const filters1 = [...filters, { range: { closedOn: closedOnRange } }, {term: { status: REQ_STATUS_CLOSED.toLowerCase()} }];
    const filters1 = [
      ...filters,
      { range: { closedOn: closedOnRange } },
      { term: { status: REQ_STATUS_CLOSED } },
    ];
    appLogger.debug({ getLeadTimeGraphData_searchAll_filters1: filters1 });
    result = await searchAll<ESReqDatabaseDataItem[]>(
      getReqTableName(),
      filters1,
      []
    );
    appLogger.debug({ getLeadTimeGraphData_searchAll_result: result });
    data.issueCount += result.length;
    result.forEach((res: ESReqDatabaseDataItem) => {
      data.totalLeadTime += res._source.closedOn
        ? Math.floor((res._source.closedOn - res._source.createdOn) / 60) //approximated to nearest minute
        : 0;
    });
    finalResult.push(data);
  }
  return finalResult;
};

export const getMeanTimeToRestoreGraphData = async ({
  fromDate,
  teamIds,
  toDate,
}: {
  fromDate: Date;
  teamIds?: string[];
  toDate: Date;
}): Promise<MeanTimeToRestoreDataItem[]> => {
  appLogger.info({
    getMeanTimeToRestoreGraphData: { teamIds, fromDate, toDate },
  });
  const filters: any[] = [];
  if (teamIds) {
    filters.push({ terms: { teamId: teamIds } });
    //        filters.push({terms: { teamId: teamIds.map((id: string) => id.toLowerCase()) } });
  }

  const finalResult: MeanTimeToRestoreDataItem[] = [];

  const intervals: Date[] = formIntervals(fromDate, toDate);
  for (let i = 1; i < intervals.length; i += 1) {
    const data: MeanTimeToRestoreDataItem = {
      issueCount: 0,
      timestamp: intervals[i].getTime(),
      totalRestoreTime: 0,
    };
    let result: ESReqDatabaseDataItem[] = [];

    const closedOnRange = {
      gt: Math.floor(intervals[i - 1].getTime() / 1000),
      lte: Math.floor(intervals[i].getTime() / 1000),
    };
    //    const filters1 = [...filters, { range: { closedOn: closedOnRange } }, {term: { status: REQ_STATUS_CLOSED.toLowerCase()} }];
    const filters1 = [
      ...filters,
      { range: { closedOn: closedOnRange } },
      { term: { status: REQ_STATUS_CLOSED } },
      { term: { itemType: REQ_TYPE_BUGS } },
    ];
    appLogger.debug({
      getMeanTimeToRestoreGraphData_searchAll_filters1: filters1,
    });
    result = await searchAll<ESReqDatabaseDataItem[]>(
      getReqTableName(),
      filters1,
      []
    );
    appLogger.debug({ getMeanTimeToRestoreGraphData_searchAll_result: result });
    data.issueCount += result.length;
    result.forEach((res: ESReqDatabaseDataItem) => {
      data.totalRestoreTime += res._source.closedOn
        ? Math.floor((res._source.closedOn - res._source.createdOn) / 60) //approximated to nearest minute
        : 0;
    });
    finalResult.push(data);
  }
  return finalResult;
};

export const getChangeFailureRateGraphData = async ({
  fromDate,
  teamIds,
  toDate,
}: {
  fromDate: Date;
  teamIds?: string[];
  toDate: Date;
}): Promise<ChangeFailureRateDataItem[]> => {
  appLogger.info({
    getChangeFailureRateGraphData: { teamIds, fromDate, toDate },
  });
  const filters: any[] = [];
  if (teamIds) {
    filters.push({ terms: { teamId: teamIds } });
    //    filters.push({terms: { teamId: teamIds.map((id: string) => id.toLowerCase()) } });
  }

  const finalResult: ChangeFailureRateDataItem[] = [];

  const intervals: Date[] = formIntervals(fromDate, toDate);
  for (let i = 1; i < intervals.length; i += 1) {
    const data: ChangeFailureRateDataItem = {
      countFailBuilds: 0,
      //      percentageOfFailureBuilds: 0,
      timestamp: intervals[i].getTime(),
      totalBuilds: 0,
    };
    //    let result: ESBuildDatabaseDataItem[] = [];

    const timestampRange = {
      gt: Math.floor(intervals[i - 1].getTime() / 1000),
      lte: Math.floor(intervals[i].getTime() / 1000),
    };
    const filters1 = [
      ...filters,
      { range: { timestamp: timestampRange } },
      { term: { status: STATUS_BUILT } },
    ];
    //    const filters1 = [...filters, { range: { timestamp: timestampRange } }];
    appLogger.debug({
      getChangeFailureRateGraphData_searchAllCount_filters1: filters1,
    });
    data.totalBuilds = await searchAllCount(getBuildTableName(), filters1, []);
    //    appLogger.debug({ getChangeFailureRateGraphData_searchAllCount_result: result });
    const filters2 = [
      ...filters,
      { range: { timestamp: timestampRange } },
      { term: { status: STATUS_BUILT } },
      { term: { result: RESULT_FAIL } },
    ];
    appLogger.debug({
      getChangeFailureRateGraphData_searchAllCount_filters2: filters2,
    });
    data.countFailBuilds = await searchAllCount(
      getBuildTableName(),
      filters2,
      []
    );
    //    result.forEach((res: ESBuildDatabaseDataItem) => {
    //      if (res._source.status === STATUS_BUILT) {
    //        data.totalCount += 1;
    //        if (res._source.result === RESULT_FAIL) {
    //          data.countFailBuilds += 1;
    //        }
    //      }
    //    });
    finalResult.push(data);
  }
  return finalResult;
};

import {
  ChangeFailureRateDataItem,
  DeploymentDataItem,
  IncidentDatabaseDataItem,
  LeadTimeDataItem,
  MeanTimeToRestoreDataItem,
  REQ_STATUS_CLOSED,
//  REQ_TYPE_BUG,
  ReqDatabaseDataItem,
  STATUS_FAILED,
  STATUS_INPROGRESS,
  STATUS_SUCCESS,
} from '@models/index';
import { appLogger } from '@utils/index';
import { formIntervals } from '../common';
import { getBuildTableName, getIncidentTableName, getReqTableName } from './getTableNames';
import { searchAll, searchAllCount } from './sdk';

interface ESReqDatabaseDataItem {
  _id: string;
  _index: string;
  _score: number;
  _source: ReqDatabaseDataItem;
  _type: string;
}

interface ESIncidentDatabaseDataItem {
  _id: string;
  _index: string;
  _score: number;
  _source: IncidentDatabaseDataItem;
  _type: string;
}

export const getDeploymentGraphData = async ({
  fromDate,
  services,
  teamIds,
  toDate,
}: {
  fromDate: Date;
  services?: string[];
  teamIds?: string[];
  toDate: Date;
}): Promise<DeploymentDataItem[]> => {
  appLogger.info({ getDeploymentGraphData: { teamIds, services, fromDate, toDate } });
  const filters: any[] = [];
  if (teamIds) {
    filters.push({ terms: { teamId: teamIds } });
    //    filters.push({terms: { teamId: teamIds.map((id: string) => id.toLowerCase()) } });
  }
  if (services) {
    const serviceRegexp: string = services.map((service: string) => `.*${service}.*`).join('|');
    filters.push({ regexp: { servicePath: serviceRegexp } });
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
      { range: { endTimestamp: timestampRange } },
      { term: { status: STATUS_SUCCESS } },
    ];
    appLogger.debug({
      getDeploymentGraphData_searchAllCount_filters1: filters1,
    });
    result = await searchAllCount(getBuildTableName(), filters1, []);
    appLogger.debug({ getDeploymentGraphData_searchAllCount_result: result });
    const data: DeploymentDataItem = {
      countBuilds: result,
      timestamp: intervals[i].getTime(),
    };
    finalResult.push(data);
  }
  return finalResult;
};

export const getLeadTimeGraphData = async ({
  fromDate,
  services,
  teamIds,
  toDate,
}: {
  fromDate: Date;
  services?: string[];
  teamIds?: string[];
  toDate: Date;
}): Promise<LeadTimeDataItem[]> => {
  appLogger.info({ getLeadTimeGraphData: { teamIds, services, fromDate, toDate } });
  const filters: any[] = [];
  if (teamIds) {
    filters.push({ terms: { teamId: teamIds } });
    //        filters.push({terms: { teamId: teamIds.map((id: string) => id.toLowerCase()) } });
  }
  if (services) {
    const serviceRegexp: string = services.map((service: string) => `.*${service}.*`).join('|');
    filters.push({ regexp: { servicePath: serviceRegexp } });
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
  services,
  teamIds,
  toDate,
}: {
  fromDate: Date;
  services?: string[];
  teamIds?: string[];
  toDate: Date;
}): Promise<MeanTimeToRestoreDataItem[]> => {
  appLogger.info({
    getMeanTimeToRestoreGraphData: { teamIds, services, fromDate, toDate },
  });
  const filters: any[] = [];
  if (teamIds) {
    filters.push({ terms: { teamId: teamIds } });
    //        filters.push({terms: { teamId: teamIds.map((id: string) => id.toLowerCase()) } });
  }
  if (services) {
    const serviceRegexp: string = services.map((service: string) => `.*${service}.*`).join('|');
    filters.push({ regexp: { servicePath: serviceRegexp } });
  }

  const finalResult: MeanTimeToRestoreDataItem[] = [];

  const intervals: Date[] = formIntervals(fromDate, toDate);
  for (let i = 1; i < intervals.length; i += 1) {
    const data: MeanTimeToRestoreDataItem = {
      issueCount: 0,
      timestamp: intervals[i].getTime(),
      totalRestoreTime: 0,
    };
    let result: ESIncidentDatabaseDataItem[] = [];

    const endedOnRange = {
      gt: Math.floor(intervals[i - 1].getTime() / 1000),
      lte: Math.floor(intervals[i].getTime() / 1000),
    };
    //    const filters1 = [...filters, { range: { endTime: endedOnRange } }, {term: { status: REQ_STATUS_CLOSED.toLowerCase()} }];
    const filters1 = [
      ...filters,
      { range: { endTime: endedOnRange } },
//      { term: { status: REQ_STATUS_CLOSED } },
//      { term: { itemType: REQ_TYPE_BUG } },
    ];
    appLogger.debug({
      getMeanTimeToRestoreGraphData_searchAll_filters1: filters1,
    });
    result = await searchAll<ESIncidentDatabaseDataItem[]>(
      getIncidentTableName(),
      filters1,
      []
    );
    appLogger.debug({ getMeanTimeToRestoreGraphData_searchAll_result: result });
    data.issueCount += result.length;
    result.forEach((res: ESIncidentDatabaseDataItem) => {
      data.totalRestoreTime += res._source.endTime
        ? Math.floor((res._source.endTime - res._source.startTime) / 60) //approximated to nearest minute
        : 0;
    });
    finalResult.push(data);
  }
  return finalResult;
};

export const getChangeFailureRateGraphData = async ({
  fromDate,
  services,
  teamIds,
  toDate,
}: {
  fromDate: Date;
  services?: string[];
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
  if (services) {
    const serviceRegexp: string = services.map((service: string) => `.*${service}.*`).join('|');
    filters.push({ regexp: { servicePath: serviceRegexp } });
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
      { range: { endTimestamp: timestampRange } },
      { terms: { status: [STATUS_SUCCESS, STATUS_FAILED, STATUS_INPROGRESS] } },
    ];
    //    const filters1 = [...filters, { range: { timestamp: timestampRange } }];
    appLogger.debug({
      getChangeFailureRateGraphData_searchAllCount_filters1: filters1,
    });
    data.totalBuilds = await searchAllCount(getBuildTableName(), filters1, []);
    //    appLogger.debug({ getChangeFailureRateGraphData_searchAllCount_result: result });
    const filters2 = [
      ...filters,
      { range: { endTimestamp: timestampRange } },
      { term: { status: STATUS_FAILED } },
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

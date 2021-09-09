import {
  BuildDatabaseDataItem,
  BuildGraphDataItem,
  BuildListDataItem,
  RESULT_FAIL,
  RESULT_INPROGRESS,
  RESULT_PASS,
  STATUS_BUILT,
} from '@models/index';
import { appLogger } from '@utils/index';
import { formIntervals } from '../common';
import { getBuildTableName } from './getTableNames';
import { searchAll } from './sdk';

interface ESBuildDatabaseDataItem {
  _id: string;
  _index: string;
  _score: number;
  _source: BuildDatabaseDataItem;
  _type: string;
}

export const getBuildGraphData = async ({
  fromDate,
  teamIds,
  toDate,
}: {
  fromDate: Date;
  teamIds?: string[];
  toDate: Date;
}): Promise<BuildGraphDataItem[]> => {
  appLogger.info({ getBuildGraphData: { teamIds, fromDate, toDate } });
  const filters: any[] = [];
  if(teamIds) {
    filters.push({terms: { teamId: teamIds } });
//    filters.push({terms: { teamId: teamIds.map((id: string) => id.toLowerCase()) } });
  }

  const finalResult: BuildGraphDataItem[] = [];

  const intervals: Date[] = formIntervals(fromDate, toDate);
  for (let i = 1; i < intervals.length; i += 1) {
    const data: BuildGraphDataItem = {
      countFailBuilds: 0,
      countOtherBuilds: 0,
      countSuccessBuilds: 0,
//      projectName: '',
//      teamId: '',
      timestampEnd: intervals[i].getTime(),
    };
    let result: ESBuildDatabaseDataItem[] = [];

    const timestampRange = {
      gt: Math.floor(intervals[i - 1].getTime() / 1000),
      lte: Math.floor(intervals[i].getTime() / 1000),
    };
    const filters1 = [...filters, { range: { timestamp: timestampRange } }];
    appLogger.debug({ getBuildGraphData_searchAll_filters1: filters1 });
    result = await searchAll<ESBuildDatabaseDataItem[]>(
      getBuildTableName(),
      filters1,
      []
    );
    appLogger.debug({ getBuildGraphData_searchAll_result: result });
    result.forEach((res: ESBuildDatabaseDataItem) => {
      if (res._source.status === STATUS_BUILT) {
        if (res._source.result === RESULT_PASS) {
          data.countSuccessBuilds += 1;
        } else if (res._source.result === RESULT_FAIL) {
          data.countFailBuilds += 1;
        } else {
          data.countOtherBuilds += 1;
        }
      } else {
        data.countOtherBuilds += 1;
      }
    });

    finalResult.push(data);
  }

  return finalResult;
};

export const getBuildListData = async ({
  fromDate,
  teamIds,
  toDate,
}: {
  fromDate: Date;
  teamIds?: string[];
  toDate: Date;
}): Promise<BuildListDataItem[]> => {
  appLogger.info({ getBuildListData: { teamIds, fromDate, toDate } });
  const filters: any[] = [];
  if(teamIds) {
    filters.push({terms: { teamId: teamIds } });
//    filters.push({terms: { teamId: teamIds.map((id: string) => id.toLowerCase()) } });
  }

  const finalResult: BuildListDataItem[] = [];
  let result: ESBuildDatabaseDataItem[] = [];

  const timestampRange = {
    gt: Math.floor(fromDate.getTime() / 1000),
    lte: Math.floor(toDate.getTime() / 1000),
  };
  filters.push({ range: { timestamp: timestampRange } });
  appLogger.debug({ getBuildListData_searchAll_filter: filters });
  result = await searchAll<ESBuildDatabaseDataItem[]>(
    getBuildTableName(),
    filters,
    []
  );
  appLogger.debug({ getBuildListData_searchAll_result: result });
  result.forEach((res: ESBuildDatabaseDataItem) => {
    const data: BuildListDataItem = {
      buildNum: res._source.buildNum,
      duration: res._source.duration,
      projectName: res._source.projectName,
      status:
        res._source.status === STATUS_BUILT
          ? res._source.result
          : RESULT_INPROGRESS,
      teamId: res._source.teamId,
      timestamp: res._source.timestamp * 1000,
      url: res._source.url,
    };

    finalResult.push(data);
  });

  return finalResult;
};

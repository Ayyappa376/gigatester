import {
//    ChangeFailureRateDataItem,
    DeploymentDataItem,
//    DORADataItem,
//    LeadTimeDataItem,
//    MeanTimeToRestoreDataItem,
    TrendDataItem
  } from '@models/index';

export function calculateDeploymentTrend(data: DeploymentDataItem[]): TrendDataItem[] {
    let xSum: number = 0;
    let ySum: number = 0;
    let xySum: number = 0;
    let xSqrSum: number = 0;
    let count: number = 0;

    data.forEach((elm: DeploymentDataItem) => {
        count += 1;

        const x = elm.timestamp;
        const y = elm.countBuilds;

        xSum += x;
        ySum += y;
        xySum += x * y;
        xSqrSum += x * x;
    });

    const slope: number = ((count * xySum) - (xSum * ySum)) / ((count * xSqrSum) - (xSum * xSum));
    const intercept: number = (ySum - (slope * xSum)) / count;

    const trendData: TrendDataItem[] = [];
    data.forEach((elm: DeploymentDataItem) => {
        trendData.push({
            timestamp: elm.timestamp,
            value: (slope * elm.timestamp) + intercept,
        });
    });

    return trendData;
}

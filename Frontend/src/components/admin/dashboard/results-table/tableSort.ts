import { IResultsTable, ResultsTableItem } from './resultsTable';

/* const calculateSum = (item: ResultsTableItem) => {
    const weightageObjectKeys = Object.keys(item.weightage);
    const sum = item.weightage[weightageObjectKeys[0]] + item.weightage[weightageObjectKeys[1]];
    if (sum === NaN) {
        return 0;
    }
    return sum;
}

const calculateTotal = (item: ResultsTableItem) => {
    let sum = 0;
    Object.keys(item.weightage).forEach(el => {
        sum = sum + item.weightage[el];
    })
    return sum;
}

const compare = (a: ResultsTableItem, b: ResultsTableItem) => {
    if (Object.keys(a.weightage).length <= 2) {
        return 1
    }
    if (Object.keys(b.weightage).length <= 2) {
        return -1
    }
    const sumOfBottomA = calculateSum(a);
    const sumOfBottomB = calculateSum(b);
    const totalA = calculateTotal(a);
    const totalB = calculateTotal(b);
    const percentageA = sumOfBottomA / totalA * 100;
    const percentageB = sumOfBottomB / totalB * 100;
    return (percentageA > percentageB ? -1 : 1);
} */

// tslint:disable-next-line: max-line-length
// sortFactor is: (((number of assessments scoring 10 * (max weightage - 10) + (number of assessments scoring 20 * (max weightage - 20)))/(total number of assessments * maximum weightage)) * 100
//TODO: Average of % score of individual questions in each assessment.
//      Reverse sort to get performance. i.e. lesser score means higher performance.
/*export const calculateSortFactor = (
  item: ResultsTableItem,
  additionalAnswers: number
) => {
  const weightageArray = Object.keys(item.weightage);
  const weightageArrayInteger: number[] = [];
  let totalAssessment = 0;
  weightageArray.forEach((el: string) => {
    weightageArrayInteger.push(parseInt(el, 10));
    totalAssessment = totalAssessment + item.weightage[el];
  });
  weightageArrayInteger.sort((a: number, b: number) => {
    return a > b ? 1 : -1;
  });
  let numeratorTotal = 0;
  weightageArrayInteger.forEach((el, i) => {
    // tslint:disable-next-line: max-line-length
    numeratorTotal =
      numeratorTotal +
      (weightageArrayInteger[weightageArrayInteger.length - 1] - el) *
        item.weightage[el.toString()];
  });
  const highestWeightageMultipliedByTotalNumber =
    weightageArrayInteger[weightageArrayInteger.length - 1] * totalAssessment;
  item.totalFactor =
    (highestWeightageMultipliedByTotalNumber - numeratorTotal) /
    totalAssessment;
  // tslint:disable-next-line: max-line-length
  return (numeratorTotal / highestWeightageMultipliedByTotalNumber) * 100;
};
*/
const compare = (a: ResultsTableItem, b: ResultsTableItem) => {
  /* const sortFactorA = calculateSortFactor(a);
    const sortFactorB = calculateSortFactor(b);
    return sortFactorA > sortFactorB ? -1 : 1; */
  return a.sortFactor < b.sortFactor ? -1 : 1;
};

export const sortTable = async (
  table: IResultsTable
): Promise<ResultsTableItem[]> => {
  return new Promise((resolve, reject) => {
    const tableArray: ResultsTableItem[] = [];
    Object.keys(table).forEach((el) => {
      tableArray.push(table[el]);
    });
    tableArray.sort(compare);
    return resolve(tableArray);
  });
};

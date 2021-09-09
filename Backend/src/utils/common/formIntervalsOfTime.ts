export function formIntervals(fromDate: Date, toDate: Date): Date[] {
  const intervals: Date[] = [];
  const oneHourInMS = 3600000;
  const oneDayInMS = 86400000;
  const gap =
    toDate.getTime() - fromDate.getTime() > oneDayInMS
      ? oneDayInMS
      : oneHourInMS;

  let date = new Date(fromDate.getTime());
  while (date.getTime() <= toDate.getTime()) {
    intervals.push(date);
    date = new Date(date.getTime() + gap);
  }

  return intervals;
}

export const checkIfDateWithinPeriod = (date, period) => {
  let dateFromDatabase = date;
  dateFromDatabase = dateFromDatabase.replace(/:| /g, '-');
  dateFromDatabase = dateFromDatabase.replace('T', '-');
  const YMDhms = dateFromDatabase.split('-');
  const correctDate = new Date();
  const radix = 10;
  correctDate.setFullYear(
    parseInt(YMDhms[0], radix),
    parseInt(YMDhms[1], radix) - 1,
    parseInt(YMDhms[2], radix)
  );
  correctDate.setHours(
    parseInt(YMDhms[3], radix),
    parseInt(YMDhms[4], radix),
    parseInt(YMDhms[5], radix),
    0
  );

  switch (period) {
    case 'day':
      return new Date() - correctDate < 86400000;
    case 'week':
      return new Date() - correctDate < 86400000 * 7;
    case 'month':
      return new Date() - correctDate < 86400000 * 31;
    case 'year':
      return new Date().getFullYear() - correctDate.getFullYear() < 1;
    default:
      return true;
  }
};

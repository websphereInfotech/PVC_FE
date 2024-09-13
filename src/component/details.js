// dateUtils.js
export const convertToIST = (date) => {
  if (!(date instanceof Date)) {
    console.error('Invalid date provided to convertToIST:', date);
    return '';
  }

  const offset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(date.getTime() + offset);
  const year = istDate.getFullYear();
  const month = String(istDate.getMonth() + 1).padStart(2, '0');
  const day = String(istDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

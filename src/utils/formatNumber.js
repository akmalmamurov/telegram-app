export const formatNumberWithSpaces = (num) => {
  if (num == null) { 
    return "0";
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

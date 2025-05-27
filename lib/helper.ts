export const formatNumber = (num) => {
  let formattedNum;

  if (num >= 1e9) {
    formattedNum = (num / 1e9).toFixed(2) + " billion";
  } else if (num >= 1e6) {
    formattedNum = (num / 1e6).toFixed(2) + " million";
  } else if (num >= 1e3) {
    formattedNum = (num / 1e3).toFixed(2) + " thousand";
  } else {
    formattedNum = num.toString();
  }

  // Remove trailing zeros
  formattedNum = formattedNum.replace(/\.00\b/, "");

  return formattedNum;
};

export const sortByDate = (data: any, isMovie: boolean = true) => {
  return data.sort((obj1: any, obj2: any) => {
    const date1 = new Date(isMovie ? obj1.release_date : obj1.first_air_date);
    const date2 = new Date(isMovie ? obj2.release_date : obj2.first_air_date);
    return date1.getTime() - date2.getTime();
  });
};

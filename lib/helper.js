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

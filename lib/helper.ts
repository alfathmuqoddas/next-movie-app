import type { Timestamp } from "firebase/firestore";

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

export const sortByDate = (data: any[], isMovie: boolean = true) => {
  return [...data].sort((obj1, obj2) => {
    const date1 = new Date(isMovie ? obj1.release_date : obj1.first_air_date);
    const date2 = new Date(isMovie ? obj2.release_date : obj2.first_air_date);

    if (isNaN(date1.getTime())) return 1;
    if (isNaN(date2.getTime())) return -1;

    return date1.getTime() - date2.getTime();
  });
};

export const timeAgo = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];
  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return count === 1
        ? `1 ${interval.label} ago`
        : `${count} ${interval.label}s ago`;
    }
  }

  return "just now";
};

export const convertBornDate = (date: string): string => {
  // Validate input format (yyyy-mm-dd)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    throw new Error("Invalid date format. Expected yyyy-mm-dd");
  }

  const birthDate = new Date(date);

  // Check if date is valid
  if (isNaN(birthDate.getTime())) {
    throw new Error("Invalid date");
  }

  // Format date to "Month Day, Year"
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = birthDate.toLocaleDateString("en-US", options);

  return `${formattedDate}`;
};

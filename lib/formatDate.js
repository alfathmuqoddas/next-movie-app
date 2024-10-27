"use client";
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Format date as needed
};

export default formatDate;

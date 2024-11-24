export const fetchData = async (endpoint, params = {}) => {
  // Construct the URL with query parameters
  const url = new URL(`https://api.themoviedb.org/3/${endpoint}`);
  url.search = new URLSearchParams({
    api_key: process.env.API_KEY,
    language: "en-US",
    page: params.page || 1,
    ...params, // spread any additional parameters
  }).toString();

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error.message);
    throw error;
  }
};

export const getMediaDetails = async (type, id) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.API_KEY}&language=en-US`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch details data");
    }
    const mediaDetails = await res.json();
    return mediaDetails;
  } catch (error) {
    console.error("Error fetching details data:", error.message);
    throw error;
  }
};

export const getCreditData = async (type, id) => {
  try {
    const credits = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`
    );
    const credit = await credits.json();
    return credit;
  } catch (error) {
    return console.log(error);
  }
};

export const getPicsData = async (type, id) => {
  try {
    const pics = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${process.env.API_KEY}`
    );
    if (!pics.ok) {
      throw new Error("Failed to fetch pics data");
    }
    const pic = await pics.json();
    return pic;
  } catch (error) {
    console.error("Error fetching pics data:", error.message);
    throw error;
  }
};

export const getVideosData = async (type, id) => {
  try {
    const videos = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.API_KEY}`
    );
    if (!videos.ok) {
      throw new Error("Failed to fetch videos data");
    }
    const vid = await videos.json();
    return vid;
  } catch (error) {
    console.error("Error fetching videos data:", error.message);
    throw error;
  }
};

export const getSimilarData = async (type, id) => {
  try {
    const similar = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=1`
    );
    if (!similar.ok) {
      throw new Error("Failed to fetch similar data");
    }
    const similarDataRes = await similar.json();
    return similarDataRes;
  } catch (error) {
    console.error("Error fetching similar data:", error.message);
    throw error;
  }
};

export const getCelebData = async (id, type) => {
  const url = `https://api.themoviedb.org/3/person/${id}${type}?api_key=${process.env.API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch celeb data");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching celeb data:", err.message);
    throw err;
  }
};

export const queryData = async (searchType, string) => {
  const url = `https://api.themoviedb.org/3/search/${searchType}?api_key=${process.env.API_KEY}&query=${string}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

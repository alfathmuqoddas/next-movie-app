export const getPopularData = async (type, page) => {
  // Call an external API endpoint to get posts
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/popular?api_key=${
        process.env.API_KEY
      }&language=en-US&page=${page | 1}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch Popular data");
    }
    const popularData = await res.json();
    return popularData;
  } catch (error) {
    console.error("Error fetching popular tv data:", error.message);
    throw error;
  }
};

export const getTrendingData = async (timeframe, page) => {
  // Call an external API endpoint to get posts
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/all/${timeframe}?api_key=${
        process.env.API_KEY
      }&language=en-US&page=${page | 1}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch trending data");
    }
    const trendingData = await res.json();
    return trendingData;
  } catch (error) {
    console.error("Error fetching trending data:", error.message);
    throw error;
  }
};

export const getNowPlayingData = async (page) => {
  // Call an external API endpoint to get posts
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${
        process.env.API_KEY
      }&page=${page | 1}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch Now playing data");
    }
    const nowPlayingData = await res.json();
    return nowPlayingData;
  } catch (error) {
    console.error("Error fetching now playing data:", error.message);
    throw error;
  }
};

export const getTopRatedData = async (page) => {
  // Call an external API endpoint to get posts
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${
        process.env.API_KEY
      }&language=en-US&page=${page | 1}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch top rated data");
    }
    const topRatedData = await res.json();
    return topRatedData;
  } catch (error) {
    console.error("Error fetching top rated data:", error.message);
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

export const getDiscover = async (year, genreId, page, mediaType) => {
  try {
    const discoverData = await (
      await fetch(
        `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${process.env.API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_year=${year}&sort_by=popularity.desc&with_genres=${genreId}`
      )
    ).json();
    return discoverData;
  } catch (err) {
    console.error("error fetching data " + err);
  }
};

export const getGenres = async (mediaType) => {
  try {
    const genres = await (
      await fetch(
        `https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${process.env.API_KEY}&language=en-US`
      )
    ).json();

    return genres;
  } catch (err) {
    console.error("error fetching data " + err);
  }
};

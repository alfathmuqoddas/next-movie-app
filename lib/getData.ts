export const getPopularData = async (type: string, page: number) => {
  // Call an external API endpoint to get posts
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/popular?api_key=${
        process.env.API_KEY
      }&language=en-US&page=${page | 1}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch Popular data");
    }
    const popularData = await res.json();
    const popularDatas = popularData.results;
    return popularDatas;
  } catch (error) {
    console.error("Error fetching popular tv data:", error.message);
    throw error;
  }
};

export const getTrendingData = async (timeframe: string, page: number) => {
  // Call an external API endpoint to get posts
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/all/${timeframe}?api_key=${process.env.API_KEY}&language=en-US&page=${page}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch trending data");
    }
    const trendingData = await res.json();
    const trendingDatas = trendingData.results;
    return trendingDatas;
  } catch (error) {
    console.error("Error fetching trending data:", error.message);
    throw error;
  }
};

export const getNowPlayingData = async (page: number) => {
  // Call an external API endpoint to get posts
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${
        process.env.API_KEY
      }&page=${page | 1}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch Now playing data");
    }
    const nowPlayingData = await res.json();
    const nowPlayingDatas = nowPlayingData.results;
    return nowPlayingDatas;
  } catch (error) {
    console.error("Error fetching now playing data:", error.message);
    throw error;
  }
};

export const getTopRatedData = async (page: number) => {
  // Call an external API endpoint to get posts
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${
        process.env.API_KEY
      }&language=en-US&page=${page | 1}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch top rated data");
    }
    const topRatedData = await res.json();
    const topRatedDatas = topRatedData.results;
    return topRatedDatas;
  } catch (error) {
    console.error("Error fetching top rated data:", error.message);
    throw error;
  }
};

export const getMediaDetails = async (type: string, id: string) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.API_KEY}&language=en-US`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch details data");
    }
    const movieDetails = await res.json();
    return movieDetails;
  } catch (error) {
    console.error("Error fetching details data:", error.message);
    throw error;
  }
};

export const getCreditData = async (type: string, id: string) => {
  try {
    const credits = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`
    );
    const credit = await credits.json();
    const casts = credit.cast;
    const crews = credit.crew;
    if (casts.length && crews.length) {
      return { casts, crews };
    } else {
      return { casts: [], crews: [] };
    }
  } catch (error) {
    return console.log(error);
  }
};

export const getPicsData = async (type: string, id: string) => {
  try {
    const pics = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${process.env.API_KEY}`
    );
    if (!pics.ok) {
      throw new Error("Failed to fetch pics data");
    }
    const pic = await pics.json();
    const picSelected = pic.posters;
    return picSelected;
  } catch (error) {
    console.error("Error fetching pics data:", error.message);
    throw error;
  }
};

export const getVideosData = async (type: string, id: number) => {
  try {
    const videos = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.API_KEY}`
    );
    if (!videos.ok) {
      throw new Error("Failed to fetch videos data");
    }
    const vid = await videos.json();
    const videoSelected = vid.results;
    return videoSelected;
  } catch (error) {
    console.error("Error fetching videos data:", error.message);
    throw error;
  }
};

export const getSimilarData = async (type: string, id: number) => {
  try {
    const similar = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=1`
    );
    if (!similar.ok) {
      throw new Error("Failed to fetch similar data");
    }
    const similarDataRes = await similar.json();
    const similarData = similarDataRes.results;
    return similarData;
  } catch (error) {
    console.error("Error fetching similar data:", error.message);
    throw error;
  }
};

export const getCelebData = async (id: number, type: string) => {
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

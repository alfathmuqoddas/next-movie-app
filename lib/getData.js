export const getPopularData = async (page) => {
  // Call an external API endpoint to get posts
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=403829fffc80d8184aa974d631a475c5&language=en-US&page=${
      page | 1
    }`
  );
  const popularData = await res.json();
  const popularDatas = popularData.results;
  return popularDatas;
};

export const getNowPlayingData = async (page) => {
  // Call an external API endpoint to get posts
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${
      process.env.apiKey
    }&language=en-US&page=${page | 1}`
  );
  const nowPlayingData = await res.json();
  const nowPlayingDatas = nowPlayingData.results;
  return nowPlayingDatas;
};

export const getTopRatedData = async (page) => {
  // Call an external API endpoint to get posts
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${
      process.env.apiKey
    }&language=en-US&page=${page | 1}`
  );
  const topRatedData = await res.json();
  const topRatedDatas = topRatedData.results;
  return topRatedDatas;
};

export const getTrendingData = async (page) => {
  // Call an external API endpoint to get posts
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${
      process.env.apiKey
    }&language=en-US&page=${page | 1}`
  );
  const trendingData = await res.json();
  const trendingDatas = trendingData.results;
  return trendingDatas;
};

export const getMovieDetails = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.apiKey}&language=en-US`
  );
  const movieDetails = await res.json();
  return movieDetails;
};

export const getCreditData = async (id) => {
  try {
    const credits = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.apiKey}&language=en-US`
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

export const getPicsData = async (id) => {
  const pics = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.apiKey}`
  );
  const pic = await pics.json();
  const picSelected = pic.posters;
  return picSelected;
};

export const getVideosData = async (id) => {
  const videos = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.apiKey}`
  );
  const vid = await videos.json();
  const videoSelected = vid.results;
  return videoSelected;
};

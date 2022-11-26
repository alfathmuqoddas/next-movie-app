export const getPopularData = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=403829fffc80d8184aa974d631a475c5&language=en-US&page=1"
  );
  const popularData = await res.json();
  const popularDatas = popularData.results;
  return popularDatas;
};

export const getNowPlayingData = async () => {
  // Call an external API endpoint to get posts
  const res1 = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=403829fffc80d8184aa974d631a475c5&language=en-US&page=1"
  );
  const nowPlayingData = await res1.json();
  const nowPlayingDatas = nowPlayingData.results;
  return nowPlayingDatas;
};

export const getTopRatedData = async () => {
  // Call an external API endpoint to get posts
  const res2 = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=403829fffc80d8184aa974d631a475c5&language=en-US&page=1"
  );
  const topRatedData = await res2.json();
  const topRatedDatas = topRatedData.results;
  return topRatedDatas;
};

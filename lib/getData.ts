import { ICreditsData } from "./creditType";
import {
  IPeopleDetails,
  IPeopleMovieCredits,
  IPeopleTvCredits,
} from "./peopleType";
import { IPicsData } from "./picsType";
import { ISimilarMovieData, ISimilarTvData } from "./similarType";
import {
  IApiData,
  IMovieDetails,
  ITvDetails,
  IApiNpData,
  ICasts,
  ICrews,
  IResultsMovieData,
  IResultsTvData,
  IResultsTrendingAll,
  IApiDataTv,
} from "./type";
import { IVideoData } from "./videoType";

export const getPopularData = async (
  type: "movie" | "tv",
  page: number
): Promise<Pick<IApiData, "results"> | Pick<IApiDataTv, "results">> => {
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
    const data: IApiData | IApiDataTv = await res.json();

    if (type === "movie") {
      const { results } = data as IApiData;
      return { results };
    } else {
      const { results } = data as IApiDataTv;
      return { results };
    }
  } catch (error: any) {
    console.error("Error fetching popular tv data:", error.message);
    throw error;
  }
};

export const getTrendingData = async (
  timeframe: string | "day" | "week",
  page: number
) => {
  // Call an external API endpoint to get posts
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/all/${timeframe}?api_key=${process.env.API_KEY}&language=en-US&page=${page}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch trending data");
    }
    const data = await res.json();
    const { results } = data;
    return results;
  } catch (error: any) {
    console.error("Error fetching trending data:", error.message);
    throw error;
  }
};

export const getNowPlayingData = async (
  page: number
): Promise<Pick<IApiNpData, "results">> => {
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
    const data: IApiNpData = await res.json();
    const { results } = data as IApiNpData;
    return { results };
  } catch (error: any) {
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
    const data = await res.json();
    const { results } = data;
    return results;
  } catch (error: any) {
    console.error("Error fetching top rated data:", error.message);
    throw error;
  }
};

export const getMediaDetails = async (
  type: "movie" | "tv",
  id: string | string[] | undefined
) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.API_KEY}&language=en-US`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch details data");
    }
    let data: IMovieDetails | ITvDetails;
    if (type === "movie") {
      data = (await res.json()) as IMovieDetails;
    } else {
      data = (await res.json()) as ITvDetails;
    }
    return data;
  } catch (error: any) {
    console.error("Error fetching details data:", error.message);
    throw error;
  }
};

export const getCreditData = async (
  type: "movie" | "tv",
  id: string | string[] | undefined
): Promise<Pick<ICreditsData, "cast" | "crew">> => {
  try {
    const credits = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`
    );
    const data: ICreditsData = await credits.json();
    const { cast, crew } = data as ICreditsData;
    return { cast, crew };
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const getPicsData = async (
  type: "movie" | "tv",
  id: string | string[] | undefined
): Promise<Pick<IPicsData, "posters">> => {
  try {
    const pics = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${process.env.API_KEY}`
    );
    if (!pics.ok) {
      throw new Error("Failed to fetch pics data");
    }
    const data: IPicsData = await pics.json();
    const { posters } = data as IPicsData;
    return { posters };
  } catch (error: any) {
    console.error("Error fetching pics data:", error.message);
    throw error;
  }
};

export const getVideosData = async (
  type: string,
  id: string | string[] | undefined
): Promise<Pick<IVideoData, "results">> => {
  try {
    const videos = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.API_KEY}`
    );
    if (!videos.ok) {
      throw new Error("Failed to fetch videos data");
    }
    const vid: IVideoData = await videos.json();
    const { results } = vid as IVideoData;
    return { results };
  } catch (error: any) {
    console.error("Error fetching videos data:", error.message);
    throw error;
  }
};

export const getSimilarData = async (
  type: "movie" | "tv",
  id: string | string[] | undefined
): Promise<
  Pick<ISimilarMovieData, "results"> | Pick<ISimilarTvData, "results">
> => {
  try {
    const similar = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=1`
    );
    if (!similar.ok) {
      throw new Error("Failed to fetch similar data");
    }
    const similarDataRes: ISimilarMovieData | ISimilarTvData =
      await similar.json();
    if (type === "movie") {
      const { results } = similarDataRes as ISimilarMovieData;
      return { results };
    } else {
      const { results } = similarDataRes as ISimilarTvData;
      return { results };
    }
  } catch (error: any) {
    console.error("Error fetching similar data:", error.message);
    throw error;
  }
};

export const getCelebData = async (
  id: string | string[] | undefined,
  type: "" | "/tv_credits" | "/movie_credits"
) => {
  const url = `https://api.themoviedb.org/3/person/${id}${type}?api_key=${process.env.API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch celeb data");
    }
    const data = await response.json();
    return data;
  } catch (err: any) {
    console.error("Error fetching celeb data:", err.message);
    throw err;
  }
};

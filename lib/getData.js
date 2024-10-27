import {
  collection,
  query,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

export const getPopularData = async (type, page) => {
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
      }&language=en-US&page=${page | 1}`
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
      }&page=${page | 1}`
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
      }&language=en-US&page=${page | 1}`
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

export const getComments = async (movieId) => {
  try {
    const commentsCollection = query(
      collection(db, "commentsByMovieId", movieId.toString(), "comments"),
      orderBy("createdAt", "desc")
    );
    const commentSnapshot = await getDocs(commentsCollection);
    const commentsList = commentSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        userName: data.userName,
        content: data.content,
        userDisplayPicture: data.userDisplayPicture,
        createdAt: new Date(data.createdAt.toMillis()).toLocaleString("id"),
      };
    });
    return commentsList;
  } catch (error) {
    console.error("Error fetching comments: ", error);
  }
};

export const handleDeleteComment = async (movieId, commentId, router) => {
  try {
    const docRef = await deleteDoc(
      doc(db, "commentsByMovieId", movieId.toString(), "comments", commentId)
    );
    alert("Comment deleted successfully!");
    router.reload();
  } catch (error) {
    console.error("Error deleting comment: ", error);
    alert("Error deleting comment: " + error.message);
  }
};

import { IResultsMovieData, IResultsTvData } from "./type";

export interface ISimilarTvData {
  page: number;
  total_pages: number;
  total_results: number;
  results: IResultsTvData[];
}

export interface ISimilarMovieData {
  page: number;
  total_pages: number;
  total_results: number;
  results: IResultsMovieData[];
}

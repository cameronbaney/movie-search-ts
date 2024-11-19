import {type Movie} from './movie';

export interface Api_Response {
  page: number;
  results: Movie[],
  total_pages: number;
  total_results: number;

}

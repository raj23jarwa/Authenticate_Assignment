import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"; // Import createAction
import movieApi from "../../common/apis/movieApi";

const apiKey = import.meta.env.VITE_API;


export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    // const movieText = getRandomMovieName();
    const response = await movieApi.get(
      `?apiKey=${apiKey}&s=${term}&type=movie&Plot=full`
    );
    return response.data;
  }
);


export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    // const seriesText = getRandomMovieName();
    const response = await movieApi.get(
      `?apiKey=${apiKey}&s=${term}&type=series&Plot=full`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${apiKey}&i=${id}&Plot=full`);
    return response.data;
  }
);
export const fetchAsyncMoviesAndShows = createAsyncThunk(
  "movies/fetchAsyncMoviesAndShows",
  async (searchInput) => {
    const movieResponse = await movieApi.get(
      `?apiKey=${apiKey}&s=${searchInput}&type=movie`
    );
    const showResponse = await movieApi.get(
      `?apiKey=${apiKey}&s=${searchInput}&type=series`
    );

    return {
      movies: movieResponse.data,
      shows: showResponse.data 
    };
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
  watchlist: [],

};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setShows: (state, action) => {
      state.shows = action.payload;
    },
    setSelectMovieOrShow: (state, action) => {
      state.selectMovieOrShow = action.payload;
    },
    addToWatchlist: (state, action) => {
      const movie = action.payload;
      if (!state.watchlist.some((item) => item.imdbID === movie.imdbID)) {
        state.watchlist.push(movie);
      }
    },
    removeFromWatchlist: (state, action) => {
      const imdbID = action.payload;
      state.watchlist = state.watchlist.filter((movie) => movie.imdbID !== imdbID);
      
    },
  
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        console.log("Pending");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log("Fetched Successfully!");
        state.movies = payload;
      })
      .addCase(fetchAsyncMovies.rejected, (state) => {
        console.log("Rejected!");
      })
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        console.log("Fetched Successfully!");
        state.shows = payload;
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
        console.log("Fetched Successfully!");
        state.selectMovieOrShow = payload;
      });
  },
});
export const { setMovies, setShows, setSelectMovieOrShow, addToWatchlist, removeFromWatchlist } = movieSlice.actions;

export const { setSearchValue, removeSelectedMovieOrShow } = movieSlice.actions; // Export setSearchValue and removeSelectedMovieOrShow
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getAllWatchlist = (state) => state.movies.watchlist;

export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;

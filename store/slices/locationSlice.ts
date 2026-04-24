import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchedLocation } from "@/types/location";

export interface LocationState {
  searchQuery: string;
  searchResults: SearchedLocation[];
  selectedLocation: SearchedLocation | null;
  isLoading: boolean;
  error: string | null;
  userLocation: {
    latitude: number | null;
    longitude: number | null;
  };
}

const initialState: LocationState = {
  searchQuery: "",
  searchResults: [],
  selectedLocation: null,
  isLoading: false,
  error: null,
  userLocation: {
    latitude: null,
    longitude: null,
  },
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<SearchedLocation[]>) => {
      state.searchResults = action.payload;
    },
    setSelectedLocation: (
      state,
      action: PayloadAction<SearchedLocation | null>,
    ) => {
      state.selectedLocation = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUserLocation: (
      state,
      action: PayloadAction<{
        latitude: number | null;
        longitude: number | null;
      }>,
    ) => {
      state.userLocation = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = "";
      state.error = null;
    },
    clearSelectedLocation: (state) => {
      state.selectedLocation = null;
    },
  },
});

export const {
  setSearchQuery,
  setSearchResults,
  setSelectedLocation,
  setLoading,
  setError,
  setUserLocation,
  clearSearchResults,
  clearSelectedLocation,
} = locationSlice.actions;

export default locationSlice.reducer;

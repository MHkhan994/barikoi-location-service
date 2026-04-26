"use client";

import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Store,
  Home,
  Briefcase,
  Factory,
  Utensils,
} from "lucide-react";
import locationService from "@/lib/barikoiapi";
import { SearchedLocation } from "@/types/location";
import { useDebounce } from "@/hooks/useDebounce";
import { useAppDispatch } from "@/store/hooks";
import {
  setSearchResults,
  setSelectedLocation,
  clearSearchResults,
  setError,
  setSearchQuery,
} from "@/store/slices/locationSlice";

const getLocationIconByType = (type?: SearchedLocation["pType"]) => {
  switch (type) {
    case "Shop":
      return Store;
    case "Residence":
      return Home;
    case "Admin":
    case "Office":
      return Briefcase;
    case "Industry":
      return Factory;
    case "Food":
    case "Restaurant":
      return Utensils;
    default:
      return MapPin;
  }
};

export default function Header() {
  const dispatch = useAppDispatch();
  const [localQuery, setLocalQuery] = useState("");
  const [localSearchResults, setLocalSearchResults] = useState<
    SearchedLocation[]
  >([]);

  const debouncedSearch = useDebounce(localQuery, 300);

  useEffect(() => {
    const fetchLocations = async () => {
      if (!debouncedSearch) {
        setLocalSearchResults([]);
        return;
      }

      try {
        const result = await locationService.autocomplete({
          q: debouncedSearch,
        });
        const places = result?.data?.places || [];
        setLocalSearchResults(places);
        dispatch(setSearchQuery(debouncedSearch));
        dispatch(setError(null));
      } catch (error) {
        setLocalSearchResults([]);
        dispatch(setError("Error fetching search results"));
        console.error("Error fetching autocomplete results:", error);
      }
    };

    fetchLocations();
  }, [debouncedSearch, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!debouncedSearch) {
      dispatch(clearSearchResults());
      setLocalQuery("");
      setLocalSearchResults([]);
      return;
    }

    if (localSearchResults.length === 1) {
      dispatch(setSelectedLocation(localSearchResults[0]));
      dispatch(setSearchResults([localSearchResults[0]]));
      dispatch(setSearchQuery(debouncedSearch));
    } else if (localSearchResults.length > 1) {
      dispatch(setSearchQuery(debouncedSearch));
      dispatch(setSearchResults(localSearchResults));
      dispatch(setSelectedLocation(null));
    }

    setLocalQuery("");
    setLocalSearchResults([]);
  };

  return (
    <header className="flex flex-col bg-white border-b border-gray-200 shadow-sm">
      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 md:px-6 px-3 md:py-4 py-2 relative"
      >
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Coffee shops"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {localSearchResults.length > 0 && (
          <div className="absolute top-14 md:top-16 p-5 bg-white rounded-md border shadow-md w-[calc(100%-24px)] md:w-[calc(100%-48px)] z-[200]">
            {localSearchResults.map((result) => {
              const Icon = getLocationIconByType(result.pType);
              return (
                <div
                  key={result.id}
                  onClick={() => {
                    dispatch(setSelectedLocation(result));
                    dispatch(setSearchQuery(debouncedSearch));
                    dispatch(setSearchResults([result]));
                    setLocalQuery("");
                    setLocalSearchResults([]);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-6 truncate"
                >
                  <p>
                    <Icon className="text-blue-500" size={16} />
                  </p>{" "}
                  <p className="truncate">{result.address}</p>
                </div>
              );
            })}
          </div>
        )}
      </form>
    </header>
  );
}

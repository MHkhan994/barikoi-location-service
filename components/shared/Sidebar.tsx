"use client";

import { SearchedLocation } from "@/types/location";
import { Search } from "lucide-react";
import LocationCard from "../location/LocationCard";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setSelectedLocation } from "@/store/slices/locationSlice";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.location.searchQuery);
  const searchResults = useAppSelector((state) => state.location.searchResults);
  const selectedLocation = useAppSelector(
    (state) => state.location.selectedLocation,
  );

  const displayLocations = searchResults.length > 0 ? searchResults : [];
  const displayTitle =
    searchResults.length > 0 ? "Search Results" : "Nearby Places";
  return (
    <aside className="hidden md:flex flex-col w-96 bg-white border-r border-gray-200 overflow-hidden">
      {/* Search Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Search size={18} />
          <h2 className="font-semibold text-gray-900">{displayTitle}</h2>
        </div>
        {searchQuery && (
          <p className="text-sm text-gray-700 mb-2 font-medium">
            {searchQuery}
          </p>
        )}
        <p className="text-sm text-gray-500">
          Showing {displayLocations.length}{" "}
          {displayLocations.length === 1 ? "location" : "locations"}
        </p>
      </div>

      {/* Locations List */}
      <div className="flex-1 overflow-y-auto">
        {displayLocations.length > 0 ? (
          <div className="p-4 space-y-4">
            {displayLocations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                isSelected={selectedLocation?.id === location.id}
                onSelect={() =>
                  dispatch(setSelectedLocation(location as SearchedLocation))
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No locations found</p>
          </div>
        )}
      </div>
    </aside>
  );
}

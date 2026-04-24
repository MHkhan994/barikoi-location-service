"use client";

import { Heart, MapPin, Tag } from "lucide-react";
import { useState } from "react";
import { SearchedLocation } from "@/types/location";

interface LocationCardProps {
  location: SearchedLocation;
  isSelected: boolean;
  onSelect: (location: SearchedLocation) => void;
}

export default function LocationCard({
  location,
  isSelected,
  onSelect,
}: LocationCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div
      onClick={() => onSelect(location)}
      className={`rounded-lg overflow-hidden border-2 cursor-pointer transition-all p-4 ${
        isSelected
          ? "border-blue-600 shadow-lg bg-blue-50"
          : "border-gray-200 hover:border-gray-300 bg-white"
      }`}
    >
      {/* Header with Address and Heart */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-bold text-gray-900 flex-1 line-clamp-2">
          {location.address}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorited(!isFavorited);
          }}
          className="flex-shrink-0 ml-2 transition-colors"
        >
          <Heart
            size={18}
            className={
              isFavorited ? "fill-red-500 text-red-500" : "text-gray-400"
            }
          />
        </button>
      </div>

      {/* Location Type Badge */}
      {location.pType && (
        <div className="mb-3">
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
            <Tag size={12} />
            {location.pType}
          </span>
        </div>
      )}

      {/* Area and City */}
      <div className="flex items-start gap-2 mb-3 text-sm text-gray-600">
        <MapPin size={16} className="flex-shrink-0 mt-0.5" />
        <div>
          {location.area && (
            <p className="font-medium text-gray-700">{location.area}</p>
          )}
          {location.city && (
            <p className="text-sm text-gray-500">{location.city}</p>
          )}
          {location.postCode && (
            <p className="text-xs text-gray-400">{location.postCode}</p>
          )}
        </div>
      </div>

      {/* Coordinates */}
      {location.latitude && location.longitude && (
        <div className="text-xs text-gray-400 space-y-0.5">
          <p>
            Lat:{" "}
            {typeof location.latitude === "string"
              ? location.latitude
              : location.latitude.toFixed(4)}
          </p>
          <p>
            Lng:{" "}
            {typeof location.longitude === "string"
              ? location.longitude
              : location.longitude.toFixed(4)}
          </p>
        </div>
      )}
    </div>
  );
}

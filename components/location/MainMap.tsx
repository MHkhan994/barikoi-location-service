"use client";
import { useEffect, useRef } from "react";
import {
  BkoiGlMap,
  FullscreenControl,
  Map,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "bkoi-gl"; // Import the Barikoi GL package
import "bkoi-gl/dist/style/bkoi-gl.css"; // Import CSS for proper map styling
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setSelectedLocation } from "@/store/slices/locationSlice";

const MainMap = () => {
  const mapContainer = useRef(null);
  const map = useRef<null | BkoiGlMap>(null);
  const markersRef = useRef<Marker[]>([]);

  const dispatch = useAppDispatch();
  const selectedLocation = useAppSelector(
    (state) => state.location.selectedLocation,
  );
  const searchResults = useAppSelector((state) => state.location.searchResults);

  useEffect(() => {
    if (map.current) return;

    // Determine initial center and zoom
    let center = [90.3994, 23.7638];
    let zoom = 10;

    if (selectedLocation?.longitude && selectedLocation?.latitude) {
      const lng =
        typeof selectedLocation.longitude === "string"
          ? parseFloat(selectedLocation.longitude)
          : selectedLocation.longitude;
      const lat =
        typeof selectedLocation.latitude === "string"
          ? parseFloat(selectedLocation.latitude)
          : selectedLocation.latitude;
      center = [lng, lat];
      zoom = 15;
    }

    map.current = new Map({
      container: mapContainer.current || "",
      center: center as [number, number],
      zoom: zoom,
      doubleClickZoom: false,
      accessToken: process.env.NEXT_PUBLIC_LOCATION_SERVICE_API_KEY,
    })
      .addControl(new NavigationControl(), "top-right")
      .addControl(new FullscreenControl())
      .addControl(new ScaleControl());
  }, []);

  // Update map zoom based on selectedLocation
  useEffect(() => {
    if (!map.current) return;

    if (selectedLocation?.longitude && selectedLocation?.latitude) {
      const lng =
        typeof selectedLocation.longitude === "string"
          ? parseFloat(selectedLocation.longitude)
          : selectedLocation.longitude;
      const lat =
        typeof selectedLocation.latitude === "string"
          ? parseFloat(selectedLocation.latitude)
          : selectedLocation.latitude;

      map.current.flyTo({
        center: [lng, lat],
        zoom: 15,
      });
    } else if (searchResults.length > 1) {
      const result = searchResults[0];
      const lng =
        typeof result.longitude === "string"
          ? parseFloat(result.longitude)
          : result.longitude;
      const lat =
        typeof result.latitude === "string"
          ? parseFloat(result.latitude)
          : result.latitude;

      map.current.flyTo({
        center: [lng as number, lat as number],
        zoom: 15,
      });
    } else {
      map.current.flyTo({
        center: [90.3994, 23.7638],
        zoom: 10,
      });
    }
  }, [selectedLocation, searchResults]);

  // Handle markers for search results and selected location
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const isMultipleSearchResults = searchResults.length > 1;
    const isDraggable =
      selectedLocation && !isMultipleSearchResults && searchResults.length <= 1;

    // Add markers for search results
    if (searchResults.length > 1) {
      searchResults.forEach((result) => {
        if (result.longitude && result.latitude) {
          const lng =
            typeof result.longitude === "string"
              ? parseFloat(result.longitude)
              : result.longitude;
          const lat =
            typeof result.latitude === "string"
              ? parseFloat(result.latitude)
              : result.latitude;

          const isSelected =
            selectedLocation?.id === result.id &&
            selectedLocation?.address === result.address;

          const marker = new Marker({
            color: isSelected ? "#2563eb" : "#ef4444",
            draggable: false,
          })
            .setLngLat([lng, lat])
            .setPopup(
              new Popup().setHTML(
                `<h2 class="font-semibold">${result.address || "Location"}</h2>`,
              ),
            )
            .addTo(map.current as BkoiGlMap);

          // Add drag event listener
          if (isSelected && isDraggable) {
            marker.on("dragend", () => {
              const lngLat = marker.getLngLat();
              dispatch(
                setSelectedLocation({
                  ...selectedLocation,
                  longitude: lngLat.lng,
                  latitude: lngLat.lat,
                }),
              );
            });
          }

          // Add click event to select location
          marker.getElement().addEventListener("click", () => {
            dispatch(setSelectedLocation(result));
          });

          markersRef.current.push(marker);
        }
      });
    }
    // Add marker for selected location if no search results
    else if (selectedLocation?.longitude && selectedLocation?.latitude) {
      const lng =
        typeof selectedLocation.longitude === "string"
          ? parseFloat(selectedLocation.longitude)
          : selectedLocation.longitude;
      const lat =
        typeof selectedLocation.latitude === "string"
          ? parseFloat(selectedLocation.latitude)
          : selectedLocation.latitude;

      const marker = new Marker({
        color: "#2563eb",
        draggable: isDraggable || false,
      })
        .setLngLat([lng, lat])
        .setPopup(
          new Popup().setHTML(
            `<h2 class="font-semibold">${selectedLocation.address || "Location"}</h2>`,
          ),
        )
        .addTo(map.current);

      if (isDraggable) {
        marker.on("dragend", () => {
          const lngLat = marker.getLngLat();

          dispatch(
            setSelectedLocation({
              ...selectedLocation,
              longitude: lngLat.lng,
              latitude: lngLat.lat,
            }),
          );
        });
      }

      markersRef.current.push(marker);
    }
  }, [selectedLocation, searchResults, dispatch]);

  return <div ref={mapContainer} style={containerStyles} />;
};

const containerStyles = {
  width: "100%",
  height: "100vh",
  minHeight: "400px",
  overflow: "hidden",
};

export default MainMap;

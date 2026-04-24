"use client";

import MainMap from "@/components/location/MainMap";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop Only */}
        <Sidebar />

        {/* Map Container */}
        <MainMap />
      </div>

      {/* Mobile Bottom Sheet */}
      {/* <MobileBottomSheet
        locations={filteredLocations}
        selectedLocation={selectedLocation}
        onSelectLocation={setSelectedLocation}
      /> */}
    </div>
  );
}

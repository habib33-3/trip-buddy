import { useState } from "react";

import useGetLocations from "@/hooks/locations/useGetLocations";

import Loader from "@/shared/Loader";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";

import ErrorPage from "@/pages/ErrorPage/ErrorPage";

import Map from "./Map";

type TripTab = "itinerary" | "maps" | "overview";

const TripTabsContainer = () => {
  const [activeTab, setActiveTab] = useState<TripTab>("overview");

  const { locations, status } = useGetLocations();

  if (status === "pending") return <Loader />;
  if (status === "error") return <ErrorPage />;

  if (!locations) return null;

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as TripTab)}
      className="w-full"
    >
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
        <TabsTrigger value="maps">Maps</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content goes here.</TabsContent>
      <TabsContent value="itinerary">Itinerary content goes here.</TabsContent>
      {activeTab === "maps" && (
        <TabsContent value="maps">
          <div className="h-[500px] w-full overflow-hidden rounded-lg">
            <Map locations={locations} />
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
};

export default TripTabsContainer;

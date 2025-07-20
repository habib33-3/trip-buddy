import { useId } from "react";

import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import useGetItineraries from "@/hooks/itinerary/useGetItineraries";
import useReorderItinerary from "@/hooks/itinerary/useReorderItinerary";

import Loader from "@/shared/Loader";

import ErrorPage from "@/pages/ErrorPage/ErrorPage";

import ItineraryCard from "./components/ItineraryCard";

const ItineraryTab = () => {
  const { locations, status } = useGetItineraries();
  const { handleReorderItineraries, isLoading } = useReorderItinerary();
  const id = useId();

  if (status === "pending" || isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (status === "error") {
    return <ErrorPage />;
  }

  if (!locations || locations.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center text-center text-lg font-medium text-gray-500">
        No itineraries found.
      </div>
    );
  }

  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over?.id) return;

    const oldIndex = locations.findIndex(
      (itinerary) => itinerary.id === active.id
    );
    const newIndex = locations.findIndex(
      (itinerary) => itinerary.id === over.id
    );

    if (oldIndex === newIndex || newIndex === -1) return;

    const newLocations = arrayMove(locations, oldIndex, newIndex).map(
      (itinerary, index) => ({
        ...itinerary,
        order: index,
      })
    );

    handleReorderItineraries(newLocations.map((itinerary) => itinerary.id));
  };

  return (
    <DndContext
      id={id}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        strategy={verticalListSortingStrategy}
        items={locations.map((location) => location.id)}
      >
        <div className="flex flex-col gap-4 p-4 md:p-6">
          {locations.map((itinerary) => (
            <ItineraryCard
              key={itinerary.id}
              itinerary={itinerary}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default ItineraryTab;

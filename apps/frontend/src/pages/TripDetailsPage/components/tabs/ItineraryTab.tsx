import { useId, useState } from "react";

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

import type { Itinerary } from "@/types/index";

import ErrorPage from "@/pages/ErrorPage/ErrorPage";

import ItineraryCard from "./components/ItineraryCard";

const ItineraryTab = () => {
  const { locations, status } = useGetItineraries();

  const { handleReorderItineraries, isLoading } = useReorderItinerary();

  const [itineraries, setItineraries] = useState(locations as Itinerary[]);

  const id = useId();

  if (status === "pending" || isLoading) {
    return <Loader />;
  }

  if (status === "error") {
    return <ErrorPage />;
  }

  if (!locations || locations.length === 0) {
    return <div>No itineraries found.</div>;
  }

  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;

    const oldIndex = itineraries.findIndex(
      (itinerary) => itinerary.id === active.id
    );

    const newIndex = itineraries.findIndex(
      (itinerary) => itinerary.id === over?.id
    );

    const newLocations = arrayMove(itineraries, oldIndex, newIndex).map(
      (itinerary, index) => ({
        ...itinerary,
        order: index,
      })
    );

    setItineraries(newLocations);

    await handleReorderItineraries(
      newLocations.map((itinerary) => itinerary.id)
    );
  };

  return (
    <DndContext
      id={id}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        strategy={verticalListSortingStrategy}
        items={itineraries.map((location) => location.id)}
      >
        <div className="flex flex-col gap-4 p-4">
          {itineraries.map((itinerary) => (
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

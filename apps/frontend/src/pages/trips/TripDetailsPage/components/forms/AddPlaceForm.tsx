import { useState } from "react";

import useAddPlace from "@/hooks/place/useAddPlace";
import useGetPlaces from "@/hooks/place/useGetPlaces";
import useDebounce from "@/hooks/useDebounce";

import { usePlaceStore } from "@/stores/usePlaceStore";

import LoadingComponent from "@/shared/LoadingComponent";

import type { Place } from "@/types/index";

import { Button } from "@/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

const AddPlaceForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);
  const { places, status } = useGetPlaces(debouncedSearchQuery);
  const { addPlace, form, isLoading } = useAddPlace();
  const { setPlace } = usePlaceStore();

  const handlePlaceClick = (place: Place) => {
    setPlace(place);
    setSearchQuery("");
  };

  return (
    <div className="h-full rounded-2xl border border-gray-200 p-6 shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(addPlace)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]"
        >
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  {...field}
                  value={field.value}
                  placeholder="e.g. 221B Baker Street, London"
                  onChange={(e) => {
                    setSearchQuery(e.target.value);

                    form.setValue("address", e.target.value);
                  }}
                  disabled={isLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="self-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              Add
            </Button>
          </div>
        </form>
      </Form>

      <div className="mt-6 min-h-[100px] max-w-md">
        <h3 className="text-sm font-semibold text-gray-200">Search Results</h3>
        <div className="mt-2 h-full max-h-60 space-y-1 overflow-y-auto pr-2">
          {status === "pending" ? (
            <div className="flex items-center justify-center">
              <LoadingComponent />
            </div>
          ) : searchQuery.length < 3 ? (
            <p className="text-sm text-stone-200">
              Enter at least 3 characters to search.
            </p>
          ) : places?.length ? (
            places.map((place) => (
              <Button
                key={place.id}
                type="button"
                variant="ghost"
                onClick={() => handlePlaceClick(place)}
                className="size-full justify-start border px-1 py-2 text-left text-sm text-pretty break-words whitespace-normal text-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                {place.formattedAddress}
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPlaceForm;

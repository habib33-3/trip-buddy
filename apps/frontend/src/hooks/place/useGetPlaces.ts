import { useQuery } from "@tanstack/react-query";

import { getPlacesApi } from "@/api/placeApi";

const useGetPlaces = (searchQuery?: string) => {
  const { data, status } = useQuery({
    queryFn: async () => getPlacesApi(searchQuery),
    queryKey: ["places", searchQuery],
  });

  return {
    places: data?.data,
    status,
  };
};

export default useGetPlaces;

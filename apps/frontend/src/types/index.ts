export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  initials: string;
};

export type Trip = {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  itineraries?: Itinerary[];
};

export type Itinerary = {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  country: string;
  order: number;
  formattedAddress: string;
  tripId: string;
};

export type CityPoint = {
  lat: number;
  lng: number;
  name: string;
  count: number;
};

export type Stats = {
  cities: CityPoint[];
  countries: number;
  itineraryCount: number;
  mostVisitedCountry: string;
  tripsCount: number;
  tripStatusCounts: {
    completed: number;
    inProgress: number;
    planned: number;
  };
};

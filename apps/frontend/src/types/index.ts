export type User = {
  id: string;
  name?: string | null;
  email: string;
  role: "ADMIN" | "USER";
  image?: string | null;
  initials: string | null;
  trips: Trip[];
};

export type Trip = {
  id: string;
  title: string;
  description: string;
  status: TripStatus;
  coverImg?: string | null;
  startDate: Date;
  endDate: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  itineraries: Itinerary[];
};

export type Place = {
  id: string;
  formattedAddress: string;
  lat: number;
  lng: number;
  country: string;
  city: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Itinerary = {
  id: string;
  title: string;
  notes?: string | null;
  status: ItineraryStatus;
  tripId: string;
  placeId: string;
  createdAt: Date;
  updatedAt: Date;
  trip?: Trip;
  place?: Place;
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

export type TripStatus =
  | "ACTIVE"
  | "CANCELLED"
  | "COMPLETED"
  | "CONFIRMED"
  | "PLANNED";

export type ItineraryStatus =
  | "CANCELLED"
  | "COMPLETED"
  | "IN_PROGRESS"
  | "UPCOMING";

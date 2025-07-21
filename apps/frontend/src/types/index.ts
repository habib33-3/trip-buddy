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

export type Stats = {
  countries: string[];
  cities: { name: string; lat: number; lng: number }[];
};

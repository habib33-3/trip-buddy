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
  Location?: Location[];
};

export type Location = {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  country: string;
  order: number;
  formattedAddress: string;
  tripId: string;
  trip: Trip;
};

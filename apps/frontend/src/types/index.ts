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
};

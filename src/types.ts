export type Preferences = {
  apiKey: string;
};

export type Ale = {
  id: number;
  name: string;
  price: string;
  rating: {
    average: number;
    reviews: number;
  };
  image: string;
};

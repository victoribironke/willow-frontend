export type AccountType = "CUSTOMER" | "SELLER";

export type Cart = {};

export type NewReview = {
  orderId: string;
  rating: number;
  comment: string;
};

export type AccountType = "CUSTOMER" | "SELLER";

export type Cart = { id: string };

export type NewReview = {
  orderId: string;
  rating: number;
  comment: string;
};

export type User = {
  id: string;
  email: string;
  role: "SELLER" | "CUSTOMER";
  status: string;
  isVerified: boolean;
  lastLoggedIn: string;
  createdAt: string;
  updatedAt: string;
  seller: Seller | null;
  customer: Customer | null;
};

export type Seller = {
  userId: string;
  avatar: string | null;
  businessName: string;
  bio: string | null;
  status: string;
};

export type Customer = { userId: string };

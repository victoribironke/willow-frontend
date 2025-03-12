export type User = {
  id: string;
  email: string;
  role: "CUSTOMER" | "SELLER";
  isVerified: boolean;
  customer: {
    firstname: string;
    lastname: string;
  };
};

export type AccountType = "CUSTOMER" | "SELLER";

export interface NewUser {
  email: string;
  password: string;
  role: string;
  firstname: string;
  lastname: string;
  businessName: string;
}

export interface NewReview {
  orderId: string;
  rating: number;
  comment: string;
}

export interface UpdateProfile {
  avatar: File | null;
  businessName: string;
  bio: string;
}

// Enums
export enum AIChatStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export enum ApprovalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum Sourcing {
  LOCALLY_SOURCED = "LOCALLY_SOURCED",
  INTERNATIONALLY_SOURCED = "INTERNATIONALLY_SOURCED",
}

export enum Packaging {
  PLASTIC_FREE = "PLASTIC_FREE",
  BIODEGRADABLE = "BIODEGRADABLE",
  RECYCLED_PAPER = "RECYCLED_PAPER",
  RECYCLED_CARDBOARD = "RECYCLED_CARDBOARD",
  REUSABLE_PACKAGING = "REUSABLE_PACKAGING",
  COMPOSTABLE_PACKAGING = "COMPOSTABLE_PACKAGING",
  MINIMAL_PACKAGING = "MINIMAL_PACKAGING",
  GLASS_CONTAINER = "GLASS_CONTAINER",
  METAL_CONTAINER = "METAL_CONTAINER",
  RECYCLED_PLASTIC = "RECYCLED_PLASTIC",
  PLASTIC_CONTAINER = "PLASTIC_CONTAINER",
  PAPERBOARD_BOX = "PAPERBOARD_BOX",
  BAMBOO_PACKAGING = "BAMBOO_PACKAGING",
  ALUMINUM_CONTAINER = "ALUMINUM_CONTAINER",
  OTHER_ECO_FRIENDLY = "OTHER_ECO_FRIENDLY",
  UNKNOWN_PACKAGING = "UNKNOWN_PACKAGING",
}

export enum SustainabilityFeature {
  BIODEGRADABLE = "BIODEGRADABLE",
  COMPOSTABLE = "COMPOSTABLE",
  REUSABLE = "REUSABLE",
  RECYCLED_MATERIALS = "RECYCLED_MATERIALS",
  WATER_EFFICIENT = "WATER_EFFICIENT",
  SOLAR_POWERED = "SOLAR_POWERED",
  MINIMAL_CARBON_FOOTPRINT = "MINIMAL_CARBON_FOOTPRINT",
  ENERGY_EFFICIENT = "ENERGY_EFFICIENT",
  ZERO_WASTE = "ZERO_WASTE",
  PLASTIC_FREE = "PLASTIC_FREE",
  REPAIRABLE_DESIGN = "REPAIRABLE_DESIGN",
  UPCYCLED = "UPCYCLED",
  CARBON_OFFSET = "CARBON_OFFSET",
  ORGANIC_MATERIALS = "ORGANIC_MATERIALS",
  FAIR_TRADE = "FAIR_TRADE",
  VEGAN = "VEGAN",
  NON_TOXIC = "NON_TOXIC",
  REGENERATIVE_AGRICULTURE = "REGENERATIVE_AGRICULTURE",
  SLOW_PRODUCTION = "SLOW_PRODUCTION",
  WASTE_REDUCING_DESIGN = "WASTE_REDUCING_DESIGN",
  CIRCULAR_DESIGN = "CIRCULAR_DESIGN",
  WILDLIFE_FRIENDLY = "WILDLIFE_FRIENDLY",
  DURABLE_DESIGN = "DURABLE_DESIGN",
  LOW_EMISSION_PRODUCTION = "LOW_EMISSION_PRODUCTION",
  CHEMICAL_FREE = "CHEMICAL_FREE",
  CRUELTY_FREE = "CRUELTY_FREE",
  TREE_FREE = "TREE_FREE",
  ETHICALLY_SOURCED = "ETHICALLY_SOURCED",
  RENEWABLE_ENERGY_USED = "RENEWABLE_ENERGY_USED",
  SOCIALLY_RESPONSIBLE = "SOCIALLY_RESPONSIBLE",
}

export enum SellerStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  FAILED = "FAILED",
}

export enum TicketStatus {
  PENDING = "PENDING",
  RESOLVED = "RESOLVED",
}

export enum CustomerOrderItemStatus {
  ORDERED = "ORDERED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
}

export enum SellerOrderItemStatus {
  NEW = "NEW",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
}

export enum TransactionStatus {
  FAILED = "FAILED",
  SUCCESS = "SUCCESS",
}

export enum Role {
  CUSTOMER = "CUSTOMER",
  SELLER = "SELLER",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
}

export enum DiscountType {
  AMOUNT = "AMOUNT",
  PERCENTAGE = "PERCENTAGE",
}

// Interfaces/Types
export interface WillowAuthData {
  access_token: string;
  user: string;
  seller: Seller | null;
  customer: Customer | null;
}

export interface Admin {
  userId: string;
  user: User;
  vouchers: Voucher[];
  helpTicketResponses: HelpTicketResponse[];
}

export interface AIChat {
  id: string;
  customer: Customer;
  customerId: string;
  status: AIChatStatus;
  history: any[]; // Json array
  isFlagged: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export interface Cart {
  customer: Customer;
  customerId: string;
  createdAt: Date;
  cartItems: CartItem[];
}

export interface CartItem {
  id: string;
  cart: Cart;
  cartId: string;
  product: Product;
  productId: string;
  quantity: number;
  weight?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  zip: string;
}

export interface Customer {
  userId: string;
  user: User;
  firstname: string;
  lastname: string;
  address?: Address; // Json
  points: number;
  cart?: Cart;
  transanctions: Transaction[];
  orders: Order[];
  reviews: Review[];
  likedProducts: LikedProduct[];
  redemptions: VoucherClaim[];
  recycleActivities: RecycleActivity[];
  recommendations: Recommendation[];
  lastViewed: LastViewed[];
  conversations: Conversation[];
  AIChat: AIChat[];
}

export interface LastViewed {
  customer: Customer;
  customerId: string;
  product: Product;
  productId: string;
  weight: number;
  viewedAt: Date;
  updatedAt: Date;
}

export interface LikedProduct {
  customer: Customer;
  customerId: string;
  product: Product;
  productId: string;
  weight: number;
  createdAt: Date;
}

export interface Order {
  id: string;
  customer: Customer;
  customerId: string;
  weight: number;
  totalAmount: number;
  address: Address; // Json
  serviceFee: number;
  deliveryFee: number;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItem[];
  transaction?: Transaction;
}

export interface Recommendation {
  customer: Customer;
  customerId: string;
  product: Product;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecycleLocation {
  id: string;
  name: string;
  address: Address; // Json
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  recycleActivities: RecycleActivity[];
}

export interface RecycleActivity {
  id: string;
  customer: Customer;
  customerId: string;
  recycleLocation: RecycleLocation;
  recycleLocationId: string;
  pointsGained: number;
  createdAt: Date;
}

export interface Review {
  id: string;
  product: Product;
  productId: string;
  customer: Customer;
  customerId: string;
  rating: number;
  weight: number;
  comment?: string;
  createdAt: Date;
}

export interface Image {
  key: string;
  mimetype: string;
  originalname: string;
  size: number;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: Image[]; // Json
  inStock?: number;
  onDemand: boolean;
  category: string;
  options?: any; // Json
  price: number;
  soldOut: boolean;
  isReported: boolean;
  reportCount: number;
  reportMessages?: any; // Json
  approvalStatus: ApprovalStatus;
  sustainabilityFeatures: SustainabilityFeature[];
  packaging: Packaging;
  createdAt: Date;
  updatedAt: Date;
  embedding?: any; // Unsupported("vector(768)")
  endOfLifeInfo?: string;
  sourcing: Sourcing;
  sustainabilityScore?: string;
  sustainabilityScoreReason?: string;
  sustainabilityTag?: string;
  certification?: any; // Json
  sellerId: string;
  seller: Seller;
  reviews: Review[];
  orderItems: OrderItem[];
  recommendations: Recommendation[];
  lastViewed: LastViewed[];
  likedProducts: LikedProduct[];
  cartItems: CartItem[];
}

export interface Seller {
  userId: string;
  user: User;
  avatar?: any; // Json
  businessName: string;
  bio?: string;
  status: SellerStatus;
  orders: OrderItem[];
  products: Product[];
  conversations: Conversation[];
}

export interface Conversation {
  id: string;
  customer: Customer;
  customerId: string;
  seller: Seller;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
  isFlagged: boolean;
  messages: Message[];
}

export interface HelpTicket {
  id: string;
  user: User;
  userId: string;
  subject: string;
  description: string;
  status: TicketStatus;
  createdAt: Date;
  updatedAt: Date;
  responses: HelpTicketResponse[];
}

export interface HelpTicketResponse {
  id: string;
  helpTicket: HelpTicket;
  helpTicketId: string;
  admin: Admin;
  adminId: string;
  response: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  conversation: Conversation;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  images?: any; // Json
  isReported: boolean;
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  order: Order;
  orderId: string;
  product: Product;
  productId: string;
  seller: Seller;
  sellerId: string;
  customerStatus: CustomerOrderItemStatus;
  sellerStatus: SellerOrderItemStatus;
  customerReturnMessage?: string;
  sellerCancelMessage?: string;
  quantity: number;
  price: number;
}

export interface Transaction {
  id: string;
  customerId: string;
  customer: Customer;
  reference: string;
  paystackResponse?: any; // Json
  status: TransactionStatus;
  totalAmount: number;
  orderId: string;
  order: Order;
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
  subscribed: boolean;
  status: UserStatus;
  isVerified: boolean;
  lastLoggedIn?: Date;
  lastKnownIp?: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
  customer?: Customer;
  seller?: Seller;
  admin?: Admin;
  helptickets: HelpTicket[];
}

export interface Voucher {
  id: string;
  code: string;
  discountType: DiscountType;
  discount: number;
  pointsCost: number;
  quantity: number;
  createdAt: Date;
  admin: Admin;
  adminId: string;
  redemptions: VoucherClaim[];
}

export interface VoucherClaim {
  id: string;
  customer: Customer;
  customerId: string;
  voucher: Voucher;
  voucherId: string;
  redeemed: boolean;
  quantity: number;
  createdAt: Date;
}

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://willow-frontend.vercel.app";

export const BACKEND_URL = "https://willow-backend.onrender.com/api/v1";

export const PAGES = {
  home: "/",
  more_about_willow: "/more-about-willow",

  dashboard: { home: "/dashboard" },

  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgot_password: "/auth/forgot-password",
    reset_password: "/auth/reset-password",
  },
};

export const IMAGES = {
  auth_image: { src: "/auth-image.jpeg", w: 736, h: 1490 },
  mail: { src: "/mail.png", w: 122, h: 144 },
  logo: { src: "/logo.png", w: 24, h: 26 },

  more_about_willow: {
    one: { src: "/more-about-willow/one.jpeg", w: 735, h: 490 },
    two: { src: "/more-about-willow/two.jpeg", w: 2730, h: 4096 },
    three: { src: "/more-about-willow/three.jpeg", w: 736, h: 1075 },
    four: { src: "/more-about-willow/four.jpeg", w: 736, h: 920 },
    five: { src: "/more-about-willow/five.jpeg", w: 736, h: 732 },
  },
};

export const ENDPOINTS = {
  register_user: BACKEND_URL + "/users/register",
  login_user: BACKEND_URL + "/auth/login",
  forgot_password: BACKEND_URL + "/auth/forgot-password",
  reset_password: (token: string) =>
    BACKEND_URL + `/auth/password-reset?resetToken=${token}`,
  verify_otp: BACKEND_URL + "/auth/verify-account",
  resend_otp: BACKEND_URL + "/auth/resend-otp",
};

export const sustainabilityPrompt = (d: {
  cloudVisionRes: string;
  location: string;
  name: string;
  description: string;
  category: string;
  sf: string[];
  packaging: string;
  price: string;
  onDemand: boolean;
  eol?: string;
  options?: string;
  inStock?: number;
}) => `
You are a sustainability expert tasked with evaluating a product's environmental performance. Below, you will be provided with detailed product data from our system. This data includes various fields such as:
Basic Information: Product name, description, category, price, in-stock status, on-demand boolean flag, and options (e.g., size, color).
Production & Packaging: Production location, packaging type (enum: PLASTIC_FREE, BIODEGRADABLE, RECYCLED_PAPER, REUSABLE, COMPOSTABLE, MINIMAL, GLASS, METAL).
Sustainability Data: sustainability features (selected from a predefined enum which contains: BIODEGRADABLE, COMPOSTABLE, REUSABLE, RECYCLED_MATERIALS, LOCALLY_SOURCED, WATER_EFFICIENT, SOLAR_POWERED, MINIMAL_CARBON_FOOTPRINT, ENERGY_EFFICIENT, ZERO_WASTE, PLASTIC_FREE, REPAIRABLE_DESIGN, UPCYCLED, CARBON_OFFSET, ORGANIC_MATERIALS, FAIR_TRADE, VEGAN, NON_TOXIC, REGENERATIVE_AGRICULTURE, SLOW_PRODUCTION, WASTE_REDUCING_DESIGN, CIRCULAR_DESIGN, WILDLIFE_FRIENDLY), certifications (document references or URLs and certificate issuer) which is optional.
Additional Environmental Insights: End-of-life information i.e Disposal/recycling instructions.
Image Analysis Data: Results from Google Cloud Vision’s object and label detection (including any identified objects, labels, and image properties).
Your task is to analyze these inputs and determine:
Overall Sustainability Judgment: Provide a sustainability score between 0 (poor sustainability) and 100 (excellent sustainability). Consider trade-offs such as reduced emissions versus long-term impact, packaging sustainability, and production practices.
Sustainability Tag Suggestion: Recommend a concise sustainability tag (choose from the sustainability features enum) that best represents the product's most prominent eco-friendly feature.
Rationale: Offer a brief explanation (2–3 sentences) summarizing the factors influencing your judgment, such as eco-friendly production methods, packaging choices, and any potential environmental trade-offs.
Ensure that your evaluation considers that no product is 100% sustainable and that trade-offs exist. If the automated analysis is inconclusive or if key data is missing,output “null”.
Input Data:
Google cloud vision response (LABEL AND TEXT DETECTION, IMAGE PROPERTIES): ${d.cloudVisionRes}
Production Location: ${d.location}
Sustainability features: ${d.sf}
Product Name: ${d.name}
Product description: ${d.description}
Product category: ${d.category}
Product price: ${d.price}
Product options: ${d.options}
Product packaging: ${d.packaging}
Product end of life information: ${d.eol}

Production basis (either quantity-in-stock or on-demand):
Product in-stock status: ${d.inStock}
Product on-demand status: ${d.onDemand}

Output Format:
Sustainability Score: [0-100]
Sustainability Tag: [Your recommended tag]
Explanation: [Your rationale]
`;

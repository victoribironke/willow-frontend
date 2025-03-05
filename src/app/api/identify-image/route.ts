import { NextRequest, NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { sustainabilityPrompt } from "@/constants/constants";
// import fs from "fs";

// const visionApiKey = process.env.GOOGLE_VISION_API_KEY!;
// const geminiApiKey = process.env.GEMINI_API_KEY!;

export const GET = async (req: NextRequest) => {
  const encodedImage = req.nextUrl.searchParams.get("imageString") as string;
  console.log(encodedImage);
  try {
    // const imageFile = fs.readFileSync(imageString);
    // const  = Buffer.from(imageFile).toString('base64');

    // const r = await fetch(
    //   `https://vision.googleapis.com/v1/images:annotate?key=${visionApiKey}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       requests: [
    //         {
    //           image: {
    //             source: {
    //               imageUri:
    //                 "https://th.bing.com/th/id/OIP.z_Wkt8VLtm0AgB315gYzTQHaEK?w=322&h=181&c=7&r=0&o=5&dpr=1.4&pid=1.7",
    //               //   imageUri:imageUrl
    //             },
    //             // content: encodedImage,
    //           },
    //           features: [
    //             { type: "LABEL_DETECTION" },
    //             { type: "IMAGE_PROPERTIES" },
    //             { type: "TEXT_DETECTION" },
    //           ],
    //         },
    //       ],
    //     }),
    //   }
    // );

    // const res = await r.json();

    // const formatted = {
    //   labelAnnotations: res.responses[0].labelAnnotations,
    //   textAnnotations: res.responses[0].textAnnotations[0].description,
    //   imagePropertiesAnnotation: res.responses[0].imagePropertiesAnnotation,
    // };

    // const genAI = new GoogleGenerativeAI(geminiApiKey);
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // model.generationConfig = { temperature: 1 };

    // const result = (
    //   await model.generateContent([
    //     sustainabilityPrompt({
    //       category: "Cosmetics",
    //       cloudVisionRes: JSON.stringify(formatted),
    //       description:
    //         "CeraVe: Dermatologist-developed skincare, enriched with ceramides and hyaluronic acid for hydration, repair, and protection. Suitable for all skin types. Achieve healthy, radiant skin with CeraVe.",
    //       location: "international",
    //       name: "Cerave face cleanser",
    //       onDemand: false,
    //       packaging: "MINIMAL",
    //       price: "$20",
    //       sf: ["RECYCLED_MATERIALS", "ORGANIC_MATERIALS", "FAIR_TRADE"],
    //       eol: "",
    //       inStock: 5,
    //       options: "",
    //     }),
    //   ])
    // ).response.text();

    return NextResponse.json({ data: "result" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "A server error occured." },
      { status: 500 }
    );
  }
};

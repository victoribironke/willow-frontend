"use client";

import { Separator } from "../ui/separator";
import { CloudUpload } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IMAGE_TIPS } from "@/constants/constants";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ListProduct = () => {
  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">
        Upload your product for listing
      </h1>

      <p className="text-[#696969]">
        Ensure the information provided accurately reflects your product, this
        helps in vetting accuracy and maintaining a high-quality marketplace for
        all our users
      </p>

      <Separator />

      <section className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2 col-span-3">
          <p>
            Add up to 5 photos.{" "}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-main cursor-pointer">
                    See image tips.
                  </span>
                </TooltipTrigger>
                <TooltipContent className="bg-white border shadow text-black">
                  <ul className="flex flex-col py-1 gap-2">
                    {IMAGE_TIPS.map((t, i) => (
                      <li key={i}>• {t}</li>
                    ))}
                  </ul>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>

          <div className="border-2 border-main/50 border-dashed rounded-lg flex items-center justify-center p-8 flex-col gap-4">
            <div className="bg-main/10 p-4 rounded-full">
              <CloudUpload size={50} className="text-main" />
            </div>

            <p className="text-lg">
              Drag & drop or <span className="text-main">choose file</span> to
              upload
            </p>
            <p className="text-[#696969]">JPG, PNG, TIF, WEBP</p>
            <p className="text-[#696969]">10MB maximum</p>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your product name"
            required
            // value={fullName}
            // onChange={(e) => setFullName(e.target.value)}
            className="bg-white"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            type="text"
            placeholder="Cosmetics"
            required
            // value={fullName}
            // onChange={(e) => setFullName(e.target.value)}
            className="bg-white"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="production">Production</Label>
          <Input
            id="production"
            type="number"
            required
            // value={fullName}
            // onChange={(e) => setFullName(e.target.value)}
            className="bg-white"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            required
            // value={fullName}
            // onChange={(e) => setFullName(e.target.value)}
            className="bg-white"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="sourcing">Sourcing</Label>
          <Select

          // value={accountType}
          // onValueChange={(e) => setAccountType(e as AccountType)}
          >
            <SelectTrigger className="w-full bg-white" id="sourcing">
              <SelectValue placeholder="Select a source" />
            </SelectTrigger>
            <SelectContent id="sourcing" className="bg-white">
              <SelectGroup>
                <SelectLabel>Sourcing</SelectLabel>
                <SelectItem value="locally-sourced">Locally sourced</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="packaging">Packaging</Label>
          <Select

          // value={accountType}
          // onValueChange={(e) => setAccountType(e as AccountType)}
          >
            <SelectTrigger className="w-full bg-white" id="packaging">
              <SelectValue placeholder="Select a packaging type" />
            </SelectTrigger>
            <SelectContent id="packaging" className="bg-white">
              <SelectGroup>
                <SelectLabel>Packaging</SelectLabel>
                <SelectItem value="biodegradable">Biodegradable</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </section>
    </>
  );
};

export default ListProduct;

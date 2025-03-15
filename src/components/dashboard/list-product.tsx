"use client";

import { Separator } from "../ui/separator";
import { CloudUpload } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IMAGE_TIPS, SUSTAINABILITY_FEATURES } from "@/constants/constants";
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
import { useState } from "react";
import MultiSelect from "../general/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";

const ListProduct = () => {
  const [selected, setSelected] = useState<string[]>([]);

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
          <Label htmlFor="name">
            Name <span className="text-red">*</span>
          </Label>
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
          <Label htmlFor="category">
            Category <span className="text-red">*</span>
          </Label>
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
          <Label htmlFor="production">
            Production <span className="text-red">*</span>
          </Label>
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
          <Label htmlFor="price">
            Price <span className="text-red">*</span>
          </Label>
          <Input
            id="price"
            type="number"
            required
            placeholder="5000"
            // value={fullName}
            // onChange={(e) => setFullName(e.target.value)}
            className="bg-white"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="sourcing">
            Sourcing <span className="text-red">*</span>
          </Label>
          <Select

          // value={accountType}
          // onValueChange={(e) => setAccountType(e as AccountType)}
          >
            <SelectTrigger className="w-full bg-white" id="sourcing">
              <SelectValue placeholder="Select a source" />
            </SelectTrigger>
            <SelectContent id="sourcing" className="bg-white">
              <SelectGroup>
                <SelectItem value="locally-sourced">Locally sourced</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="packaging">
            Packaging <span className="text-red">*</span>
          </Label>
          <Select

          // value={accountType}
          // onValueChange={(e) => setAccountType(e as AccountType)}
          >
            <SelectTrigger className="w-full bg-white" id="packaging">
              <SelectValue placeholder="Select a packaging type" />
            </SelectTrigger>
            <SelectContent id="packaging" className="bg-white">
              <SelectGroup>
                <SelectItem value="biodegradable">Biodegradable</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2 col-span-3">
          <Label htmlFor="features">
            Sustainability features <span className="text-red">*</span>
          </Label>
          <MultiSelect
            fullList={SUSTAINABILITY_FEATURES}
            selected={selected}
            setSelected={setSelected}
          />
        </div>

        <div className="grid gap-2 col-span-3">
          <Label htmlFor="desc">
            Description <span className="text-red">*</span>
          </Label>
          <Textarea
            id="desc"
            placeholder="Enter your product's description"
            className="bg-white"
          />
        </div>

        <div className="grid gap-2 col-span-3">
          <Label htmlFor="eol-info">End of life information</Label>
          <Textarea
            id="eol-info"
            placeholder="Recycle/dispose information"
            className="bg-white"
          />
        </div>

        <div></div>
        <Button
          className="w-full bg-main hover:bg-main/90 cursor-pointer mx-auto self-center"
          // onClick={() => validate()}
          // disabled={loading}
        >
          Upload
          {/* {loading && <LoaderCircle className="animate-spin" />} */}
        </Button>
        <div></div>
      </section>
    </>
  );
};

export default ListProduct;

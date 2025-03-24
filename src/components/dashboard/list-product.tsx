"use client";

import { Separator } from "../ui/separator";
import { CloudUpload } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  IMAGE_TIPS,
  PACKAGING,
  SOURCING,
  SUSTAINABILITY_FEATURES,
} from "@/constants/constants";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent, DragEvent, useEffect, useState } from "react";
import MultiSelect from "../general/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { cn, getUniqueNumber } from "@/lib/utils";
import { user_details } from "@/app/atoms/atoms";
import { useAtomValue } from "jotai";
import { createProduct } from "@/lib/requests/seller";
import { Switch } from "../ui/switch";
import toast from "react-hot-toast";
import Reviewing from "./reviewing";

const ListProduct = () => {
  const [susFeats, setSusFeats] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [production, setProduction] = useState("");
  const [category, setCategory] = useState("");
  const [sourcing, setSourcing] = useState("");
  const [packaging, setPackaging] = useState("");
  const [desc, setDesc] = useState("");
  const [endOfLife, setEndOfLife] = useState("");
  const [files, setFiles] = useState<{ id: number; file: File }[]>([]);
  const [images, setImages] = useState<{ id: number; s: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [onDemand, setOnDemand] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useAtomValue(user_details);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(event.dataTransfer.files).map((f) => {
      return { id: getUniqueNumber(), file: f };
    });
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]); // Append new files
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files)
      setFiles((prevFiles) => [
        ...prevFiles,
        ...Array.from(files).map((f) => {
          return { id: getUniqueNumber(), file: f };
        }),
      ]);
  };

  const create = async () => {
    const d = {
      images: images.map((i) => i.s),
      name,
      description: desc,
      inStock: parseInt(production),
      onDemand,
      category,
      price: parseInt(price),
      sustainabilityFeatures: susFeats,
      packaging,
      sourcing,
      endOfLifeInfo: endOfLife,
    };

    setIsLoading(true);

    const { data, error } = await createProduct(userInfo?.id || "", d);

    setIsLoading(false);

    if (error) {
      toast.error(error);
      return;
    }
  };

  const filesToDataURLs = async (files: { id: number; file: File }[]) => {
    return Promise.all(
      Array.from(files).map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = (event) => {
            resolve({ id: file.id, s: event.target?.result });
          };

          reader.onerror = (error) => {
            reject(error);
          };

          reader.readAsDataURL(file.file);
        });
      })
    ) as Promise<{ id: number; s: string }[]>;
  };

  useEffect(() => {
    (async () => {
      try {
        const dataURLs = await filesToDataURLs(files);

        setImages(dataURLs);
      } catch (error) {
        console.error("Error converting files to data URLs:", error);
      }
    })();
  }, [files]);

  if (isLoading) return <Reviewing />;

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">
        Upload your product for listing
      </h1>

      <p className="text-[#696969]">
        Ensure the information provided accurately reflects your product, this
        helps in vetting accuracy and maintaining a high-quality marketplace for
        all our users.
      </p>

      <Separator />

      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image upload - full width */}
        <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
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

          {images.length === 0 && (
            <div
              className={cn(
                "border-2 relative border-main/50 border-dashed rounded-xl col-span-1 md:col-span-2 flex items-center justify-center p-8 flex-col gap-4 transition",
                isDragging ? "border-main bg-main/5" : ""
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <div className="bg-main/10 p-4 rounded-full">
                <CloudUpload size={50} className="text-main" />
              </div>

              <p className="text-lg">
                Drag & drop or <span className="text-main">choose files</span>{" "}
                to upload
              </p>
              <p className="text-[#696969]">JPG, PNG, TIF, WEBP</p>
              <p className="text-[#696969]">10MB maximum</p>

              <input
                className="absolute h-full w-full opacity-0 cursor-pointer"
                type="file"
                accept=".png,.jpg,.jpeg,.tif,.webp"
                multiple
                onChange={handleFileChange}
              />
            </div>
          )}

          {images.length > 0 && (
            <div className="border-2 relative border-main/50 border-dashed rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 p-2 flex-col gap-2">
              {images.slice(0, 5).map((f, i) => (
                <div
                  key={i}
                  className="w-full rounded-md overflow-hidden aspect-square relative group grid place-items-center"
                >
                  <img
                    src={f.s}
                    alt="Image"
                    className="w-full h-full object-cover group-hover:opacity-40 transition-all"
                  />

                  <Button
                    variant="outline"
                    className="shadow-none opacity-0 group-hover:opacity-100 absolute transition-all"
                    onClick={() =>
                      setFiles((k) => k.filter((a) => a.id !== f.id))
                    }
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <div className="relative w-full aspect-square rounded-lg grid place-items-center">
                <Button
                  variant="outline"
                  className="border-none shadow-none hover:bg-transparent"
                >
                  Add image
                </Button>

                <input
                  className="absolute h-full w-full opacity-0 cursor-pointer"
                  type="file"
                  accept=".png,.jpg,.jpeg,.tif,.webp"
                  multiple
                  onChange={handleFileChange}
                  disabled={images.length === 5}
                />
              </div>
            </div>
          )}
        </div>

        {/* Single column elements */}
        <div className="grid gap-2">
          <Label htmlFor="name">
            Name <span className="text-red">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your product name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="production">
            Production <span className="text-red">*</span>
          </Label>

          <div className="w-full flex gap-2 items-center">
            <Switch checked={onDemand} onCheckedChange={setOnDemand} />

            <p className="text-sm whitespace-nowrap mr-4">On demand</p>

            <Input
              id="production"
              type="number"
              required
              value={production}
              onChange={(e) => setProduction(e.target.value)}
              placeholder="25"
              className="bg-white"
              disabled={onDemand}
            />
          </div>
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-white"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="sourcing">
            Sourcing <span className="text-red">*</span>
          </Label>
          <Select value={sourcing} onValueChange={(e) => setSourcing(e)}>
            <SelectTrigger className="w-full bg-white" id="sourcing">
              <SelectValue placeholder="Select a source" />
            </SelectTrigger>
            <SelectContent id="sourcing" className="bg-white">
              <SelectGroup>
                {SOURCING.map((s, i) => (
                  <SelectItem value={s} key={i}>
                    {s}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="packaging">
            Packaging <span className="text-red">*</span>
          </Label>
          <Select value={packaging} onValueChange={(e) => setPackaging(e)}>
            <SelectTrigger className="w-full bg-white" id="packaging">
              <SelectValue placeholder="Select a packaging type" />
            </SelectTrigger>
            <SelectContent id="packaging" className="bg-white">
              <SelectGroup>
                {PACKAGING.map((p, i) => (
                  <SelectItem value={p} key={i}>
                    {p}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Last three elements that span full width */}
        <div className="grid gap-2 col-span-1 md:col-span-2">
          <Label htmlFor="features">
            Sustainability features <span className="text-red">*</span>
          </Label>
          <MultiSelect
            fullList={SUSTAINABILITY_FEATURES}
            selected={susFeats}
            setSelected={setSusFeats}
          />
        </div>

        <div className="grid gap-2 col-span-1 md:col-span-2">
          <Label htmlFor="desc">
            Description <span className="text-red">*</span>
          </Label>
          <Textarea
            id="desc"
            placeholder="Enter your product's description"
            className="bg-white"
            rows={5}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="grid gap-2 col-span-1 md:col-span-2">
          <Label htmlFor="eol-info">End of life information</Label>
          <Textarea
            id="eol-info"
            placeholder="Recycle/dispose information"
            className="bg-white"
            rows={5}
            value={endOfLife}
            onChange={(e) => setEndOfLife(e.target.value)}
          />
        </div>

        {/* Button that spans full width */}
        <Button
          className="w-full bg-main hover:bg-main/90 cursor-pointer mx-auto self-center col-span-1 md:col-span-2"
          // onClick={() => validate()}
          // disabled={loading}
        >
          Upload
          {/* {loading && <LoaderCircle className="animate-spin" />} */}
        </Button>
      </section>
    </>
  );
};

export default ListProduct;

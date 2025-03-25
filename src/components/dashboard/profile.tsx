"use client";

import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { Seller, UpdateProfile } from "@/interfaces/general";
import { useAtomValue } from "jotai";
import { user_details } from "@/app/atoms/atoms";
import { useRouter } from "next/navigation";
import { getSellerDetails, updateSellerProfile } from "@/lib/requests/seller";
import toast from "react-hot-toast";
import PageLoader from "../general/page-loader";
import { LoaderCircle } from "lucide-react";

const Profile = () => {
  const [seller, setSeller] = useState<Seller | null>(null);
  const userInfo = useAtomValue(user_details);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const update = async () => {
    // const formdata = new FormData();

    // if (files) {
    //   formdata.append("avatar", files[0]);
    // }

    // formdata.append("businessName", name);
    // formdata.append("bio", bio);

    const d = {
      businessName: name,
      bio,
    };

    setIsLoading(true);

    const { data, error } = await updateSellerProfile(userInfo?.id || "", d);

    setIsLoading(false);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success(data);
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await getSellerDetails(userInfo?.id || "");

      setLoading(false);

      if (error) return toast.error(error);

      setSeller(data as Seller);
    })();
  }, []);

  useEffect(() => {
    setName(seller?.businessName || "");
    setBio(seller?.bio || "");
    setImage(
      seller?.avatar ||
        `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${seller?.businessName}`
    );
  }, [seller]);

  if (loading) return <PageLoader />;

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">Profile</h1>

      <p className="text-[#696969]">Manage your account information</p>

      <Separator />

      <p>Profile picture</p>

      <div className="flex items-center justify-start gap-6">
        <Avatar className="size-20 rounded-full">
          <AvatarImage src={image} alt="Image" />
          <AvatarFallback className="rounded-lg">DP</AvatarFallback>
        </Avatar>

        <Button className="bg-main hover:bg-main/90 relative cursor-pointer">
          Change{" "}
          <Input
            type="file"
            className="absolute opacity-0 cursor-pointer"
            accept=".png,.jpg,.jpeg"
            onChange={(e) => {
              setFiles(e.target.files);

              if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();

                reader.onload = (e) => {
                  setImage(e.target!.result as string);
                };

                reader.readAsDataURL(e.target.files[0]);
              }
            }}
          />
        </Button>
      </div>

      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Orion & Sons"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white"
          />
        </div>

        {/* <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            className="bg-white"
            disabled
            value={seller?.user.email}
          /> */}
        {/* </div> */}

        <div className="grid gap-2 col-span-1 md:col-span-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Leading provider of eco-friendly products."
            className="bg-white"
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
      </section>

      <Button className="bg-main hover:bg-main/90 w-fit" onClick={update}>
        Save changes {isLoading && <LoaderCircle className="animate-spin" />}
      </Button>
    </>
  );
};

export default Profile;

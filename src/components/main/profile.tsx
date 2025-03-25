"use client";

import { LoaderCircle, PencilLine } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Customer } from "@/interfaces/general";
import { user_details } from "@/app/atoms/atoms";
import { useAtomValue } from "jotai";
import {
  getCustomerDetails,
  updateCustomerDetails,
} from "@/lib/requests/customer";
import PageLoader from "../general/page-loader";

const Profile = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const userInfo = useAtomValue(user_details);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const info = [
    { title: "First name", val: firstName, setter: setFirstName },
    { title: "Last name", val: lastName, setter: setLastName },
  ];

  const address = [
    { title: "Street", val: street, setter: setStreet },
    { title: "City", val: city, setter: setCity },
    { title: "Zip", val: zip, setter: setZip },
  ];

  const updateInfo = async (which: 1 | 2) => {
    setIsLoading(true);
    let d;

    if (which === 1) {
      const values = [firstName, lastName].filter((v) => v === "");

      if (values.length !== 0) {
        return toast.error("Please fill in all the fields.");
      }

      d = { firstname: firstName, lastname: lastName };
    } else {
      const values = [street, city, zip].filter((v) => v === "");

      if (values.length !== 0) {
        return toast.error("Please fill in all the fields.");
      }

      d = {
        address: {
          street,
          city,
          zip,
        },
      };
    }

    const { data, error } = await updateCustomerDetails(userInfo?.id || "", d);

    setIsLoading(false);

    if (error) {
      return toast.error(error);
    }

    toast.success(data);
    setIsEditingInfo(false);
    setIsEditingAddress(false);
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await getCustomerDetails(userInfo?.id || "");

      if (error) {
        toast.error(error);

        return;
      }

      setLoading(false);

      setCustomer(data as Customer);
    })();
  }, []);

  useEffect(() => {
    setFirstName(customer?.firstname || "No info found.");
    setLastName(customer?.lastname || "No info found.");
    setStreet(customer?.address?.street || "No info found.");
    setCity(customer?.address?.city || "No info found.");
    setZip(customer?.address?.zip || "No info found.");
  }, [customer]);

  if (loading) return <PageLoader />;

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">Profile</h1>

      <div className="w-full max-w-4xl relative bg-white border shadow rounded-lg flex flex-col gap-6 p-4">
        <div className="flex justify-between items-center w-full">
          <p className="lg:text-lg">Personal information</p>

          {!isEditingInfo && (
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setIsEditingInfo(true)}
            >
              Edit <PencilLine />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4">
          {info.map((n, i) => (
            <div className="grid gap-1" key={i}>
              <p className="text-muted-foreground">{n.title}</p>

              {!isEditingInfo ? (
                <p>{n.val}</p>
              ) : (
                <Input
                  value={n.val}
                  onChange={(e) => n.setter(e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        {isEditingInfo && (
          <div className="flex gap-4 items-center w-full">
            <Button
              variant="outline"
              className="border-red text-red hover:text-red"
              onClick={() => setIsEditingInfo(false)}
            >
              Cancel
            </Button>

            <Button
              className="bg-main hover:bg-main/90"
              disabled={isLoading}
              onClick={() => updateInfo(1)}
            >
              Save changes{" "}
              {isLoading && <LoaderCircle className="animate-spin" />}
            </Button>
          </div>
        )}
      </div>

      <div className="w-full max-w-4xl relative bg-white border shadow rounded-lg flex flex-col gap-6 p-4">
        <div className="flex justify-between items-center w-full">
          <p className="lg:text-lg">Shipping address</p>

          {!isEditingAddress && (
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setIsEditingAddress(true)}
            >
              Edit <PencilLine />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4">
          {address.map((n, i) => (
            <div className="grid gap-1" key={i}>
              <p className="text-muted-foreground">{n.title}</p>

              {!isEditingAddress ? (
                <p>{n.val}</p>
              ) : (
                <Input
                  value={n.val}
                  onChange={(e) => n.setter(e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        {isEditingAddress && (
          <div className="flex gap-4 items-center w-full">
            <Button
              variant="outline"
              className="border-red text-red hover:text-red"
              onClick={() => setIsEditingAddress(false)}
            >
              Cancel
            </Button>

            <Button
              className="bg-main hover:bg-main/90"
              disabled={isLoading}
              onClick={() => updateInfo(2)}
            >
              Save changes{" "}
              {isLoading && <LoaderCircle className="animate-spin" />}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;

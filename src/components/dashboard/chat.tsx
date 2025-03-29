"use client";

import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Conversation } from "@/interfaces/general";
import { user_details } from "@/app/atoms/atoms";
import { useAtomValue } from "jotai";
import { getConversations } from "@/lib/requests/seller";
import toast from "react-hot-toast";
import PageLoader from "../general/page-loader";
import Link from "next/link";
import { PAGES } from "@/constants/constants";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

const Chat = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [convo, setConvo] = useState<Conversation | null>(null);
  const userInfo = useAtomValue(user_details);

  // useEffect(() => {
  //   (async () => {
  //     const { data, error } = await getConversations(userInfo?.id || "");

  //     setLoading(false);

  //     if (error) return toast.error(error);

  //     setConvos(data as Conversation[]);
  //   })();
  // }, []);

  // if (loading) return <PageLoader />;

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">Chat</h1>

      <p className="text-[#696969]">Manage your chats</p>

      <Separator />

      <div className="bg-white border rounded-2xl max-w-4xl overflow-hidden">
        <div className="w-full p-4 border-b flex items-center gap-4">
          <div className="overflow-hidden aspect-square rounded-full w-8">
            <img
              src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=Victor`}
              // src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${c.customer.firstname}`}
              alt="Image"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="font-medium">Victor Ibironke</p>
        </div>

        <div className="h-[calc(100vh-23rem)] p-2 overflow-scroll"></div>

        <div className="border-t w-full flex items-center gap-4 p-4">
          <Input className="focus-visible:border-main  focus-visible:ring-0" />

          <Button variant="outline" className="text-main border-main">
            <Send />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Chat;

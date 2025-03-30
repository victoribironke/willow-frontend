"use client";

import { useEffect, useRef, useState } from "react";
import { Separator } from "../ui/separator";
import { Conversation } from "@/interfaces/general";
import { user_details } from "@/app/atoms/atoms";
import { useAtomValue } from "jotai";
import { getConversation } from "@/lib/requests/customer";
import toast from "react-hot-toast";
import PageLoader from "../general/page-loader";
import { PAGES } from "@/constants/constants";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { cn, formatDateTime } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const Chat = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [convo, setConvo] = useState<Conversation | null>(null);
  const userInfo = useAtomValue(user_details);
  const scrollElement = useRef<HTMLSpanElement>(null);
  const searchParams = useSearchParams();

  const name = searchParams.get("name");

  useEffect(() => {
    (async () => {
      const { data, error } = await getConversation(userInfo?.id || "", id);

      setLoading(false);

      if (error) {
        if (error !== "Conversation not found.") return toast.error(error);

        setConvo(null);
        return;
      }

      setConvo(data as Conversation);

      scrollElement.current?.scrollIntoView({ behavior: "smooth" });
    })();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">Chat</h1>

      <p className="text-[#696969]">
        Chat with {id === "new" ? name : convo?.customer.firstname}
      </p>

      <Separator />

      <div className="bg-white border rounded-2xl max-w-4xl overflow-hidden">
        <div className="w-full p-4 border-b flex items-center gap-4">
          <div className="overflow-hidden aspect-square rounded-full w-8">
            <img
              src={
                convo?.seller.avatar?.url ||
                `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${convo?.seller.businessName}`
              }
              alt="Image"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="font-medium">{convo?.seller.businessName}</p>
        </div>

        <div className="h-[calc(100vh-23rem)] p-2 overflow-scroll flex flex-col gap-4">
          {convo?.messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "w-fit max-w-sm",
                m.receiverId !== userInfo?.id ? "self-start" : "self-end"
              )}
            >
              <p
                className={cn(
                  "p-3 w-full mb-1",
                  m.receiverId !== userInfo?.id
                    ? "self-start bg-gray-100 rounded-e-xl rounded-t-xl"
                    : "self-end bg-main text-white rounded-s-xl rounded-t-xl"
                )}
              >
                {m.content}
              </p>

              <p
                className={cn(
                  "text-xs text-gray-400 w-full",
                  m.receiverId !== userInfo?.id ? "text-left" : "text-right"
                )}
              >
                {formatDateTime(m.createdAt)}
              </p>
            </div>
          ))}

          <span ref={scrollElement} />
        </div>

        <div className="border-t w-full flex items-center gap-4 p-4">
          <Input
            className="focus-visible:border-main focus-visible:ring-0"
            placeholder="Type something"
          />

          <Button variant="outline" className="text-main border-main">
            <Send />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Chat;

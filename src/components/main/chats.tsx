"use client";

import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Conversation } from "@/interfaces/general";
import { user_details } from "@/app/atoms/atoms";
import { useAtomValue } from "jotai";
import { getConversations } from "@/lib/requests/customer";
import toast from "react-hot-toast";
import PageLoader from "../general/page-loader";
import { cn, formatDateTime } from "@/lib/utils";
import Chat from "./chat";
import { useSearchParams } from "next/navigation";

const Chats = () => {
  const [loading, setLoading] = useState(true);
  const [convos, setConvos] = useState<Conversation[]>([]);
  const userInfo = useAtomValue(user_details);

  const searchParams = useSearchParams();

  const convoId = searchParams.get("id");

  const [id, setId] = useState(convoId ? convoId : "");

  useEffect(() => {
    (async () => {
      const { data, error } = await getConversations(userInfo?.id || "");

      setLoading(false);

      if (error) return toast.error(error);

      setConvos(data as Conversation[]);
    })();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">Chats</h1>

      <p className="text-[#696969]">Manage your chats with sellers</p>

      <Separator />

      <div className="w-full flex gap-4">
        <div
          className={cn(
            "flex flex-col h-[calc(100vh-15rem)] overflow-scroll",
            id ? "w-1/3" : "w-full"
          )}
        >
          {convos.map((c, i) => (
            <div
              key={i}
              className={cn(
                "bg-white rounded-xl cursor-pointer border hover:shadow p-3 gap-4 flex items-center justify-center",
                c.id === id ? "border-main" : ""
              )}
              onClick={() => setId(c.id)}
            >
              <div className="overflow-hidden aspect-square rounded-full w-10">
                <img
                  src={
                    c.seller.avatar?.url ||
                    `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${c.seller.businessName}`
                  }
                  alt="Image"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mr-auto">
                <p className="font-medium">{c.seller.businessName}</p>

                <p className="text-sm text-muted-foreground">
                  {c.messages.at(-1)?.content.slice(0, 50).trim()}
                  {(c.messages.at(-1)?.content.length || 0) >= 50 && "..."}
                </p>
              </div>

              {!id && (
                <p className="text-muted-foreground text-sm">
                  {formatDateTime(c.messages.at(-1)?.createdAt || new Date())}
                </p>
              )}
            </div>
          ))}
        </div>

        {id && <Chat id={id} />}
      </div>
    </>
  );
};

export default Chats;

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
import { formatDateTime } from "@/lib/utils";

const Chats = () => {
  const [loading, setLoading] = useState(true);
  const [convos, setConvos] = useState<Conversation[]>([]);
  const userInfo = useAtomValue(user_details);

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

      <p className="text-[#696969]">Manage your chats with customers</p>

      <Separator />

      <div className="w-full flex flex-col">
        {convos.map((c, i) => (
          <Link href={PAGES.dashboard.chat(c.id)} key={i}>
            <div className="hover:bg-white rounded-lg cursor-pointer border-b p-3 gap-4 flex items-center justify-center">
              <div className="overflow-hidden aspect-square rounded-full w-10">
                <img
                  src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${c.customer.firstname}`}
                  alt="Image"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mr-auto">
                <p className="font-medium">
                  {c.customer.firstname} {c.customer.lastname}
                </p>

                <p className="text-sm text-muted-foreground">
                  {c.messages[-1].content.slice(0, 50).trim()}
                  {c.messages[-1].content.length >= 50 && "..."}
                </p>
              </div>

              <p className="text-muted-foreground text-sm">
                {formatDateTime(c.messages[-1].createdAt)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Chats;

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

const Chat = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [convos, setConvos] = useState<Conversation[]>([]);
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

      <div className="w-full flex flex-col">
        <Link href={PAGES.dashboard.chat("fsd")}>
          <div className="hover:bg-white rounded-lg cursor-pointer border-b p-3 gap-4 flex items-center justify-center">
            <div className="overflow-hidden aspect-square rounded-full w-10">
              <img
                src="https://avatars.1b96cf6605c095713225e0ab3d88fd1c.r2.cloudflarestorage.com/1742994674630-Babcock.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=3074514f03916b56750f94c7626a8462%2F20250329%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250329T135405Z&X-Amz-Expires=604800&X-Amz-Signature=e9969ea1e67b415c35e059b95361d2dfd3057581a640d0cfab3234a357762cc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
                alt="Image"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mr-auto">
              <p className="font-medium">Victor Ibironke</p>

              <p className="text-sm text-muted-foreground">
                This is the last message that was sent to me. This is a
                placeholder so beware
              </p>
            </div>

            <p className="text-muted-foreground text-sm">03:43 PM</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Chat;

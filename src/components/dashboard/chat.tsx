"use client";

import { useEffect, useRef, useState } from "react";
import { ChatReceived, Conversation } from "@/interfaces/general";
import { user_details } from "@/app/atoms/atoms";
import { useAtomValue } from "jotai";
import { getConversation } from "@/lib/requests/seller";
import toast from "react-hot-toast";
import PageLoader from "../general/page-loader";
import { ws } from "@/constants/constants";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { cn, formatDateTime } from "@/lib/utils";

const Chat = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [convo, setConvo] = useState<Conversation | null>(null);
  const userInfo = useAtomValue(user_details);
  const scrollElement = useRef<HTMLSpanElement>(null);

  const sendMessage = () => {
    if (!message) return;

    setSending(true);

    if (ws.readyState === 1) {
      ws.send(
        JSON.stringify({
          type: "message",
          data: {
            conversationId: id,
            content: message,
            recipientId: convo?.customerId || "",
          },
        })
      );
    } else {
      toast.error("Your message is unable to send. Please refresh the page.");

      console.log("WebSocket is not ready!");
    }

    setSending(false);
  };

  if (ws.readyState === 1) {
    ws.onmessage = (event) => {
      try {
        if (event.type === "error") {
          // show that the message was not sent

          console.error("Received error message:", event.data);
        } else if (event.type === "message") {
          const data = JSON.parse(event.data).data as ChatReceived;

          if (convo) {
            setConvo({
              ...convo,
              messages: [
                ...convo.messages,
                {
                  content: data.content,
                  conversation: "",
                  conversationId: data.conversationId,
                  createdAt: new Date(),
                  id: data.id,
                  isReported: false,
                  receiverId: data.receiverId,
                  senderId: data.senderId,
                  images: "",
                },
              ],
            });
          }

          setMessage("");
        }
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    };
  }

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { data, error } = await getConversation(userInfo?.id || "", id);

      setLoading(false);

      if (error) return toast.error(error);

      setConvo(data as Conversation);

      scrollElement.current?.scrollIntoView({ behavior: "smooth" });
    })();
  }, [id]);

  return (
    <div className="bg-white border rounded-2xl overflow-hidden w-2/3 self-start">
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <div className="w-full p-4 border-b flex items-center gap-4">
            <div className="overflow-hidden aspect-square rounded-full w-8">
              <img
                src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${convo?.customer.firstname}`}
                alt="Image"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="font-medium">
              {convo?.customer.firstname} {convo?.customer.lastname}
            </p>
          </div>
          <div className="h-[calc(100vh-23rem)] p-2 overflow-scroll flex flex-col gap-4">
            {convo?.messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "w-fit max-w-sm",
                  m.receiverId === userInfo?.id ? "self-start" : "self-end"
                )}
              >
                <p
                  className={cn(
                    "p-3 w-full mb-1",
                    m.receiverId === userInfo?.id
                      ? "self-start bg-gray-100 rounded-e-xl rounded-t-xl"
                      : "self-end bg-main text-white rounded-s-xl rounded-t-xl"
                  )}
                >
                  {m.content}
                </p>

                <p
                  className={cn(
                    "text-xs text-gray-400 w-full",
                    m.receiverId === userInfo?.id ? "text-left" : "text-right"
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
              onKeyUp={(e) => e.key === "Enter" && sendMessage()}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={sending}
            />

            <Button
              variant="outline"
              className="text-main border-main"
              onClick={sendMessage}
              disabled={sending}
            >
              <Send />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;

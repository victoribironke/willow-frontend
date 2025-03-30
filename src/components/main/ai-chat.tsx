import { user_details } from "@/app/atoms/atoms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PAGES } from "@/constants/constants";
import { AIChat } from "@/interfaces/general";
import { getAIConversation, sendMessageToAI } from "@/lib/requests/customer";
import { cn, convertTextFromUppercase, formatNumber } from "@/lib/utils";
import { useAtomValue } from "jotai";
import {
  ArrowUp,
  Leaf,
  LoaderCircle,
  MessageCircleMore,
  Sparkle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const AIChatPage = () => {
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const userInfo = useAtomValue(user_details);
  const [convo, setConvo] = useState<AIChat | null>(null);
  const scrollElement = useRef<HTMLSpanElement>(null);

  const sendMessage = async () => {
    if (!message) return;

    if (convo) {
      setConvo({
        ...convo,
        history: [
          ...(convo.history || []),
          { parts: [{ text: message }], role: "user" },
        ],
      });
    } else {
      setConvo({
        history: [{ parts: [{ text: message }], role: "user" }],
        createdAt: new Date(),
        customer: "",
        customerId: "",
        id: "",
        isFlagged: false,
        status: "",
        updatedAt: new Date(),
      });
    }

    setSending(true);

    setTimeout(() => {
      scrollElement.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);

    const d = { userQuery: message };

    const { data, error } = await sendMessageToAI(userInfo?.id || "", d);

    setSending(false);

    if (error) {
      setError("An error occured. Please try again later.");
      return;
    }

    setMessage("");

    if (convo) {
      setConvo({
        ...convo,
        history: [
          ...(convo.history || []),
          { parts: [{ text: message }], role: "user" },
          {
            parts: [{ text: { text: data.text, products: data.products } }],
            role: "model",
          },
        ],
      });
    }

    setTimeout(() => {
      scrollElement.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await getAIConversation(userInfo?.id || "");

      setLoading(false);

      if (error) return toast.error(error);

      setConvo(data as AIChat);

      setTimeout(() => {
        scrollElement.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    })();
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="fixed bottom-8 right-8 border p-2 shadow rounded-full bg-white cursor-pointer">
          <MessageCircleMore size={40} fill="#00a606" className="text-white" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[30rem] p-0 mr-8 mb-4 rounded-xl overflow-hidden border-none">
        <div className="bg-black text-white w-full text-center p-4">
          Willow AI
        </div>

        {loading ? (
          <div className="h-[calc(100vh-23rem)] p-4 grid place-items-center text-main">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : (
          <div className="h-[calc(100vh-23rem)] px-4 pt-4 overflow-scroll flex flex-col gap-4">
            {convo?.history.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "w-fit max-w-xs flex flex-col gap-2",
                  m.role === "model" ? "self-start" : "self-end"
                )}
              >
                <p
                  className={cn(
                    "p-3 w-full",
                    m.role === "model"
                      ? "self-start bg-muted rounded-e-xl rounded-t-xl"
                      : "self-end bg-main text-white rounded-s-xl rounded-t-xl"
                  )}
                >
                  {typeof m.parts[0].text === "string"
                    ? m.parts[0].text
                    : m.parts[0].text.text}
                </p>

                {typeof m.parts[0].text !== "string" &&
                  m.parts[0].text.products &&
                  m.parts[0].text.products.map((p, i) => (
                    <Link href={PAGES.main.shop.product(p.id)} key={i}>
                      <div className="w-full border shadow flex gap-2 rounded-xl p-2">
                        <div className="w-[6.5rem] border shadow rounded-lg overflow-hidden aspect-square self-start">
                          <img
                            src={p.images[0].url}
                            alt="Image"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <div className="text-main border px-2 py-1 flex items-center justify-center text-xs gap-1 rounded-md font-medium w-fit whitespace-nowrap">
                            <Leaf size={14} />{" "}
                            {convertTextFromUppercase(
                              p.sustainabilityTag || p.sustainability_tag
                            )}
                          </div>
                          <p className="font-medium">
                            {p.name.slice(0, 20).trim()}
                            {p.name.length >= 20 && "..."}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {p.category}
                          </p>
                          <p className="text-sm font-medium">
                            ₦ {formatNumber(p.price)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            ))}

            {sending && (
              <div className="w-fit max-w-xs flex flex-col gap-2 self-start">
                <p className="p-3 w-full self-start bg-muted flex gap-2 items-center rounded-e-xl rounded-t-xl text-main animate-pulse">
                  <Sparkle size={15} /> Working on it...
                </p>
              </div>
            )}

            {error && (
              <div className="w-fit max-w-sm flex flex-col gap-2 self-start">
                <p className="p-3 w-full self-start flex gap-2 items-center rounded-e-xl rounded-t-xl text-red">
                  {error}
                </p>
              </div>
            )}

            <span ref={scrollElement} />
          </div>
        )}

        <div className="border-t w-full flex items-center gap-4 p-4">
          <Input
            className="focus-visible:border-main focus-visible:ring-0"
            placeholder="Ask anything"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && sendMessage()}
            disabled={sending}
          />

          <Button
            className="text-white bg-main hover:bg-main/90"
            onClick={sendMessage}
            disabled={sending}
          >
            <ArrowUp />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AIChatPage;

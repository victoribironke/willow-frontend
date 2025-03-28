import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReportProps } from "@/interfaces/general";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { cn, getRangeString } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { PAGES } from "@/constants/constants";
import { Angry, ArrowRight, Frown, Laugh, Meh, Smile } from "lucide-react";

const Report = ({
  report,
  back,
}: {
  report: ReportProps;
  back: Dispatch<SetStateAction<ReportProps | null>>;
}) => {
  const s = parseInt(report.score);

  const text = getRangeString(s);
  const [open, setOpen] = useState(false);

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">Report</h1>

      <p className="text-[#696969]">
        The report is based on the review of the product information you
        provided.
      </p>

      <Separator />

      <div className="w-full flex items-center justify-center gap-4">
        <Angry
          size={50}
          className={s >= 0 && s <= 29 ? "text-red" : "text-[#696969]"}
        />
        <Frown
          size={50}
          className={s >= 30 && s <= 49 ? "text-yellow" : "text-[#696969]"}
        />
        <Meh
          size={50}
          className={s >= 50 && s <= 69 ? "text-black" : "text-[#696969]"}
        />
        <Smile
          size={50}
          className={s >= 70 && s <= 89 ? "text-main/50" : "text-[#696969]"}
        />
        <Laugh
          size={50}
          className={s >= 90 && s <= 100 ? "text-main" : "text-[#696969]"}
        />
      </div>

      <p className="lg:text-lg font-medium w-full text-center text-[#696969]">
        {text}
      </p>

      <p className="text-center max-w-3xl w-full mx-auto">{report.message}</p>

      {report.message.includes("extended vetting") && (
        <p
          className="w-fit mx-auto text-sm underline cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Apply for extended vetting
        </p>
      )}

      <Link
        href={PAGES.main.more_about_willow}
        className="mx-auto"
        target="_blank"
      >
        <Button className="rounded-full bg-main hover:bg-main hover:gap-3">
          See our sustainability approach <ArrowRight />
        </Button>
      </Link>

      <p
        className="w-fit mx-auto text-sm underline cursor-pointer"
        onClick={() => back(null)}
      >
        Go back
      </p>

      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Extended vetting</DialogTitle>
            {/* <DialogDescription>
                The report is based on the review of the product information you
                provided.
              </DialogDescription> */}
          </DialogHeader>

          <p className="text-[0.9rem]">
            If you feel your product has been incorrectly vetted, please visit
            our physical location:{" "}
            <span className="font-medium">
              Babcock University, Ilishan-Remo, Ogun state
            </span>{" "}
            or contact us at{" "}
            <span className="font-medium">willowstem25@gmail.com</span>.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Report;

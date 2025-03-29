import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Reviewing = () => {
  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">
        Reviewing uploaded product
      </h1>

      <p className="text-[#696969]">
        Ensure the information provided accurately reflects your product, this
        helps in vetting accuracy and maintaining a high-quality marketplace for
        all our users.
      </p>

      <Separator />

      <DotLottieReact
        src="https://lottie.host/9134bf01-8e43-49a5-9f56-505620de1286/cSHsHXAREx.lottie"
        loop
        autoplay
        className="w-full max-w-sm mx-auto -mb-5 mt-4"
      />

      <h1 className="text-lg lg:text-xl font-medium w-full text-center">
        Performing Willow magic
      </h1>

      <Button
        variant="outline"
        className="w-fit mx-auto rounded-full bg-main/10 border border-main text-xs hover:bg-main/10"
      >
        Note: Do not refresh, close, or click the back button on this page. You
        might lose your data.
      </Button>
    </>
  );
};

export default Reviewing;

import { IMAGES } from "@/constants/constants";
import Image from "next/image";

const ImageCarousel = () => {
  return (
    <div className="w-full overflow-hidden relative">
      <div className="flex animate-marquee space-x-4">
        {/* First set of images */}
        <div className="w-1/4 flex-shrink-0 rounded-xl overflow-hidden aspect-[9/16]">
          <Image
            src={IMAGES.more_about_willow.two.src}
            width={IMAGES.more_about_willow.two.w}
            height={IMAGES.more_about_willow.two.h}
            alt="Image two"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/4 flex-shrink-0 rounded-xl overflow-hidden aspect-[9/16]">
          <Image
            src={IMAGES.more_about_willow.three.src}
            width={IMAGES.more_about_willow.three.w}
            height={IMAGES.more_about_willow.three.h}
            alt="Image three"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/4 flex-shrink-0 rounded-xl overflow-hidden aspect-[9/16]">
          <Image
            src={IMAGES.more_about_willow.four.src}
            width={IMAGES.more_about_willow.four.w}
            height={IMAGES.more_about_willow.four.h}
            alt="Image four"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/4 flex-shrink-0 rounded-xl overflow-hidden aspect-[9/16]">
          <Image
            src={IMAGES.more_about_willow.five.src}
            width={IMAGES.more_about_willow.five.w}
            height={IMAGES.more_about_willow.five.h}
            alt="Image five"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/4 flex-shrink-0 rounded-xl overflow-hidden aspect-[9/16]">
          <Image
            src={IMAGES.more_about_willow.six.src}
            width={IMAGES.more_about_willow.six.w}
            height={IMAGES.more_about_willow.six.h}
            alt="Image six"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/4 flex-shrink-0 rounded-xl overflow-hidden aspect-[9/16]">
          <Image
            src={IMAGES.more_about_willow.seven.src}
            width={IMAGES.more_about_willow.seven.w}
            height={IMAGES.more_about_willow.seven.h}
            alt="Image seven"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/4 flex-shrink-0 rounded-xl overflow-hidden aspect-[9/16]">
          <Image
            src={IMAGES.more_about_willow.eight.src}
            width={IMAGES.more_about_willow.eight.w}
            height={IMAGES.more_about_willow.eight.h}
            alt="Image eight"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/4 flex-shrink-0 rounded-xl overflow-hidden aspect-[9/16]">
          <Image
            src={IMAGES.more_about_willow.nine.src}
            width={IMAGES.more_about_willow.nine.w}
            height={IMAGES.more_about_willow.nine.h}
            alt="Image nine"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Duplicate images for seamless loop */}
        <div className="w-1/4 flex-shrink-0 rounded-xl overflow-hidden aspect-[9/16]">
          <Image
            src={IMAGES.more_about_willow.two.src}
            width={IMAGES.more_about_willow.two.w}
            height={IMAGES.more_about_willow.two.h}
            alt="Image two"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/4 flex-shrink-0 rounded-xl overflow-hidden aspect-[9/16]">
          <Image
            src={IMAGES.more_about_willow.three.src}
            width={IMAGES.more_about_willow.three.w}
            height={IMAGES.more_about_willow.three.h}
            alt="Image three"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/4 flex-shrink-0 rounded-xl overflow-hidden aspect-[9/16]">
          <Image
            src={IMAGES.more_about_willow.four.src}
            width={IMAGES.more_about_willow.four.w}
            height={IMAGES.more_about_willow.four.h}
            alt="Image four"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/4 flex-shrink-0 rounded-xl overflow-hidden aspect-[9/16]">
          <Image
            src={IMAGES.more_about_willow.five.src}
            width={IMAGES.more_about_willow.five.w}
            height={IMAGES.more_about_willow.five.h}
            alt="Image five"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/4 flex-shrink-0 rounded-xl overflow-hidden aspect-[9/16]">
          <Image
            src={IMAGES.more_about_willow.six.src}
            width={IMAGES.more_about_willow.six.w}
            height={IMAGES.more_about_willow.six.h}
            alt="Image six"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/4 flex-shrink-0 rounded-xl overflow-hidden aspect-[9/16]">
          <Image
            src={IMAGES.more_about_willow.seven.src}
            width={IMAGES.more_about_willow.seven.w}
            height={IMAGES.more_about_willow.seven.h}
            alt="Image seven"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/4 flex-shrink-0 rounded-xl overflow-hidden aspect-[9/16]">
          <Image
            src={IMAGES.more_about_willow.eight.src}
            width={IMAGES.more_about_willow.eight.w}
            height={IMAGES.more_about_willow.eight.h}
            alt="Image eight"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/4 flex-shrink-0 rounded-xl overflow-hidden aspect-[9/16]">
          <Image
            src={IMAGES.more_about_willow.nine.src}
            width={IMAGES.more_about_willow.nine.w}
            height={IMAGES.more_about_willow.nine.h}
            alt="Image nine"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;

import React, { RefObject, useEffect, useRef } from "react";
import { IMAGES } from "@/constants/constants";
import Image from "next/image";

const VerticalImageCarousel = () => {
  // Refs for animation
  const column1Ref = useRef<HTMLDivElement | null>(null);
  const column2Ref = useRef<HTMLDivElement | null>(null);
  const column3Ref = useRef<HTMLDivElement | null>(null);

  const speed = 20000;

  const { eight, five, four, nine, one, seven, six, three, two } =
    IMAGES.more_about_willow;

  // Sample placeholder images - replace with your actual images later
  const placeholderImages = [
    { src: one.src, w: one.w, h: one.h },
    { src: two.src, w: two.w, h: two.h },
    { src: three.src, w: three.w, h: three.h },
    { src: four.src, w: four.w, h: four.h },
    { src: five.src, w: five.w, h: five.h },
    { src: six.src, w: six.w, h: six.h },
    { src: seven.src, w: seven.w, h: seven.h },
    { src: eight.src, w: eight.w, h: eight.h },
    { src: nine.src, w: nine.w, h: nine.h },
  ];

  useEffect(() => {
    // Animation for column 1 (moving up)
    if (column1Ref.current) {
      const column1Animation = column1Ref.current.animate(
        [{ transform: "translateY(0)" }, { transform: "translateY(-50%)" }],
        {
          duration: speed,
          iterations: Infinity,
        }
      );

      // Animation for column 2 (moving down)
      if (column2Ref.current) {
        const column2Animation = column2Ref.current.animate(
          [{ transform: "translateY(-50%)" }, { transform: "translateY(0)" }],
          {
            duration: speed,
            iterations: Infinity,
          }
        );

        // Animation for column 3 (moving up)
        if (column3Ref.current) {
          const column3Animation = column3Ref.current.animate(
            [{ transform: "translateY(0)" }, { transform: "translateY(-50%)" }],
            {
              duration: speed,
              iterations: Infinity,
            }
          );

          return () => {
            column1Animation.cancel();
            column2Animation.cancel();
            column3Animation.cancel();
          };
        }
      }
    }
  }, [speed]);

  const renderImageColumn = (
    images: { src: string; w: number; h: number }[],
    ref: React.RefObject<HTMLDivElement>
  ) => {
    // Double the images to create a seamless loop
    const doubledImages = [...images, ...images];

    return (
      <div ref={ref} className="absolute h-[200%] w-full">
        {doubledImages.map((m, i) => (
          <div
            className="overflow-hidden aspect-[9/16] rounded-xl mb-4"
            key={i}
          >
            <Image
              src={m.src}
              width={m.w}
              height={m.h}
              alt="Image"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative hidden bg-muted lg:block overflow-hidden h-full">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-muted" />

      {/* Carousel container */}
      <div className="absolute inset-0 grid grid-cols-3 gap-4 pr-4">
        {/* Column 1 - Moving up */}
        <div className="relative h-full overflow-hidden">
          {renderImageColumn(
            placeholderImages.slice(0, 3),
            column1Ref as RefObject<HTMLDivElement>
          )}
        </div>

        {/* Column 2 - Moving down */}
        <div className="relative h-full overflow-hidden">
          {renderImageColumn(
            placeholderImages.slice(3, 6),
            column2Ref as RefObject<HTMLDivElement>
          )}
        </div>

        {/* Column 3 - Moving up */}
        <div className="relative h-full overflow-hidden">
          {renderImageColumn(
            placeholderImages.slice(6, 9),
            column3Ref as RefObject<HTMLDivElement>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerticalImageCarousel;

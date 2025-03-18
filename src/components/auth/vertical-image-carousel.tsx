import React, { JSX, RefObject, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IMAGES } from "@/constants/constants";

// Types for the component
interface ImagePlaceholder {
  id: number;
  color: string;
}

const VerticalImageCarousel = () => {
  // Refs for animation
  const column1Ref = useRef<HTMLDivElement | null>(null);
  const column2Ref = useRef<HTMLDivElement | null>(null);
  const column3Ref = useRef<HTMLDivElement | null>(null);

  const speed = 20000;

  // Sample placeholder images - replace with your actual images later
  const placeholderImages = [
    IMAGES.more_about_willow.one.src,
    IMAGES.more_about_willow.two.src,
    IMAGES.more_about_willow.three.src,
    IMAGES.more_about_willow.four.src,
    IMAGES.more_about_willow.five.src,
    IMAGES.more_about_willow.six.src,
    IMAGES.more_about_willow.seven.src,
    IMAGES.more_about_willow.eight.src,
    IMAGES.more_about_willow.nine.src,
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
    images: string[],
    ref: React.RefObject<HTMLDivElement>
  ) => {
    // Double the images to create a seamless loop
    const doubledImages = [...images, ...images];

    return (
      <div ref={ref} className="absolute h-[200%] w-full">
        {doubledImages.map((src, i) => (
          <div
            className="overflow-hidden aspect-[9/16] rounded-xl mb-4"
            key={i}
          >
            <img src={src} alt="Image" className="w-full h-full object-cover" />
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

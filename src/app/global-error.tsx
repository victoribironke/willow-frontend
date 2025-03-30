"use client";

import { Button } from "../components/ui/button";
import { LOCAL_STORAGE_KEY } from "@/constants/constants";

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  //   useEffect(() => {
  //     // Log the error to an error reporting service
  //     console.error("Global error:", error);
  //   }, [error]);

  const reload = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    reset();
  };

  return (
    <html>
      <body>
        <section className="w-full grid min-h-screen place-items-center px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg font-bold text-red">Error.</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              An error occured
            </h1>
            <p className="mt-6 text-lg leading-7">Please refresh the page.</p>
            <div className="mt-6 flex items-center justify-center gap-x-6">
              <Button onClick={reload} className="bg-main hover:bg-main/90">
                Refresh
              </Button>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
};

export default GlobalError;

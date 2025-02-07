import { ChevronRightIcon } from "lucide-react";
import MobileLayout from "../components/layout/MobileLayout";
import { Button } from "../components/ui/Button";
import BookIcon from "../icons/Book";
import { useNavigate } from "@tanstack/react-router";

export default function HomePage() {
  const nevigate = useNavigate();

  return (
    <MobileLayout>
      <div className="h-full min-h-0 w-full">
        <div className="text-center absolute justify-center items-center space-y-8 w-full flex flex-col top-46 font-bold mx-auto text-white m-auto text-4xl">
          <h1>SIT BOOKING</h1>
          <BookIcon />
        </div>
        <div className="absolute w-full flex flex-col space-y-5 justify-center items-center bottom-32">
          <Button
            onClick={() => nevigate({ to: "/booking" })}
            className="uppercase cursor-pointer h-11 rounded-full justify-between hover:bg-amber-300/80 px-6 bg-amber-300 text-black"
            variant="default"
          >
            booking now <ChevronRightIcon className="ml-3" />
          </Button>
          <span className="text-muted text-sm">CHECK OUT AVAILABLE ROOMS!</span>
        </div>
      </div>
    </MobileLayout>
  );
}

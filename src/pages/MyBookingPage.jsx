import { useState } from "react";
import MobileLayout from "../components/layout/MobileLayout";
import BookingCard from "../components/pages/my-booking/BookingCard";
import { Button } from "../components/ui/Button";
import { buildings } from "../libs/constants";
import { BookPlusIcon } from "lucide-react";

export default function MyBookingPage() {
  const [bookings, setBookings] = useState();

  const greetingMessage = () => {
    const time = new Date().getHours();
    let message = "Good Morning";

    if (time >= 12 && time < 18) {
      message = "Good Afternoon";
    } else if (time >= 18 || time < 6) {
      message = "Good Evening";
    }

    return message;
  };

  return (
    <MobileLayout>
      <div className="h-auto min-h-0 flex flex-col w-full p-5">
        <div className="flex items-center justify-between">
          <div className="text-white my-10 leading-6">
            <h1 className="font-bold text-4xl">Hello, 👋🏻</h1>
            <p className="font-bold mt-4">
              {greetingMessage()}, Welcome to sit booking system
            </p>
          </div>
        </div>
        <div className="flex self-start text-white items-center">
          <span className="font-medium text-sm mx-auto uppercase text-muted/80">
            My Booking
          </span>
        </div>
        <div className="flex mt-5 flex-col space-y-4 mb-4">
          <BookingCard
            location={buildings[0].name}
            room="LX10/2"
            date="2025-02-06"
            startTime="09:00"
            endTime="12:00"
            name="Kittihengcharoen"
            description="Project"
          />
        </div>
        <div className="flex w-full mt-auto">
          <Button
            //   onClick={handleSubmit}
            className=" uppercase cursor-pointer bg-black/30 te w-full backdrop-blur-3xl h-12 "
          >
            Craete a new booking
            <BookPlusIcon className="ml-4 text-muted/70"/>
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}

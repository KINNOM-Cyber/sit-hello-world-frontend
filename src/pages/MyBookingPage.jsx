import { useMemo, useState } from "react";
import MobileLayout from "../components/layout/MobileLayout";
import BookingCard from "../components/pages/my-booking/BookingCard";
import { Button } from "../components/ui/Button";
import { buildings, rooms } from "../libs/constants";
import { BookPlusIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export default function MyBookingPage() {
  const [bookings, setBookings] = useState();
  const navigate = useNavigate();

  const stroages = useMemo(() => {
    const keys = Object.keys(localStorage);
    return keys.map((key) => JSON.parse(localStorage.getItem(key)));
  }, [localStorage]);

  console.log(stroages)

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
          {stroages.length > 0 ? (
            stroages.map((item) => {
              const building = buildings.find(
                (building) => building.id == item.buildingId
              );
              const room = rooms.find((room) => room.id == item.roomId);
              return (
                <BookingCard
                  location={building.name}
                  room={room.code}
                  date={item.date}
                  startTime={item.startTime}
                  endTime={item.endTime}
                  name={item.name}
                  description={item.description}
                  bookingId={item.BookingId}
                />
              );
            })
          ) : (
            <div className="flex flex-col mt-[30%] space-y-2 items-center text-center justify-center leading-12">
              <h2 className="text-xl font-bold text-white">
                You didn't have any booking
              </h2>
              <p className="text-muted/80 text-sm">
                You can craete booking by clicking the{" "}
                <strong>'Create a new booking'</strong> button below
              </p>
            </div>
          )}
        </div>
        <div className="flex w-full mt-auto">
          <Button
            onClick={() => navigate({ to: "/booking" })}
            className=" uppercase cursor-pointer bg-black/30 te w-full backdrop-blur-3xl h-12 "
          >
            Craete a new booking
            <BookPlusIcon className="ml-4 text-muted/70" />
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}

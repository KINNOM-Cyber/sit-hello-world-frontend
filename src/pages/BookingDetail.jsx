import { redirect, useNavigate } from "@tanstack/react-router";
import MobileLayout from "../components/layout/MobileLayout";
import { BookCheckIcon } from "lucide-react";
import BookingCard from "../components/pages/booking-detail/BookingCard";
import { useBookingDetail } from "../contexts/useBookingDetail";
import { useEffect } from "react";

export default function BookingDetail() {
  const navigate = useNavigate();

  const { data, reset } = useBookingDetail();

  useEffect(() => {
    if (!data) {
      navigate({
        to: "/booking",
        replace: true,
        viewTransition: false,
        from: "/booking/detail",
      });
    }
  }, [data]);

  if (!data) return null;

  const { startTime, endTime, date } = data.payload;

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
    data && (
      <MobileLayout>
        <div className="h-auto min-h-0 w-full p-5 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="text-white my-10 leading-6">
              <h1 className="font-bold text-4xl">Hello, 👋🏻</h1>
              <p className="font-bold mt-4 w-[90%]">
                {greetingMessage()}, Welcome to sit booking system
              </p>
            </div>
            <button
              onClick={() => navigate({ to: "/booking/user" })}
              className="text-muted/70 bg-black/10 rounded-full p-4 backdrop-blur-2xl size-16 flex cursor-pointer"
            >
              <BookCheckIcon className="m-auto" size={32} strokeWidth={2} />
            </button>
          </div>

          <BookingCard
            data={data.response}
            startTime={startTime}
            endTime={endTime}
            date={new Date(date)}
          />
        </div>
      </MobileLayout>
    )
  );
}

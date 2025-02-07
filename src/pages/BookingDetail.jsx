import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import MobileLayout from "../components/layout/MobileLayout";
import { Button } from "../components/ui/Button";
import { BookCheckIcon, BookIcon, ChevronLeft } from "lucide-react";
import { buildings } from "../libs/constants";
import Badge from "../components/ui/Badge";
import { format } from "date-fns";
import BookingForm from "../components/pages/booking-detail/BookingForm";

export default function BookingDetail() {
  //   const { bid } = useParams({ strict: false });
  const navigate = useNavigate();
  const { bId, date, startTime, endTime } = useSearch({ strict: false });

  const data = {
    id: 1,
    name: "LX Building (10th Floor)",
    rooms: [
      {
        id: 1,
        code: "LX10/1",
        status: false,
      },
      {
        id: 2,
        code: "LX10/2",
        status: true,
      },
      {
        id: 3,
        code: "LX10/3",
        status: false,
      },
      {
        id: 4,
        code: "LX10/4",
        status: false,
      },
      {
        id: 5,
        code: "LX10/5",
        status: false,
      },
    ],
  };

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

  //   const buildingInfo = buildings.find((building) => building.id);

  return (
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
        <div className="w-full h-full flex flex-col rounded-3xl p-4 bg-black/30 backdrop-blur-2xl">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center">
              <BookIcon className="text-white" />
              <span className="text-white font-bold ml-3 text-lg">Detail</span>
            </div>
            <Badge color="emerald">Available</Badge>
          </div>
          <div className="flex flex-col mt-7 space-y-4 text-white">
            <div className="flex flex-col leading-12">
              <p className="text-muted/80 text-sm">Location</p>
              <h1 className="text-2xl font-bold mt-1">{data.name}</h1>
            </div>
          </div>
          <div className="flex items-center space-x-7 mt-7 text-white">
            <div className="flex flex-col leading-7">
              <p className="text-muted/80 text-sm">Start Time</p>
              <span className="text-ml font-medium mt-1">
                {startTime ?? "--:--"}
              </span>
            </div>
            <div className="flex flex-col leading-7">
              <p className="text-muted/80 text-sm">End Time</p>
              <span className="text-ml font-medium mt-1">
                {endTime ?? "--:--"}
              </span>
            </div>
            <div className="flex flex-col leading-7">
              <p className="text-muted/80 text-sm">Avaliable Room</p>
              <span className="text-ml font-medium mt-1">
                {data.rooms.filter((room) => room.status).length}
              </span>
            </div>
          </div>
          <div className="flex flex-col mt-5 space-y-4 text-white">
            <div className="flex flex-col leading-7">
              <p className="text-muted/80 text-sm">Date</p>
              <span className="text-ml font-medium mt-1">
                {format(date, "PPP")}
              </span>
            </div>
          </div>
          <BookingForm
            rooms={data.rooms}
            date={date}
            startTime={startTime}
            endTime={endTime}
          />
        </div>
      </div>
    </MobileLayout>
  );
}

import { BookIcon } from "lucide-react";
import Badge from "../../ui/Badge";
import BookingForm from "./BookingForm";
import { format } from "date-fns";

export default function BookingCard({ data, startTime, endTime, date }) {
  return (
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
          <span className="text-ml font-medium mt-1">{endTime ?? "--:--"}</span>
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
  );
}

import { format } from "date-fns";
import { BookCheckIcon, EditIcon, TrashIcon } from "lucide-react";

export default function BookingCard({
  location,
  date,
  startTime,
  endTime,
  name,
  description,
  room,
}) {
  return (
    <div className="w-full flex flex-col space-y-5">
      <div className="w-full h-max flex flex-col rounded-3xl p-4 bg-black/30 backdrop-blur-2xl">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center">
            <BookCheckIcon className="text-white" />
            <span className="text-white font-bold ml-3 text-lg"># 32</span>
          </div>
          <div className="flex items-center relative h-auto w-auto min-h-0 space-x-4 bg-black/10 p-2 px-4 rounded-3xl">
            <button className="text-white cursor-pointer">
              <EditIcon size={24} />
            </button>
            <span className="before:content-[''] before:w-[2px] before:flex before:h-7 before:top-auto before:bottom-auto before:m-auto before:bg-black/40"></span>
            <button className="text-red-400 cursor-pointer">
              <TrashIcon size={24} />
            </button>
          </div>
        </div>
        <div className="flex flex-col mt-4 space-y-4 text-white">
          <div className="flex flex-col leading-12">
            <p className="text-muted/80 text-sm">Location</p>
            <h1 className="text-2xl font-bold mt-1">{location}</h1>
          </div>
          <div className="flex flex-col space-y-4 text-white">
            <div className="flex flex-col leading-7">
              <p className="text-muted/80 text-sm">Name</p>
              <span className="text-ml font-medium mt-1">{name}</span>
            </div>
            <div className="flex flex-col leading-7">
              <p className="text-muted/80 text-sm">Description</p>
              <span className="text-ml font-medium mt-1">{description}</span>
            </div>
          </div>
          <div className="flex flex-col space-y-4 text-white">
            <div className="flex flex-col leading-7">
              <p className="text-muted/80 text-sm">Date</p>
              <span className="text-ml font-medium mt-1">
                {format(date, "PPP")}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-7">
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
              <p className="text-muted/80 text-sm">Room</p>
              <span className="text-ml font-medium mt-1">{room}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

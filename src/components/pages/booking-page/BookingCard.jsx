import { ChevronRight, InfoIcon } from "lucide-react";
import Badge from "../../ui/Badge";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { Button } from "../../ui/Button";
import { useBookingDetail } from "../../../contexts/useBookingDetail";

export default function BookingCard({
  data,
  bId,
  startTime,
  endTime,
  date,
  onCancel,
}) {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col space-y-5">
      <div className="w-full h-max flex flex-col rounded-3xl p-4 bg-black/30 backdrop-blur-2xl">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center">
            <InfoIcon className="text-white" />
            <span className="text-white font-bold ml-3 text-lg">Result</span>
          </div>

          <Badge
            color={
              !data.rooms.every((room) => !room.status) ? "emerald" : "red"
            }
          >
            {!data.rooms.every((room) => !room.status)
              ? "Available"
              : "Not Available"}
          </Badge>
        </div>
        <div className="flex flex-col mt-4 space-y-4 text-white">
          <div className="flex flex-col leading-12">
            <p className="text-muted/80 text-sm">Location</p>
            <h1 className="text-2xl font-bold mt-1">{data.name}</h1>
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
              <p className="text-muted/80 text-sm">Avaliable Room</p>
              <span className="text-ml font-medium mt-1">
                {data.rooms.filter((room) => room.status).length}
              </span>
            </div>
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
        <div className="flex flex-col mt-5 space-y-4 text-white">
          <div className="flex flex-col leading-7">
            <p className="text-muted/80 text-sm">Room</p>
            <div className="flex flex-wrap gap-5 mt-4">
              {data.rooms.map((room) => (
                <div
                  key={room.id}
                  className="text-lg flex items-center font-semibold"
                >
                  <div className="w-24">
                    <Badge
                      color={room.status ? "emerald" : "red"}
                      className="mr-4"
                    >
                      {room.status ? "Available" : "Booked"}
                    </Badge>
                  </div>
                  {room.code}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-5 space-y-4 text-white">
          <Button
            onClick={() => {
              !data.rooms.every((room) => !room.status) &&
                navigate({
                  to: `/booking/detail`,
                  replace: true,
                });
            }}
            disabled={data.rooms.every((room) => !room.status)}
            type="submit"
            variant="subtle"
            className="w-full h-13 rounded-xl  bg-amber-300/90 font-semibold text-black cursor-pointer uppercase"
          >
            Continue
            <ChevronRight size={18} />
          </Button>
        </div>
        <div className="mx-auto mt-2">
          <Button
            onClick={onCancel}
            variant="link"
            className="text-white cursor-pointer underline"
          >
            Back to search page
          </Button>
        </div>
      </div>
    </div>
  );
}

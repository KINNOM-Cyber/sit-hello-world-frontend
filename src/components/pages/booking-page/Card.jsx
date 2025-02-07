import { BookIcon } from "lucide-react";
import Badge from "../../ui/Badge";

export default function Card({
  img,
  location,
  description,
  statusText,
  rooms,
  onClick,
  status = false,
}) {
  return (
    <div
      onClick={onClick}
      className="w-full h-max flex cursor-pointer flex-col rounded-3xl p-4 bg-black/30 backdrop-blur-2xl"
    >
      <div className="flex items-center w-full justify-between">
        <BookIcon className="text-white" />
        <Badge color={status ? "emerald" : "red"}>
          {status ? "Available" : "Not Available"}
        </Badge>
        {/* <div className="text-xs bg-emerald-400/20 py-1 px-3 text-emerald-400 rounded-full">
          
        </div> */}
      </div>
      <div className="flex flex-col mt-7 text-white">
        <div className="flex flex-col leading-12">
          <p className="text-muted/80 text-sm">Location</p>
          <h1 className="text-2xl font-bold mt-1">{location}</h1>
        </div>
      </div>
      <div className="flex flex-col mt-5 space-y-4 text-white">
        <div className="flex flex-col leading-7">
          <p className="text-muted/80 text-sm">Room</p>
          <div className="flex flex-col space-y-3 mt-1">
            {rooms.map((room) => (
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
    </div>
  );
}

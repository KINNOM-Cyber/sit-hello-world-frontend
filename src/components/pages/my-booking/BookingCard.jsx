import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import {
  BookCheckIcon,
  EditIcon,
  SaveIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";

export default function BookingCard({
  location,
  date,
  startTime,
  endTime,
  name,
  description,
  room,
  bookingId,
}) {
  const [data, setData] = useState({ name, description });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const deleteBooking = useMutation({
    mutationFn: async (bookingId) => {
      const endpoint =
        "http://helloworld11.sit.kmutt.ac.th:3000/booking/" + bookingId;
      const signal = AbortSignal.timeout(2000);
      const request = await fetch(endpoint, {
        method: "DELETE",
        signal,
      });
      const response = await request.json();
      if (request.status != 200) {
        alert(response.message);
        return;
      }
      localStorage.removeItem(bookingId);
      alert(response.message);
      navigate({ reloadDocument: true, to: "/booking/user", replace: true });
    },
  });

  const editBooking = useMutation({
    mutationFn: async ({
      bookingId,
      name: Iname,
      description: Idescription,
    }) => {
      const endpoint =
        "http://helloworld11.sit.kmutt.ac.th:3000/booking/edit/" + bookingId;
      const signal = AbortSignal.timeout(2000);
      const request = await fetch(endpoint, {
        method: "PUT",
        signal,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: Iname, description: Idescription }),
      });
      const response = await request.json();
      if (request.status != 200) {
        setData({ name, description });
        alert(response.message);
        return;
      }
      const prev = JSON.parse(localStorage.getItem(bookingId));
      localStorage.setItem(
        bookingId,
        JSON.stringify({
          ...prev,
          name: Iname,
          description: Idescription,
        })
      );
      alert(response.message);
    },
  });
  document.getElementById("");
  return (
    <div className="w-full flex flex-col space-y-5">
      <div className="w-full h-max flex flex-col rounded-3xl p-4 bg-black/30 backdrop-blur-2xl">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center">
            <BookCheckIcon className="text-white" />
            <span className="text-white font-bold ml-3 text-lg">
              # {bookingId}
            </span>
          </div>
          <div className="flex items-center relative h-auto w-auto min-h-0 space-x-4 bg-black/10 p-2 px-4 rounded-3xl">
            <button
              onClick={() => {
                if (isEditing) {
                  if (data.name != name || data.description != description) {
                    editBooking.mutate({ bookingId, ...data });
                  }
                }
                setIsEditing((prev) => !prev);
              }}
              className="text-white cursor-pointer"
            >
              {isEditing ? <SaveIcon size={24} /> : <EditIcon size={24} />}
            </button>
            <span className="before:content-[''] before:w-[2px] before:flex before:h-7 before:top-auto before:bottom-auto before:m-auto before:bg-black/40"></span>

            <button
              className="text-red-400 cursor-pointer"
              onClick={() => {
                if (isEditing) {
                  setIsEditing(false);
                  return;
                }
                deleteBooking.mutate(bookingId);
              }}
            >
              {isEditing ? <XIcon size={24} /> : <TrashIcon size={24} />}
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
              {isEditing ? (
                <input
                  className="py-2 border-b focus:outline-0 border-muted/20"
                  value={data.name}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              ) : (
                <span
                  className="text-ml font-medium mt-1"
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      name: e.target.textContent,
                    }));
                  }}
                  contentEditable={isEditing}
                >
                  {data.name}
                </span>
              )}
            </div>
            <div className="flex flex-col leading-7">
              <p className="text-muted/80 text-sm">Description</p>
              {isEditing ? (
                <input
                  className="py-2 border-b focus:outline-0 border-muted/20"
                  value={data.description}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              ) : (
                <span className="text-ml font-medium mt-1">
                  {data.description}
                </span>
              )}
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

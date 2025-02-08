import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Label } from "../../ui/Label";
import { ChevronRight } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/Select";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import * as constant from "../../../libs/constants";

export default function BookingForm({
  date,
  startTime,
  endTime,
  rooms,
  buildingId,
}) {
  const [room, setRoom] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { mutate, isPending, isSuccess } = useMutation({
    onSuccess: (data) => {
      if (data?.response) {
        setError(null);
        localStorage.setItem(
          data.response.data.BookingId,
          JSON.stringify(data.response.data)
        );
      }
    },
    onError: setError,
    mutationFn: async (payload) => {
      console.log({ payload });
      const endpointUrl = new URL(
        "http://helloworld11.sit.kmutt.ac.th:3000/booking/create"
      );
      const signal = AbortSignal.timeout(2000);
      const request = await fetch(decodeURIComponent(endpointUrl.toString()), {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ ...payload }),
        signal,
      });
      const response = await request.json();

      if (request.status != 200) {
        setError(response);
      } else {
        setError(null);
      }

      return response;
    },
  });

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const onSubmit = (el) => {
    el.preventDefault();

    const formData = new FormData(el.target);
    const username = formData.get("username");
    const name = formData.get("name");
    const description = formData.get("description");
    const roomId = formData.get("room");

    if (!username || !name || !description || !roomId) {
      alert("You might be complete the form first");
      return;
    }

    mutate({
      username,
      name,
      description,
      roomId: constant.rooms.find((x) => x.code == roomId).id,
      startTime,
      endTime,
      buildingId,
      date,
    });
    // console.log({ name, description, room, username });
  };

  if (error) {
    return <p className="text-white">{error.message ?? "Unknow Error"}</p>;
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center my-5 text-white space-y-2">
        <p className="mb-6 text-2xl font-bold">Booked Successfuly.</p>
        <Button
          onClick={() => navigate({ to: "/booking/user", replace: true })}
          className="w-full h-13 rounded-xl hover:bg-amber-300/90  bg-amber-300/90 font-semibold text-black cursor-pointer uppercase"
        >
          Go to my booking
        </Button>
        <Button className="text-white cursor-pointer underline" variant="link">
          Search a new booking
        </Button>
      </div>
    );
  }

  return (
    <form className="h-full min-h-0 flex flex-col" onSubmit={onSubmit}>
      <div className="text-white leading-12">
        <Label className="text-muted/80 font-normal">Username</Label>
        <Input name="username" placeholder="Enter username" />
      </div>
      <div className="text-white leading-12">
        <Label className="text-muted/80 font-normal">Name</Label>
        <Input name="name" placeholder="Enter name" />
      </div>
      <div className="text-white leading-12">
        <Label className="text-muted/80 font-normal">Description</Label>
        <Input name="description" placeholder="Enter description" />
      </div>
      <div className="text-white leading-12 w-full mb-5">
        <Label className="text-muted/80 font-normal">Available Room</Label>
        <Select value={room} onValueChange={setRoom} name="room">
          <SelectTrigger className="h-13 bg-black/30 border-0 text-white">
            <SelectValue className="" placeholder="Select available room" />
          </SelectTrigger>
          <SelectContent
            align="end"
            className="bg-black/30 backdrop-blur-2xl border-0 text-white"
          >
            <SelectGroup>
              {rooms
                .filter((r) => r.status)
                .map((room) => (
                  <SelectItem
                    key={room.id}
                    className="p-2 outline-0"
                    value={room.code}
                  >
                    {room.code}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-0 mt-auto w-full">
        <Button
          type="submit"
          variant="subtle"
          disabled={isPending}
          className="w-full h-13 rounded-xl hover:bg-amber-300/90  bg-amber-300/90 font-semibold text-black cursor-pointer uppercase"
        >
          Booking
          <ChevronRight size={18} />
        </Button>
      </div>
      <div className="mx-auto mt-2">
        <Button
          type="button"
          onClick={() => {
            navigate({ to: "/booking", replace: true });
          }}
          variant="link"
          className="text-white cursor-pointer underline"
        >
          Cancel Booking
        </Button>
      </div>
    </form>
  );
}

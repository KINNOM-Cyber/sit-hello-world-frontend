import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useNavigate } from "@tanstack/react-router";

const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  description: z.string().min(1, "This field is required"),
  room: z.string().min(1, "This field is required"),
});

export default function BookingForm({ date, startTime, endTime, rooms }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "sad",
      room: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (value) => {
    console.log(value);
  };

  return (
    <form
      className="h-full min-h-0 flex flex-col"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="text-white leading-12">
        <Label className="text-muted/80 font-normal">Name</Label>
        <Input placeholder="Enter name" {...form.register("name")} />
      </div>
      <div className="text-white leading-12">
        <Label className="text-muted/80 font-normal">Description</Label>
        <Input
          placeholder="Enter description"
          {...form.register("description")}
        />
      </div>
      {/* <div className="flex space-x-4 justify-end items-end">
        <div className="text-white leading-12">
          <Label className="text-muted/80 font-normal">Start Time</Label>
          <Input
            // type="time"
            className=""
            placeholder=""
            {...form.register("start-time")}
          />
        </div>
        <div className="text-white leading-12">
          <Label className="text-muted/80 font-normal">End Time</Label>
          <Input
            // type="time"
            className=""
            placeholder=""
            {...form.register("end-time")}
          />
        </div>
      </div> */}
      {/* <div className="text-white leading-12 w-full">
        <Label className="text-muted/80 font-normal">Repeat Type</Label>
        <Select

        //   value={filter}
        //   onValueChange={(value) => {
        //     setFilter(value);
        //   }}
        >
          <SelectTrigger className="h-13 bg-black/30 border-0 text-white">
            <SelectValue className="" placeholder="Select Repeat Type" />
          </SelectTrigger>
          <SelectContent
            align="end"
            className="bg-black/30 backdrop-blur-2xl border-0 text-white"
          >
            <SelectGroup>
              <SelectItem className="p-2 outline-0" value="weekly">
                Daily
              </SelectItem>
              <SelectItem className="p-2 outline-0" value="weekly">
                Weekly
              </SelectItem>
              <SelectItem className="p-2 outline-0" value="weekly">
                Monthly
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}
      <div className="text-white leading-12 w-full mb-5">
        <Label className="text-muted/80 font-normal">Available Room</Label>
        <Select
          // {...form.register("room")}
          //   value={filter}
          //   onValueChange={(value) => {
          //     setFilter(value);
          //   }}
        >
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
                    value={room.id}
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
          className="w-full h-13 rounded-xl  bg-amber-300/90 font-semibold text-black cursor-pointer uppercase"
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

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/Select";
import { Button } from "../../ui/Button";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { normalizeTime } from "../../../libs/utils";
import { Calendar } from "../../ui/Calendar";
import { Input } from "../../ui/Input";
// import { Label } from "../ui/Label";
import { buildings } from "../../../libs/constants";
import BookIcon from "../../../icons/Book";

export default function SearchBooking({ onChange = () => {} }) {
  const [buildingId, setBuildingId] = useState();
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  
  const formatTime = (value) => {
    // Remove any non-digit characters
    value = value.replace(/\D/g, "");

    // Only proceed if the length is valid
    if (value.length <= 8) {
      if (value.length <= 4) {
        // Formatting for the first time block (HHMM)
        value =
          value.slice(0, 2) + (value.length > 2 ? ":" + value.slice(2, 4) : "");
      } else {
        // Formatting for both time blocks (HHMM-HHMM)
        value =
          value.slice(0, 2) +
          ":" +
          value.slice(2, 4) +
          "-" +
          value.slice(4, 6) +
          (value.length > 6 ? ":" + value.slice(6, 8) : "");
      }
    }

    return value;
  };

  

  // Normalize hours and minutes to prevent invalid values

  // Handle input changes and real-time validation
  const handleOnStartTimeChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");

    if (value.length >= 4) {
      const firstHour = value.slice(0, 2);
      const firstMinute = value.slice(2, 4);

      let secondHour = value.slice(4, 6);
      let secondMinute = value.slice(6, 8);

      // If the second time block isn't complete, don't process it
      if (value.length < 8) {
        secondHour = "";
        secondMinute = "";
      }

      // Normalize both time blocks (ensure valid hours and minutes)
      const [normalizedFirstHour, normalizedFirstMinute] = normalizeTime(
        firstHour,
        firstMinute
      );
      // Rebuild the value with normalized time
      const normalizedValue = `${normalizedFirstHour}:${normalizedFirstMinute}${
        secondHour
      }`;

      setStartTime(normalizedValue);
    } else {
      setStartTime(formatTime(value));
    }
  };

  const handleOnEndTimeChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");

    if (value.length >= 4) {
      const firstHour = value.slice(0, 2);
      const firstMinute = value.slice(2, 4);

      let secondHour = value.slice(4, 6);
      let secondMinute = value.slice(6, 8);

      // If the second time block isn't complete, don't process it
      if (value.length < 8) {
        secondHour = "";
        secondMinute = "";
      }

      // Normalize both time blocks (ensure valid hours and minutes)
      const [normalizedFirstHour, normalizedFirstMinute] = normalizeTime(
        firstHour,
        firstMinute
      );

      // Rebuild the value with normalized time
      const normalizedValue = `${normalizedFirstHour}:${normalizedFirstMinute}${
        secondHour
      }`;

      setEndTime(normalizedValue);
    } else {
      setEndTime(formatTime(value));
    }
  };

  const handleSubmit = () => {
    console.log(date)
    onChange({
      buildingId,
      date,
      startTime,
      endTime,
    });
  };

  return (
    <div className="flex w-full justify-between items-center rounded-3xl p-4 bg-black/30 backdrop-blur-2xl">
      {/* <p className="text-white">Available {available} rooms</p> */}
      <div className="flex flex-col space-y-3 w-full">
        <div className="flex justify-center mt-4 mb-3 items-center">
          <BookIcon className="text-muted/70 size-10" />
          <span className="text-white font-bold ml-3 text-lg">SIT BOOKING</span>
        </div>

        <div className="w-full flex justify-center">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
        <div className="flex items-center justify-center space-x-4 w-full">
          <Input
            //   className="w-24"
            type="text"
            value={startTime}
            onChange={handleOnStartTimeChange}
            maxLength="5"
            placeholder="HH:MM"
          />
          <Input
            //   className="w-24"
            maxLength="5"
            type="text"
            value={endTime}
            onChange={handleOnEndTimeChange}
            placeholder="HH:MM"
          />
        </div>
        <div className="w-full">
            <Select value={buildingId} onValueChange={setBuildingId}>
              <SelectTrigger className=" border-black/50 bg-black/30 text-white h-12">
                <SelectValue className="" placeholder="Select building" />
              </SelectTrigger>
              <SelectContent
                align="end"
                className="bg-black/30 backdrop-blur-2xl border-black/50 text-white"
              >
                <SelectGroup>
                  {buildings.map((building) => (
                    <SelectItem value={building.id} key={building.id}>
                      {building.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        <Button
          disabled={!(buildingId && startTime && endTime)}
          onClick={handleSubmit}
          className="cursor-pointer rounded-xl uppercase bg-amber-300 h-11 hover:bg-amber-300 text-black"
        >
          Search
        </Button>
      </div>
    </div>
  );
}

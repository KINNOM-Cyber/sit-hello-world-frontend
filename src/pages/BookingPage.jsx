import { useEffect, useMemo, useState } from "react";
import MobileLayout from "../components/layout/MobileLayout";
import ToolBar from "../components/pages/booking-page/SearchBooking";
import Card from "../components/pages/booking-page/Card";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { BookCheckIcon, BookIcon, ChevronRight, InfoIcon } from "lucide-react";
import { timeStrToDate } from "../libs/utils";
import { Button } from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import SearchBooking from "../components/pages/booking-page/SearchBooking";
import { format } from "date-fns";

export default function BookingPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [buildingInfo, setBuildingInfo] = useState({});
  const buildings = useMemo(() => {
    return [
      {
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
            status: false,
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
      },
      {
        id: 2,
        name: "LX Building (11th Floor)",
        rooms: [
          {
            id: 6,
            code: "LX11/1",
            status: true,
          },
          {
            id: 7,
            code: "LX11/2",
            status: true,
          },
          {
            id: 8,
            code: "LX11/3",
            status: false,
          },
          {
            id: 9,
            code: "LX10/4",
            status: false,
          },
        ],
      },
      {
        id: 3,
        name: "LX Building (12th Floor)",
        rooms: [
          {
            id: 10,
            code: "LX12/1",
            status: true,
          },
          {
            id: 11,
            code: "LX12/2",
            status: true,
          },
        ],
      },
      {
        id: 4,
        name: "SIT Building (1st Floor)",
        rooms: [
          {
            id: 12,
            code: "Train 1/3",
            status: true,
          },
          {
            id: 13,
            code: "Train 1/5",
            status: true,
          },
        ],
      },
      {
        id: 5,
        name: "SIT Building (3rd Floor)",
        rooms: [
          {
            id: 14,
            code: "Train 3/1",
            status: true,
          },
          {
            id: 15,
            code: "Meeting 3/2",
            status: true,
          },
          {
            id: 16,
            code: "Meeting 3/3",
            status: true,
          },
          {
            id: 17,
            code: "Meeting 3/4",
            status: true,
          },
        ],
      },
      {
        id: 6,
        name: "SIT Building (4th Floor)",
        rooms: [
          {
            id: 18,
            code: "Meeting 4/2",
            status: true,
          },
          {
            id: 19,
            code: "Meeting 4/3",
            status: true,
          },
        ],
      },
      {
        id: 7,
        name: "CB",
        rooms: [
          {
            id: 20,
            code: "CB301",
            status: true,
          },
          {
            id: 21,
            code: "CB304",
            status: true,
          },
          {
            id: 22,
            code: "CB305",
            status: true,
          },
          {
            id: 23,
            code: "CB306",
            status: true,
          },
          {
            id: 24,
            code: "CB308",
            status: true,
          },
          {
            id: 25,
            code: "CB312",
            status: true,
          },
          {
            id: 26,
            code: "CB313",
            status: true,
          },
        ],
      },
    ];
  }, []);

  // const getBuildingStatus = useMemo((rooms = []) => {
  //   return
  // }, []);

  const { bId, startTime, endTime, date } = useSearch({ strict: false });

  useEffect(() => {
    if (bId) {
      setBuildingInfo(buildings.find((x) => x.id == bId) ?? {});
    }
    if ((startTime, endTime, date, bId)) {
      setData({
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
            status: true,
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
      });
    }
  }, [bId, startTime, endTime, date]);

  const greetingMessage = useMemo(() => {
    const time = new Date().getHours();
    let message = "Good Morning";

    if (time >= 12 && time < 18) {
      message = "Good Afternoon";
    } else if (time >= 18 || time < 6) {
      message = "Good Evening";
    }

    return message;
  }, []);

  const onChange = (value) => {
    console.log(value);
    return navigate({
      search: {
        bId: value.buildingId,
        date: value.date,
        startTime: value.startTime,
        endTime: value.endTime,
      },
      replace: true,
    });
  };

  return (
    <MobileLayout>
      <div className="h-auto min-h-0 w-full p-5">
        <div className="flex items-center justify-between">
          <div className="text-white my-10 leading-6">
            <h1 className="font-bold text-4xl">Hello, 👋🏻</h1>
            <p className="font-bold mt-4 w-[90%]">{greetingMessage}, Welcome to sit booking system</p>
          </div>
          <button onClick={() => navigate({to: "/booking/user"})} className="text-muted/70 bg-black/10 rounded-full p-4 backdrop-blur-2xl size-16 flex cursor-pointer">
            <BookCheckIcon className="m-auto" size={32} strokeWidth={2}/>
          </button>
        </div>
        <div className="flex flex-col space-y-4 w-full ">
          {Object.entries(data).length > 0 ? (
            <div className="w-full flex flex-col space-y-5">
              <div className="w-full h-max flex flex-col rounded-3xl p-4 bg-black/30 backdrop-blur-2xl">
                <div className="flex items-center w-full justify-between">
                  <div className="flex items-center">
                    <InfoIcon className="text-white" />
                    <span className="text-white font-bold ml-3 text-lg">
                      Result
                    </span>
                  </div>

                  <Badge
                    color={
                      !data.rooms.every((room) => !room.status)
                        ? "emerald"
                        : "red"
                    }
                  >
                    {!data.rooms.every((room) => !room.status)
                      ? "Available"
                      : "Not Available"}
                  </Badge>
                </div>
                <div className="flex flex-col mt-4 space-y-4 text-white">
                  {Object.entries(buildingInfo).length > 0 && (
                    <div className="flex flex-col leading-12">
                      <p className="text-muted/80 text-sm">Location</p>
                      <h1 className="text-2xl font-bold mt-1">
                        {buildingInfo.name}
                      </h1>
                    </div>
                  )}
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
                          // from: "/booking",
                          // params: { bid: bId },
                          search: {
                            bId,
                            date,
                            startTime,
                            endTime,
                          },
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
                    onClick={() => {
                      setData({});
                      window.history.replaceState(
                        null,
                        "",
                        window.location.pathname
                      );
                    }}
                    variant="link"
                    className="text-white cursor-pointer underline"
                  >
                    Back to search page
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <SearchBooking onChange={onChange} available={10} />
          )}
        </div>
      </div>
    </MobileLayout>
  );
}

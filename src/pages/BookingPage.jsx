import { useEffect, useMemo, useState } from "react";
import MobileLayout from "../components/layout/MobileLayout";
import { useNavigate } from "@tanstack/react-router";
import { BookCheckIcon } from "lucide-react";
import SearchBooking from "../components/pages/booking-page/SearchBooking";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import BookingCard from "../components/pages/booking-page/BookingCard";
import { useBookingDetail } from "../contexts/useBookingDetail";

export default function BookingPage() {
  const navigate = useNavigate();
  const { setData: setBookingData, reset } = useBookingDetail();
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  const handleOnSuccess = (data) => {
    console.log(data);
    if (!error) {
      setData(data);
      setBookingData(data);
    }
  };

  const { isPending, mutate, isError, isSuccess } = useMutation({
    onSuccess: handleOnSuccess,
    onError: setError,
    mutationFn: async ({ bId, date, startTime, endTime }) => {
      const endpointUrl = new URL("http://helloworld11.sit.kmutt.ac.th:3000/booking/find");
      const searchParams = endpointUrl.searchParams;

      searchParams.append("buildingId", bId);
      searchParams.append("date", date);
      searchParams.append("startTime", startTime);
      searchParams.append("endTime", endTime);

      console.log(decodeURIComponent(endpointUrl.toString()));

      // const controller = new AbortController();
      const signal = AbortSignal.timeout(2000);
      const request = await fetch(decodeURIComponent(endpointUrl.toString()), {
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

  useEffect(() => {
    if (isError) {
      console.error(error);
    }

    console.log(data);
  }, [error, data]);

  const onChange = (value) => {
    console.log(value);
    mutate({
      bId: value.buildingId,
      date: format(value.date, "yyy-MM-dd"),
      startTime: value.startTime,
      endTime: value.endTime,
    });
  };

  return (
    <MobileLayout>
      <div className="h-auto min-h-0 w-full p-5">
        <div className="flex items-center justify-between">
          <div className="text-white my-10 leading-6">
            <h1 className="font-bold text-4xl">Hello, 👋🏻</h1>
            <p className="font-bold mt-4 w-[90%]">
              {greetingMessage}, Welcome to sit booking system
            </p>
          </div>
          <button
            onClick={() => navigate({ to: "/booking/user" })}
            className="text-muted/70 bg-black/10 rounded-full p-4 backdrop-blur-2xl size-16 flex cursor-pointer"
          >
            <BookCheckIcon className="m-auto" size={32} strokeWidth={2} />
          </button>
        </div>
        <div className="flex flex-col space-y-4 w-full ">
          {!data && !isError && !isPending && (
            <SearchBooking onChange={onChange} available={10} />
          )}
          {isPending ? (
            <div>
              <p className="text-white">Loading ...</p>
            </div>
          ) : (
            error && (
              <div>
                <p className="text-white">{error.message}</p>
              </div>
            )
          )}
          {!error&& data && (
            <BookingCard
              data={data.response}
              bId={data.payload.buildingId}
              startTime={data.payload.startTime}
              endTime={data.payload.endTime}
              date={new Date(data.payload.date)}
              onCancel={() => {
                setData();
                reset();
              }}
            />
          )}
        </div>
      </div>
    </MobileLayout>
  );
}

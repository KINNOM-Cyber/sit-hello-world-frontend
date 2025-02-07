import { createContext, useContext, useState } from "react";

const Context = createContext();

export const useBookingDetail = () => {
  const context = useContext(Context);
  return context;
};

export const BookingDetailProvider = ({ children }) => {
  const [data, setData] = useState();
  const reset = () => {
    setData();
  };
  return (
    <Context.Provider value={{ data, setData, reset }}>
      {children}
    </Context.Provider>
  );
};

export default function MobileLayout({ children }) {
  return (
    <div className="w-[464px] overflow-scroll bg-[url('/assets/bg.png')] bg-right bg-cover fixed inset-0 h-screen min-h-0 m-auto border max-[464px]:w-screen">
      <div className="w-full flex bg-[#0058AE] fixed inset-0 opacity-52 h-full -z-10"></div>
      {children}
    </div>
  );
}

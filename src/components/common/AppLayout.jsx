import Navbar from "./Navbar";

function AppLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#F7F7F3] text-[#20242B] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}

export default AppLayout;

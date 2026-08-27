import Navbar from "./Navbar";

function AppLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#F5F5F0] text-[#111827] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}

export default AppLayout;

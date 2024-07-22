import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex ">
      <div className="w-[15%]">
        <Sidebar />
      </div>

      <div className="w-[85%] flex flex-col ">
        <Navbar />

        <main className="md:pl-[50px] lg:pl-0">{children}</main>
      </div>
    </div>
  );
}
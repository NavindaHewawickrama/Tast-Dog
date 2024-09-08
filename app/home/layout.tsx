import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "./footer/page";

export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex">
      <div className="w-[15%]">
        <Sidebar />
      </div>

      <div className="w-[85%] flex flex-col">
        <Navbar />

        <main className="flex-grow md:pl-[50px] lg:pl-0">{children}</main>

        <Footer />
      </div>
    </div>
  );
}
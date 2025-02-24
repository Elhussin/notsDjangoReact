import Navbar from "./Navbar";
import Footer from "./Footer";
import Header from "./Header";
import clsx from "clsx"; 
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <Header />
      <main className={clsx("flex-grow text-black bg-gray-100 dark:bg-gray-900 dark:text-gray-100")}>{children}</main>
      <Footer/>
    </div>
  );
};


export default Layout;

//   bg-gray-100 text-gray-900
// bg-white text-black
// bg-blue-500 text-white (للأزرار)
// border-gray-300


// dark:bg-gray-900 dark:text-gray-100
// dark:bg-black dark:text-white
// dark:bg-blue-700 dark:text-white (للأزرار)
// dark:border-gray-700
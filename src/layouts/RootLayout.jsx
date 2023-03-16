import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";
function RootLayout({ children }) {
  return (
    <>
      <Toaster />
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default RootLayout;

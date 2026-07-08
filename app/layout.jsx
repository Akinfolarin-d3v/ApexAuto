import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CompareDock from "@/components/layout/CompareDock";
import { AppProviders } from "@/context/store";

export const metadata = {
  title: "LoisnX — Find your next car.",
  description:
    "A modern car buying experience: browse, compare, finance, and buy — all in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CompareDock />
        </AppProviders>
      </body>
    </html>
  );
}

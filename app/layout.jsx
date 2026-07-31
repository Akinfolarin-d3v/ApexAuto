import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CompareDock from "@/components/layout/CompareDock";
import { AppProviders } from "@/context/store";

export const metadata = {
  metadataBase: new URL("https://loisnx.com"),
  title: {
    default: "LoisnX — Find your next car.",
    template: "%s — LoisnX",
  },
  description:
    "A modern car buying experience: browse, compare, finance, and buy — all in one place.",
  keywords: ["car dealership", "buy a car online", "used cars", "car financing", "trade-in value"],
  applicationName: "LoisnX",
  openGraph: {
    title: "LoisnX — Find your next car.",
    description:
      "A modern car buying experience: browse, compare, finance, and buy — all in one place.",
    siteName: "LoisnX",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LoisnX — Find your next car.",
    description:
      "A modern car buying experience: browse, compare, finance, and buy — all in one place.",
  },
};

export const viewport = {
  themeColor: "#FFFFFF",
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

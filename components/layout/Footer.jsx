import Link from "next/link";
import { Instagram, Youtube, Twitter } from "lucide-react";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All Inventory", href: "/inventory" },
      { label: "Electric", href: "/inventory?fuel=electric" },
      { label: "Luxury SUVs", href: "/inventory?body=suv" },
      { label: "Sport Sedans", href: "/inventory?body=sedan" },
    ],
  },
  {
    title: "Own",
    links: [
      { label: "Financing", href: "/financing" },
      { label: "Trade-In", href: "/trade-in" },
      { label: "Compare Cars", href: "/compare" },
      { label: "Saved Cars", href: "/wishlist" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About LoisnX", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Admin", href: "/admin/login" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-steel-200 bg-canvas pt-20">
      <div className="container-page grid gap-12 pb-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <span className="flex items-center font-display text-2xl tracking-tightest">
            LOISN
            <span className="ml-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-signal text-base text-ink">
              X
            </span>
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-steel-500">
            A car buying experience built for people who've outgrown the
            dealership lot.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Youtube, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="rounded-full border-2 border-steel-200 p-2 text-steel-500 transition-all duration-300 ease-bouncy hover:scale-110 hover:border-trust hover:text-trust"
              >
                <Icon size={16} strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-steel-400">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-ink/80 transition-colors hover:text-trust"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-steel-200">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-steel-400 md:flex-row">
          <span>© {new Date().getFullYear()} LoisnX. All rights reserved.</span>
          <span>Prices and availability updated daily.</span>
        </div>
      </div>
    </footer>
  );
}

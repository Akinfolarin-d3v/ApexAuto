"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Heart } from "lucide-react";
import { NAV_LINKS } from "@/constants/nav";
import { clsx } from "@/lib/utils";
import Button from "@/components/ui/Button";
import MobileMenu from "@/components/layout/MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-signature",
          scrolled
            ? "bg-canvas/90 backdrop-blur-md border-b-2 border-steel-200"
            : "bg-canvas/60 backdrop-blur-sm border-b-2 border-transparent"
        )}
      >
        <nav className="container-page flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center font-display text-xl tracking-tightest">
            LOISN
            <span className="ml-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-signal text-sm text-ink">
              X
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-bold text-ink/70 transition-colors hover:text-trust"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/wishlist"
              aria-label="Saved cars"
              className="rounded-full p-2 text-ink/70 transition-all duration-300 ease-bouncy hover:scale-110 hover:bg-velocity-tint hover:text-velocity"
            >
              <Heart size={18} strokeWidth={1.75} />
            </Link>
            <Button as={Link} href="/inventory" size="sm">
              Browse Inventory
            </Button>
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="rounded-full p-2 text-ink md:hidden"
          >
            <Menu size={22} strokeWidth={1.75} />
          </button>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

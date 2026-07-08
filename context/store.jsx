"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

const WishlistContext = createContext(null);
const CompareContext = createContext(null);

const WISHLIST_KEY = "loisnx.wishlist";
const COMPARE_KEY = "loisnx.compare";
const COMPARE_LIMIT = 3;

function usePersistedIds(key) {
  const [ids, setIds] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(key) || "[]");
      if (Array.isArray(stored)) setIds(stored);
    } catch {
      // corrupt/absent storage — start empty
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(key, JSON.stringify(ids));
  }, [ids, hydrated, key]);

  return [ids, setIds, hydrated];
}

export function AppProviders({ children }) {
  const [wishlistIds, setWishlistIds, wishlistHydrated] = usePersistedIds(WISHLIST_KEY);
  const [compareIds, setCompareIds, compareHydrated] = usePersistedIds(COMPARE_KEY);

  const toggleWishlist = useCallback(
    (id) => {
      setWishlistIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    },
    [setWishlistIds]
  );

  const toggleCompare = useCallback(
    (id) => {
      setCompareIds((prev) => {
        if (prev.includes(id)) return prev.filter((x) => x !== id);
        if (prev.length >= COMPARE_LIMIT) return prev;
        return [...prev, id];
      });
    },
    [setCompareIds]
  );

  const clearCompare = useCallback(() => setCompareIds([]), [setCompareIds]);

  const wishlistValue = useMemo(
    () => ({ ids: wishlistIds, hydrated: wishlistHydrated, toggle: toggleWishlist, has: (id) => wishlistIds.includes(id) }),
    [wishlistIds, wishlistHydrated, toggleWishlist]
  );

  const compareValue = useMemo(
    () => ({
      ids: compareIds,
      hydrated: compareHydrated,
      limit: COMPARE_LIMIT,
      toggle: toggleCompare,
      clear: clearCompare,
      has: (id) => compareIds.includes(id),
      isFull: compareIds.length >= COMPARE_LIMIT,
    }),
    [compareIds, compareHydrated, toggleCompare, clearCompare]
  );

  return (
    <WishlistContext.Provider value={wishlistValue}>
      <CompareContext.Provider value={compareValue}>{children}</CompareContext.Provider>
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within AppProviders");
  return ctx;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within AppProviders");
  return ctx;
}

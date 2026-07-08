"use client";

import { useEffect, useState } from "react";
import { getAllCars } from "@/lib/cars";

/**
 * Client-side catalog loader. Server components should call lib/cars.js
 * directly — this hook exists for client components (like the Compare
 * Dock and interactive filters) that need the catalog after mount.
 */
export function useCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getAllCars()
      .then((data) => {
        if (!cancelled) setCars(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { cars, loading, error };
}

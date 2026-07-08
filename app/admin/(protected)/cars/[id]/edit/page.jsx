"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCarById, updateCar } from "@/lib/cars";
import CarForm from "@/components/admin/CarForm";

export default function EditCarPage() {
  const { id } = useParams();
  const [car, setCar] = useState(undefined); // undefined = loading, null = not found

  useEffect(() => {
    getCarById(id).then(setCar);
  }, [id]);

  function handleSubmit(patch) {
    return updateCar(id, patch);
  }

  if (car === undefined) {
    return <p className="p-10 font-mono text-sm text-steel-500">Loading vehicle…</p>;
  }

  if (car === null) {
    return <p className="p-10 text-sm text-steel-500">Vehicle not found.</p>;
  }

  return <CarForm mode="edit" initialCar={car} onSubmit={handleSubmit} />;
}

"use client";

import { createCar } from "@/lib/cars";
import CarForm from "@/components/admin/CarForm";

export default function NewCarPage() {
  return <CarForm mode="create" onSubmit={createCar} />;
}

import CarCard from "@/components/ui/CarCard";

export default function RelatedCars({ cars }) {
  if (!cars.length) return null;

  return (
    <section className="border-t border-steel-200 py-20">
      <div className="container-page">
        <h2 className="font-display text-2xl tracking-tightest md:text-3xl">You might also like</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}

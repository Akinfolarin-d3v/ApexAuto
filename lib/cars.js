import { db, isFirebaseConfigured } from "@/lib/firebase";
import { MOCK_CARS } from "@/data/cars";
import { applyLocalOverrides, addLocalCar, updateLocalCar, deleteLocalCar } from "@/lib/adminCars";

/**
 * Every function here returns the same shape whether it's reading live
 * Firestore documents or the local mock dataset, so components never need
 * to know which one is behind them. Swap in real keys in .env.local and
 * the app starts reading from `cars` in Firestore with no UI changes.
 *
 * In mock mode (no Firestore keys), admin writes are kept in localStorage
 * via lib/adminCars.js. That's only readable in the browser, so it's
 * merged in here whenever these functions run client-side (e.g. from the
 * Admin dashboard, or any client component using hooks/useCars.js) but not
 * during server-side rendering of public pages — meaning admin changes are
 * fully live in the Admin section immediately, and will appear everywhere
 * else too as soon as real Firestore keys are added.
 */

async function getCollection() {
  if (!isFirebaseConfigured) return null;
  const { collection, getDocs } = await import("firebase/firestore");
  const snapshot = await getDocs(collection(db, "cars"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getAllCars() {
  const live = await getCollection();
  if (live) return live;
  if (typeof window !== "undefined") return applyLocalOverrides(MOCK_CARS);
  return MOCK_CARS;
}

export async function getFeaturedCars(limit = 6) {
  const cars = await getAllCars();
  return cars.filter((car) => car.featured).slice(0, limit);
}

export async function getCarById(id) {
  if (isFirebaseConfigured) {
    const { doc, getDoc } = await import("firebase/firestore");
    const snap = await getDoc(doc(db, "cars", id));
    if (snap.exists()) return { id: snap.id, ...snap.data() };
    return null;
  }
  const pool = typeof window !== "undefined" ? applyLocalOverrides(MOCK_CARS) : MOCK_CARS;
  return pool.find((car) => car.id === id) ?? null;
}

export async function createCar(carData) {
  if (isFirebaseConfigured) {
    const { collection, addDoc } = await import("firebase/firestore");
    const now = new Date().toISOString();
    const payload = { status: "available", featured: false, ...carData, createdAt: now, updatedAt: now };
    const ref = await addDoc(collection(db, "cars"), payload);
    return { id: ref.id, ...payload };
  }
  return addLocalCar(carData);
}

export async function updateCar(id, patch) {
  if (isFirebaseConfigured) {
    const { doc, updateDoc } = await import("firebase/firestore");
    const payload = { ...patch, updatedAt: new Date().toISOString() };
    await updateDoc(doc(db, "cars", id), payload);
    return { id, ...payload };
  }
  return updateLocalCar(id, patch);
}

export async function deleteCar(id) {
  if (isFirebaseConfigured) {
    const { doc, deleteDoc } = await import("firebase/firestore");
    await deleteDoc(doc(db, "cars", id));
    return;
  }
  return deleteLocalCar(id);
}

export async function getCarsByCategory(category, limit = 8) {
  const cars = await getAllCars();
  return cars.filter((car) => car.category === category).slice(0, limit);
}

export async function getRelatedCars(car, limit = 3) {
  const cars = await getAllCars();
  return cars
    .filter((c) => c.id !== car.id && (c.bodyType === car.bodyType || c.category === car.category))
    .slice(0, limit);
}

export const CATEGORIES = [
  { slug: "electric", label: "Electric" },
  { slug: "luxury-suv", label: "Luxury SUVs" },
  { slug: "sport-sedan", label: "Sport Sedans" },
  { slug: "best-value", label: "Best Value" },
];

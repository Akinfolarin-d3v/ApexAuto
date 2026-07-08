import { db, isFirebaseConfigured } from "@/lib/firebase";

const LOCAL_KEY = "loisnx.orders";

function readLocalOrders() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeLocalOrders(orders) {
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(orders));
}

function generateOrderId() {
  return `LX-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;
}

/**
 * Persists a completed checkout. Returns the order with its id attached.
 * With no Firebase keys set, orders live in localStorage — enough to
 * support a real confirmation page and a believable "order placed" flow
 * without any backend running.
 */
export async function createOrder(orderData) {
  const order = {
    ...orderData,
    id: generateOrderId(),
    createdAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured) {
    const { collection, doc, setDoc } = await import("firebase/firestore");
    await setDoc(doc(collection(db, "orders"), order.id), order);
    return order;
  }

  const existing = readLocalOrders();
  writeLocalOrders([order, ...existing]);
  return order;
}

export async function getOrder(orderId) {
  if (isFirebaseConfigured) {
    const { doc, getDoc } = await import("firebase/firestore");
    const snap = await getDoc(doc(db, "orders", orderId));
    if (snap.exists()) return { id: snap.id, ...snap.data() };
    return null;
  }

  return readLocalOrders().find((o) => o.id === orderId) ?? null;
}

export async function getAllOrders() {
  if (isFirebaseConfigured) {
    const { collection, getDocs, orderBy, query } = await import("firebase/firestore");
    const snapshot = await getDocs(query(collection(db, "orders"), orderBy("createdAt", "desc")));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  return readLocalOrders();
}

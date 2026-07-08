import { db, isFirebaseConfigured } from "@/lib/firebase";

const LOCAL_KEY = "loisnx.contactSubmissions";

export async function submitContactForm(data) {
  const submission = { ...data, createdAt: new Date().toISOString() };

  if (isFirebaseConfigured) {
    const { collection, addDoc } = await import("firebase/firestore");
    await addDoc(collection(db, "contactSubmissions"), submission);
    return submission;
  }

  if (typeof window !== "undefined") {
    try {
      const existing = JSON.parse(window.localStorage.getItem(LOCAL_KEY) || "[]");
      window.localStorage.setItem(LOCAL_KEY, JSON.stringify([submission, ...existing]));
    } catch {
      // non-fatal — the submission still "succeeds" from the user's view
    }
  }
  return submission;
}

import { app, isFirebaseConfigured } from "@/lib/firebase";

const SESSION_KEY = "loisnx.admin.session";

/**
 * Same graceful-fallback pattern as the rest of /lib: with real Firebase
 * keys, admin login is real email/password auth. Without keys, a session
 * is stored in localStorage so the whole admin flow — login, guarded
 * routes, logout — works end to end before any backend exists.
 */

export async function signInAdmin({ email, password }) {
  if (isFirebaseConfigured) {
    const { getAuth, signInWithEmailAndPassword } = await import("firebase/auth");
    const auth = getAuth(app);
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return { email: credential.user.email };
  }

  if (!email || password.length < 4) {
    throw new Error("Enter an email and a password of at least 4 characters to continue.");
  }
  const session = { email, loggedInAt: new Date().toISOString() };
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("loisnx-admin-auth-change"));
  return session;
}

export async function signOutAdmin() {
  if (isFirebaseConfigured) {
    const { getAuth, signOut } = await import("firebase/auth");
    await signOut(getAuth(app));
    return;
  }
  window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("loisnx-admin-auth-change"));
}

export function getLocalSession() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(window.localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

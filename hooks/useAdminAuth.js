"use client";

import { useEffect, useState } from "react";
import { app, isFirebaseConfigured } from "@/lib/firebase";
import { getLocalSession } from "@/lib/auth";

export function useAdminAuth() {
  const [user, setUser] = useState(undefined); // undefined = loading, null = signed out

  useEffect(() => {
    if (isFirebaseConfigured) {
      let unsubscribe = () => {};
      import("firebase/auth").then(({ getAuth, onAuthStateChanged }) => {
        unsubscribe = onAuthStateChanged(getAuth(app), (fbUser) => {
          if (!fbUser) {
            setUser(null);
            return;
          }
          if (fbUser.isAnonymous) {
            // Invited admin — email lives in the local cache, not on the
            // anonymous auth object itself.
            const cached = getLocalSession();
            setUser({ email: cached?.email ?? "Invited admin", role: "invited" });
            return;
          }
          setUser({ email: fbUser.email, role: "primary" });
        });
      });
      return () => unsubscribe();
    }

    function sync() {
      setUser(getLocalSession());
    }
    sync();
    window.addEventListener("loisnx-admin-auth-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("loisnx-admin-auth-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { user, loading: user === undefined, isPrimary: user?.role === "primary" };
}

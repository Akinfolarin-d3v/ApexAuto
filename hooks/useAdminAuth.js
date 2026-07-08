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
          setUser(fbUser ? { email: fbUser.email } : null);
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

  return { user, loading: user === undefined };
}

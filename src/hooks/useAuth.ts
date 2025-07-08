import { useEffect, useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: any;
    (async () => {
      // @ts-ignore
      const { getAuth, onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js');
      // @ts-ignore
      const auth = getAuth();
      unsubscribe = onAuthStateChanged(auth, (firebaseUser: any) => {
        setUser(firebaseUser);
        setLoading(false);
      });
    })();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { user, loading };
} 
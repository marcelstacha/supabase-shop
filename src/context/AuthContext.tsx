import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../supabaseClient";
import { AuthError, User } from "@supabase/supabase-js";
import useLocalStorage from "../hooks/useLocalStorage";

type AuthContextType = {
   user: User | null;
   error: AuthError | undefined;
   setUser: React.Dispatch<React.SetStateAction<User | null>>;
   isSyncingCart: boolean;
   login: (e: React.FormEvent) => Promise<void>;
   logout: () => Promise<void>;
};

type AuthProviderProps = {
   children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {

   const [user, setUser] = useState<User | null>(null)
   const [error, setError] = useState<AuthError | undefined>()
   const [isSyncingCart, setIsSyncingCart] = useState(false)

   const { syncDBCart } = useLocalStorage();
   const { clearLocalIDs } = useLocalStorage();

   useEffect(() => {
      if (user) {
         setIsSyncingCart(true)
         syncDBCart(user)
            .finally(
               () => setIsSyncingCart(false)
            )
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [user])

   useEffect(() => {
      fetchUser();
      const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
         setUser(session?.user || null);
      });
      return () => {
         subscription.subscription.unsubscribe();
      };
   }, []);

   async function fetchUser() {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
   };

   async function login(e: React.FormEvent) {
      e.preventDefault();

      const form = e.target as HTMLFormElement;
      const email = form.email.value;
      const password = form.password.value;

      try {
         const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
         });
         if (error) {
            console.error("Login fehlgeschlagen -", error);
            setError(error);
         } else if (data) {
            setError(undefined);
            console.log(`%cLogin erfolgreich`, `color: #55FF00`)
         }
      } catch (e) {
         console.error(e as AuthError);
      } finally {
         form.reset();
      }
   }

   async function logout() {
      supabase.auth.signOut();
      setUser(null);
      clearLocalIDs();
   }

   return (
      <AuthContext.Provider value={{ user, setUser, login, logout, error, isSyncingCart }}>
         {children}
      </AuthContext.Provider>
   );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
   const context = useContext(AuthContext);

   if (context === undefined) {
      throw new Error("useAuth AuthContext Fehler");
   }

   return context;
};
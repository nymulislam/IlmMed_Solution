import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Firebase/Firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const axiosPublic = useAxiosPublic();

  // create user
  const createUser = async (email, password, displayName, photoURL) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, { displayName, photoURL });

      setUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // login existing users
  const loginWithPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout user
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // user observe
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);


      if (currentUser) {
        const userInfo = { email: currentUser?.email };

        try {
          const res = await axiosPublic.post("/jwt", userInfo);

          if (res.data.token) {
            localStorage.setItem("access_token", res.data.token);
          }
        } catch (error) {
          console.error("Error fetching JWT token:", error);
        }
      } else {
        localStorage.removeItem("access_token");
      }
      setLoading(false);
    });

    return () => {

      
      return unsubscribe();
    };
  }, [axiosPublic]);

  const AuthInfo = {
    loginWithPass,
    createUser,
    loading,
    logout,
    user,
  };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export async function apiLogin({ email, password }) {
  if (!email || !password) {
    throw new Error("Please fill in all fields.");
  }

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  return user;
}

export async function apiGoogleLogin() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Check if the user document already exists, if not, create it
  const userDocRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userDocRef);
  if (!userDoc.exists()) {
    await setDoc(userDocRef, { created_at: new Date() });
    collection(userDocRef, "cities");
  }

  return user;
}

export const apiSignup = async ({ email, password, fullName }) => {
  if (!email || !password || !fullName) {
    throw new Error("Please fill in all fields.");
  }

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await updateProfile(user, {
    displayName: fullName,
  });

  const userDocRef = doc(db, "users", user.uid);
  await setDoc(userDocRef, { created_at: new Date() });
  collection(userDocRef, "cities");

  return user;
};

export async function apiLogout() {
  await signOut(auth);
}

export async function getCurrentUser() {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();

      resolve(user || null);
    });
  });
}

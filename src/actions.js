import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
export const getCollection = async (collectionName) => {
  const result = { statusResponse: false, data: null, error: null };
  try {
    const data = await getDocs(collection(db, collectionName));
    const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    result.statusResponse = true;
    result.data = arrayData;
  } catch (error) {
    result.error = error;
    console.log(error);
  }

  return result;
};

export const addDocument = async (collectionName, data) => {
  const result = { statusResponse: false, data: null, error: null };
  try {
    const response = await addDoc(collection(db, collectionName), data);
    result.statusResponse = true;
    result.data = { id: response.id };
  } catch (error) {
    result.error = error;
    console.log(error);
  }

  return result;
};

export const getDocument = async (collectionName, id) => {
  const result = { statusResponse: false, data: null, error: null };
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Documento encontrado:", docSnap.data());
      result.statusResponse = true;
      result.data = { ...docSnap.data(), id: id };
      return result;
    } else {
      console.log("No existe un documento con ese ID.");
      result.statusResponse = false;
      result.error = "No existe un documento con ese ID.";
      return result;
    }
  } catch (error) {
    result.error = error;
    console.log(error);
  }

  return result;
};

export const updateDocument = async (collectionName, id, data) => {
  const result = { statusResponse: false, error: null };
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
    result.statusResponse = true;
  } catch (error) {
    result.error = error;
    console.log(error);
  }

  return result;
};

export const deleteDocument = async (collectionName, id) => {
  const result = { statusResponse: false, error: null };
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    result.statusResponse = true;
  } catch (error) {
    result.error = error;
    console.log(error);
  }

  return result;
};

/* eslint-disable consistent-return */
// firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore';

import { FIREBASE_API } from '../config';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

export async function computeUserDeposit() {
  const container = [];
  const deposits = [];
  try {
    const q = query(collection(DB, 'deposits'), where('isApproved', '==', true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      container.push(doc.data());
    });
    container.forEach((element) => {
      deposits.push(Number(element.amount));
    });
    const sum = deposits.reduce((partialSum, a) => partialSum + a, 0);
    return sum;
  } catch (error) {
    console.error("error", error.message);
  }
}
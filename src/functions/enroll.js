import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

export const enrollment = async (enrollmentId, enrollmentData) => {
    try {
        const docRef = collection(db, 'enrollment', enrollmentId);
        await addDoc(docRef, enrollmentData);
        alert("Successful Enroll!");
    } catch (err) {
        throw err;
    }
};

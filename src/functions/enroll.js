import { db } from '../firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';


export const isEnrollExist = async (enrollmentId) => {
    try {
        const docRef = doc(db, 'enrollment', enrollmentId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    } catch (err) {
        throw err;
    }
};

export const enrollment = async (enrollmentId, enrollmentData) => {
    try {
        const isEnrollmentIdInvalid = await isEnrollExist(enrollmentId);
        if (isEnrollmentIdInvalid) {
            const err = new Error(
                `You're already enroll this course`
            );
            throw err;
        }
        const docRef = doc(db, 'enrollment', enrollmentId);
        await setDoc(docRef, enrollmentData);
        alert("Successful Enroll!");
    } catch (err) {
        throw err;
    }
};

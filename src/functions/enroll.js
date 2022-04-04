import { db } from '../firebase';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';

export const isEnrollmentExist = async (enrollmentId) => {
  try {
    const docRef = doc(db, 'enrollments', enrollmentId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (err) {
    throw err;
  }
};

export const enroll = async (userId, courseId, enrollmentData) => {
  try {
    const enrollmentId = userId + '_' + courseId;
    const isEnrollmentInvalid = await isEnrollmentExist(enrollmentId);
    if (isEnrollmentInvalid) {
      const err = new Error(
        `User with id '${userId}' has already enrolled to the course with id '${courseId}'.`
      );
      throw err;
    }
    const docRef = doc(db, 'enrollments', enrollmentId);
    await setDoc(docRef, { ...enrollmentData, timestamp: Timestamp.now() });
    console.log(
      `User with id '${userId}' enrolled to the course with id '${courseId}' successfully.`
    );
  } catch (err) {
    throw err;
  }
};

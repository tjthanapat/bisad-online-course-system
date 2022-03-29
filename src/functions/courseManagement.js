import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const isCourseExist = async (courseId) => {
  try {
    const docRef = doc(db, 'courses', courseId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (err) {
    throw err;
  }
};

export const createCourse = async (courseId, courseData) => {
  try {
    const isCourseIdValid = await isCourseExist(courseId);
    if (isCourseIdValid) {
      const err = new Error(
        `Course with id '${courseId}' already exists. Please try another id.`
      );
      throw err;
    }
    const docRef = doc(db, 'courses', courseId);
    await setDoc(docRef, courseData);
    console.log(`Created course with id '${courseId}' successfully.`);
  } catch (err) {
    throw err;
  }
};

export const updateCourse = async (courseId, courseData) => {
  try {
    const isThisCourseExist = await isCourseExist(courseId);
    if (!isThisCourseExist) {
      const err = new Error(`Course with id '${courseId}' does not exists.`);
      throw err;
    }
    const docRef = doc(db, 'courses', courseId);
    await setDoc(docRef, courseData);
    console.log(`Updated course with id '${courseId}' successfully.`);
  } catch (err) {
    throw err;
  }
};

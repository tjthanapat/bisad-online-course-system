import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const isCourseExist = async (courseId) => {
  try {
    const docRef = doc(db, 'courses', courseId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (err) {
    throw err;
  }
};

const isLessonExist = async (courseId, lessonId) => {
  try {
    const docRef = doc(db, 'courses', courseId, 'lessons', lessonId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (err) {
    throw err;
  }
};

export const createCourse = async (courseId, courseData) => {
  try {
    const isCourseIdInvalid = await isCourseExist(courseId);
    if (isCourseIdInvalid) {
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
    await updateDoc(docRef, courseData);
    console.log(`Updated course with id '${courseId}' successfully.`);
  } catch (err) {
    throw err;
  }
};

export const createLesson = async (courseId, lessonId, lessonData) => {
  try {
    const isThisCourseExist = await isCourseExist(courseId);
    if (!isThisCourseExist) {
      const err = new Error(`Course with id '${courseId}' does not exists.`);
      throw err;
    }
    const isLessonIdInvalid = await isLessonExist(courseId, lessonId);
    if (isLessonIdInvalid) {
      const err = new Error(
        `Lesson with id '${lessonId}' in course with id '${courseId}' already exists. Please try another id.`
      );
      throw err;
    }
    const docRef = doc(db, 'courses', courseId, 'lessons', lessonId);
    await setDoc(docRef, lessonData);
    console.log(
      `Created lesson with id '${lessonId}' in course with id '${courseId}' successfully.`
    );
  } catch (err) {
    throw err;
  }
};

export const updateLesson = async (courseId, lessonId, lessonData) => {
  try {
    const isThisCourseExist = await isCourseExist(courseId);
    if (!isThisCourseExist) {
      const err = new Error(`Course with id '${courseId}' does not exists.`);
      throw err;
    }
    const isThisLessonExist = await isLessonExist(courseId, lessonId);
    if (!isThisLessonExist) {
      const err = new Error(
        `Lesson with id '${lessonId}' in course with id '${courseId}' does not exist.`
      );
      throw err;
    }
    const docRef = doc(db, 'courses', courseId, 'lessons', lessonId);
    await updateDoc(docRef, lessonData);
    console.log(
      `Updated lesson with id '${lessonId}' in course with id '${courseId}' successfully.`
    );
  } catch (err) {
    throw err;
  }
};

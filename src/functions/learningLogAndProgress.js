import { db } from '../firebase';
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';

export const saveLearningLog = async (userId, courseId, lessonId) => {
  try {
    const learningLogsRef = collection(db, 'users', userId, 'learningLogs');
    await addDoc(learningLogsRef, {
      courseId,
      lessonId,
      timestamp: Timestamp.now(),
    });
  } catch (err) {
    throw err;
  }
};

export const updateLearningProgress = async (userId, courseId, lessonId) => {
  try {
    const docRef = doc(db, 'progresses', `${userId}_${courseId}`);
    await updateDoc(docRef, { [lessonId]: true });
  } catch (err) {
    throw err;
  }
};

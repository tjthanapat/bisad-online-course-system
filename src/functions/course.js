import { db } from '../firebase';
import { doc, collection, query, getDoc, getDocs } from 'firebase/firestore';

export const getCourses = async () => {
  try {
    const q = query(collection(db, 'courses'));
    const querySnapshot = await getDocs(q);
    let courses = [];
    querySnapshot.forEach((doc) => {
      courses.push({ ...doc.data(), id: doc.id });
    });
    return courses;
  } catch (err) {
    throw err;
  }
};

export const getCourse = async (courseId) => {
  try {
    const docRef = doc(db, 'courses', courseId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const course = docSnap.data();
      return { ...course, id: docSnap.id };
    } else {
      const err = new Error(`Course with id '${courseId}' does not exist.`);
      throw err;
    }
  } catch (err) {
    throw err;
  }
};

import { db } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';

export const getCourses = async () => {
  try {
    const q = query(collection(db, 'courses'));
    const querySnapshot = await getDocs(q);
    let courses = [];
    querySnapshot.forEach((doc) => {
      courses.push(doc.data());
    });
    return courses;
  } catch (err) {
    throw err;
  }
};

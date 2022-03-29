import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getCourse } from '../../functions/course';

const Course = () => {
  const auth = useAuth();
  const params = useParams();
  const courseId = params.courseId;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [course, setCourse] = useState({});

  useEffect(() => {
    const getCourseData = async () => {
      try {
        setLoading(true);
        const courseData = await getCourse(courseId);
        setCourse(courseData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if (!!auth.user) {
      getCourseData();
    } else {
      setLoading(false);
    }
  }, [auth.user]);

  if (auth.loading || loading) {
    return <p>Loading...</p>;
  } else if (!auth.user) {
    return <p>Please sign in to access this page.</p>;
  } else if (!!error) {
    return <p>{error.message}</p>;
  } else {
    const { id, name, instructor, description, price, coverImageUrl } = course;
    return (
      <div className="flex">
        <div>
          <img src={coverImageUrl} className="h-48 w-48 object-cover" alt="" />
        </div>
        <div>
          <p>
            {name} (id: {id})
          </p>
          <p>Instructor: {instructor}</p>
          <p>Description: {description}</p>
          <p>Price: {price} baht</p>
        </div>
      </div>
    );
  }
};

export default Course;

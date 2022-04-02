import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { isEnrollExist } from '../../functions/enroll';

const CoursePage = (props) => {
    const auth = useAuth();
    const { id, name, instructor, description, price, coverImageUrl } =
        props.course;
    const { lessons, course } = props;
    const [label, setLabel] = useState()
    useEffect(() => {
        const check_enroll = async () => {
            var id = course.id + "_" + auth.user.uid;
            const isEnrollmentIdInvalid = await isEnrollExist(id);
            if (isEnrollmentIdInvalid) {
                setLabel("Study");
            } else {
                setLabel("Enroll");
            }
        }; check_enroll();
    });
    return (
        <>
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
                    {!!auth.user.admin ? (
                        <Link to={`/course/${id}/edit`}>
                            <button className="rounded-full py-1 px-5 bg-orange-500 hover:bg-orange-600 text-white">
                                Edit
                            </button>
                        </Link>
                    ) : (
                        <Link to={`/course/${id}/${label}`}>
                            <button className="rounded-full py-1 px-5 bg-blue-500 hover:bg-blue-600 text-white">
                                {label}
                            </button>
                        </Link>
                    )}
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-medium">Lessons</h2>
                {!!auth.user.admin && (
                    <Link to={`/course/${id}/createlesson`}>
                        <button className="rounded-full py-1 px-5 bg-blue-500 hover:bg-blue-600 text-white">
                            Create New Lesson
                        </button>
                    </Link>
                )}

                {!!lessons &&
                    lessons.map((lesson) => (
                        <LessonItem key={lesson.id} courseId={id} lesson={lesson} />
                    ))}
            </div>
        </>
    );
};

const LessonItem = (props) => {
    const auth = useAuth();
    const { courseId } = props;
    const { id, name } = props.lesson;
    return (
        <div>
            <p>
                {name} (id: {id})
            </p>
            <Link to={`/course/${courseId}/lesson/${id}`}>
                <button className="rounded-full py-1 px-5 bg-orange-500 hover:bg-orange-600 text-white">
                    View
                </button>
            </Link>
            {auth.user.admin && (
                <Link to={`/course/${courseId}/lesson/${id}/edit`}>
                    <button className="rounded-full py-1 px-5 bg-blue-500 hover:bg-blue-600 text-white">
                        Edit
                    </button>
                </Link>
            )}
        </div>
    );
};

export default CoursePage;

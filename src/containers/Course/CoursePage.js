import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import Button from '@mui/material/Button';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LessonItem from './LessonItem';

const CoursePage = (props) => {
  const auth = useAuth();
  const { lessons, course, enrolled } = props;

  useEffect(() => {
    document.title = `Courseiku | ${course.name}`;
  });

  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar />
      <div className="mb-auto">
        <div className="max-w-screen-lg mx-auto my-10 px-5">
          <div>
            <Link to="/">
              <span className="text-gray-400 hover:text-orange-400">
                {'<'} กลับหน้ารายการคอร์สเรียน
              </span>
            </Link>
          </div>
          <div className="mt-7 flex flex-col md:flex-row">
            {!!course.coverImage && (
              <div className="h-56 md:w-1/4">
                <img
                  src={course.coverImage}
                  className="h-full w-full object-cover rounded-lg"
                  alt={course.name}
                />
              </div>
            )}
            <div
              className={`mt-5 md:mt-0 ${
                !!course.coverImage ? 'md:ml-5 md:w-3/4' : ''
              }`}
            >
              <h1 className="font-medium text-3xl text-orange-400">
                {course.name}
              </h1>
              <p>ผู้สอน: {course.instructor}</p>
              {!enrolled && (
                <p>
                  ราคา:{' '}
                  <span className="text-xl">
                    {Number(course.price).toLocaleString('en', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>{' '}
                  บาท
                </p>
              )}
              <p className="mt-2">{course.description}</p>

              {!!auth.user.admin && (
                <Link to={`/course/${course.id}/edit`}>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    sx={{ marginTop: '1rem', fontSize: '1rem' }}
                  >
                    แก้ไขคอร์ส
                  </Button>
                </Link>
              )}
              {!auth.user.admin && !enrolled && (
                <Link to={`/course/${course.id}/enroll`}>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    sx={{ marginTop: '1rem', fontSize: '1rem' }}
                  >
                    ลงทะเบียนเรียน
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <div className="mt-5">
            <div className="flex flex-row justify-between items-center mb-3">
              <h2 className="text-2xl font-medium text-orange-400">บทเรียน</h2>
              {!!auth.user.admin && (
                <div className="flex justify-end">
                  <Link to={`/course/${course.id}/createlesson`}>
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      sx={{ fontSize: '1rem' }}
                    >
                      สร้างบทเรียนใหม่
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <div className="rounded-lg border mt-2">
              <ul className="divide-y">
                {!!lessons &&
                  lessons.map((lesson) => (
                    <LessonItem
                      key={lesson.id}
                      courseId={course.id}
                      lesson={lesson}
                      enrolled={enrolled}
                    />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
    // <>
    //   <Navbar />
    //   <div className="max-w-screen-lg mx-auto my-5 px-5">
    //     <div className="mt-10">
    //       <Link to="/">
    //         <span className="text-gray-400 hover:text-orange-400">
    //           {'<'} กลับหน้ารายการคอร์สเรียน
    //         </span>
    //       </Link>
    //     </div>
    //     <div className="mt-7 flex flex-col md:flex-row">
    //       {!!course.coverImage && (
    //         <div className="h-56 md:w-1/4">
    //           <img
    //             src={course.coverImage}
    //             className="h-full w-full object-cover rounded-lg"
    //             alt={course.name}
    //           />
    //         </div>
    //       )}
    //       <div
    //         className={`mt-5 md:mt-0 ${
    //           !!course.coverImage ? 'md:ml-5 md:w-3/4' : ''
    //         }`}
    //       >
    //         <h1 className="font-medium text-3xl text-orange-400">
    //           {course.name}
    //         </h1>
    //         <p>ผู้สอน: {course.instructor}</p>
    //         {!enrolled && (
    //           <p>
    //             ราคา:{' '}
    //             <span className='text-xl'>{Number(course.price).toLocaleString('en', {
    //               minimumFractionDigits: 2,
    //               maximumFractionDigits: 2,
    //             })}</span>{' '}
    //             บาท
    //           </p>
    //         )}
    //         <p className="mt-2">{course.description}</p>

    //         {!!auth.user.admin && (
    //           <Link to={`/course/${course.id}/edit`}>
    //             <Button
    //               variant="contained"
    //               color="primary"
    //               disableElevation
    //               sx={{ marginTop: '1rem', fontSize: '1rem' }}
    //             >
    //               แก้ไขคอร์ส
    //             </Button>
    //           </Link>
    //         )}
    //         {!auth.user.admin && !enrolled && (
    //           <Link to={`/course/${course.id}/enroll`}>
    //             <Button
    //               variant="contained"
    //               color="primary"
    //               disableElevation
    //               sx={{ marginTop: '1rem', fontSize: '1rem' }}
    //             >
    //               ลงทะเบียนเรียน
    //             </Button>
    //           </Link>
    //         )}
    //       </div>
    //     </div>
    //     <div className="mt-5">
    //       <div className="flex flex-row justify-between items-center mb-3">
    //         <h2 className="text-2xl font-medium text-orange-400">บทเรียน</h2>
    //         {!!auth.user.admin && (
    //           <div className="flex justify-end">
    //             <Link to={`/course/${course.id}/createlesson`}>
    //               <Button
    //                 variant="contained"
    //                 color="primary"
    //                 disableElevation
    //                 sx={{ fontSize: '1rem' }}
    //               >
    //                 สร้างบทเรียนใหม่
    //               </Button>
    //             </Link>
    //           </div>
    //         )}
    //       </div>
    //       <div className="rounded-lg border mt-2">
    //         <ul className="divide-y">
    //           {!!lessons &&
    //             lessons.map((lesson) => (
    //               <LessonItem
    //                 key={lesson.id}
    //                 courseId={course.id}
    //                 lesson={lesson}
    //                 enrolled={enrolled}
    //               />
    //             ))}
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    //   <Footer />
    // </>
  );
};

export default CoursePage;

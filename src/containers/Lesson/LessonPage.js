import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import LoadingPage from '../../components/LoadingPage';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../contexts/AuthContext';
import { saveLearningLog } from '../../functions/learningLogAndProgress';

const LessonPage = (props) => {
  const auth = useAuth();
  const { lesson, course, enrolled } = props;

  useEffect(() => {
    document.title = `Courseiku | ${lesson.name}`;
  });

  const [loading, setLoading] = useState(true);

  const [youtubeId, setYoutubeId] = useState('');

  const youtubeParser = (url) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };

  useEffect(() => {
    if (lesson.type == 'video') {
      setYoutubeId(youtubeParser(lesson.source));
    }
  }, []);

  useEffect(() => {
    const saveLog = async () => {
      try {
        await saveLearningLog(auth.user.uid, course.id, lesson.id);
        console.log('Saved learning log successfully.');
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    if (enrolled) {
      saveLog();
    } else {
      setLoading(false);
    }
  }, [enrolled]);

  if (loading) {
    return <LoadingPage />;
  } else if (auth.user.admin || enrolled) {
    return (
      <div className="flex flex-col h-screen justify-between">
        <Navbar />
        <div className="mb-auto">
          <div className="max-w-screen-lg mx-auto my-10 px-5">
            <div>
              <Link to={`/course/${course.id}`}>
                <span className="text-gray-400 hover:text-orange-400">
                  {'<'} กลับหน้าคอร์สเรียน
                </span>
              </Link>
            </div>
            <h1 className="font-medium text-3xl text-orange-400 mt-5">
              {lesson.name}
            </h1>
            <p className="mt-2">{lesson.description}</p>
            <div className="mt-5">
              {lesson.type === 'video' && (
                <div
                  className="relative h-0 overflow-hidden max-w-full w-full"
                  style={{ paddingBottom: '56.25%' }}
                >
                  <iframe
                    title={lesson.name}
                    className="absolute top-0 left-0 w-full h-full"
                    type="text/html"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    frameBorder="0"
                    allowFullScreen={true}
                  />
                </div>
              )}
              {lesson.type === 'file' && (
                <div>
                  <p>
                    ดาวน์โหลด:{' '}
                    <a
                      href={lesson.source}
                      target="_blank"
                      rel="noreferrer"
                      className="text-orange-400 hover:text-orange-500"
                    >
                      {lesson.name}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  } else {
    return <Navigate to="/" replace />;
  }
};

export default LessonPage;

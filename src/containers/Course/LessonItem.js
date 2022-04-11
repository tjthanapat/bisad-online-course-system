import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import { ReactComponent as VideoIcon } from '../../assets/video.svg';
import { ReactComponent as FileIcon } from '../../assets/file.svg';

import Button from '@mui/material/Button';

const LessonItem = (props) => {
  const auth = useAuth();
  const { courseId, lesson, enrolled } = props;
  return (
    <li className="p-5 flex flex-col sm:flex-row sm:items-center justify-between">
      <div className="flex items-center">
        {!!lesson.type && lesson.type == 'video' && (
          <VideoIcon className="w-7 text-gray-300" />
        )}
        {!!lesson.type && lesson.type == 'file' && (
          <FileIcon className="w-7 text-gray-300" />
        )}
        <h5 className="text-lg ml-5">{lesson.name}</h5>
      </div>
      <div className="mt-2 sm:mt-0 flex justify-end items-center">
        {!auth.user.admin && enrolled && (
          <Link to={`/course/${courseId}/lesson/${lesson.id}`}>
            <Button variant="contained" color="primary" disableElevation>
              เข้าสู่บทเรียน
            </Button>
          </Link>
        )}
        {!auth.user.admin && !enrolled && (
          <Button variant="contained" color="primary" disableElevation disabled>
            เข้าสู่บทเรียน
          </Button>
        )}

        {auth.user.admin && (
          <Link to={`/course/${courseId}/lesson/${lesson.id}/edit`}>
            <Button variant="contained" color="primary" disableElevation>
              แก้ไข
            </Button>
          </Link>
        )}
      </div>
    </li>
  );
};

export default LessonItem;

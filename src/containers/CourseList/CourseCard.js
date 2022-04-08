import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import Button from '@mui/material/Button';

const CourseCard = (props) => {
  const auth = useAuth();
  const { course } = props;
  return (
    <div className="flex flex-col md:flex-row border rounded-lg shadow-lg my-5">
      <div className="h-48 md:w-72">
        <img
          src={course.coverImageUrl}
          className="h-full w-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
          alt={course.name}
        />
      </div>
      <div className="p-5">
        <h3 className="font-medium text-xl">{course.name}</h3>
        <p className="truncate">{course.description}</p>
        <div className="mt-5">
          <Link to={`/course/${course.id}`}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              type="submit"
            >
              ดูรายละเอียด
            </Button>
          </Link>
          {!!auth.user.admin && (
            <Link to={`/course/${course.id}/edit`}>
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                type="submit"
                sx={{ marginLeft: '0.5rem' }}
              >
                แก้ไข
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

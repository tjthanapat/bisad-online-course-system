import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { updateLesson } from '../../functions/courseManagement';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import LoadingPage from '../../components/LoadingPage';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const EditLesson = (props) => {
  const auth = useAuth();

  useEffect(() => {
    document.title = 'Courseiku | แก้ไขบทเรียน';
  });

  const { course, lesson } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [lessonData, setLessonData] = useState(lesson);

  const handleChangeLessonDataInput = (event) => {
    setLessonData({ ...lessonData, [event.target.id]: event.target.value });
  };
  const handleChangeLessonType = (event) => {
    setLessonData({ ...lessonData, type: event.target.value });
  };

  const handleSubmitCreateLesson = async (event) => {
    event.preventDefault();
    console.log(lessonData);
    try {
      setLoading(true);
      const lessonDataExcludeId = {
        name: lessonData.name,
        description: lessonData.description,
        type: lessonData.type,
        source: lessonData.source,
      };
      await updateLesson(course.id, lessonData.id, lessonDataExcludeId);
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err);
      setOpenDialog(true);
      setLoading(false);
    }
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (auth.loading || loading) {
    return <LoadingPage />;
  } else if (success) {
    return (
      <div className="bg-orange-400 min-h-screen flex flex-col items-center justify-center p-5">
        <h1 className="text-4xl font-semibold text-white mb-8">Courseiku</h1>
        <div
          className="bg-white px-5 py-8 rounded-xl shadow-xl"
          style={{ minWidth: '300px' }}
        >
          <h2 className="text-lg font-medium">แก้ไขบทเรียนสำเร็จ</h2>
          <p className="mb-5">คุณได้ทำการแก้ไขบทเรียนในคอร์ส {course.name}</p>
          <a href={`/course/${course.id}`}>
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              fullWidth
            >
              กลับหน้าคอร์สเรียน
            </Button>
          </a>
        </div>
        <p className="text-white mt-16">Courseiku © 2022</p>
      </div>
    );
  } else if (!!auth.user && auth.user.admin) {
    return (
      <>
        <Navbar />
        <div className="max-w-screen-lg mx-auto my-5 px-5">
          <div className="mt-10">
            <Link to={`/course/${course.id}`}>
              <span className="text-gray-400 hover:text-orange-400">
                {'<'} กลับ
              </span>
            </Link>
          </div>
          <h1 className="mt-7 text-2xl font-medium">แก้ไขบทเรียน</h1>
          <p>
            แก้ไขบทเรียน (ไอดี: {lessonData.id}) ในคอร์ส {course.name} (ไอดี:{' '}
            {course.id})
          </p>
          <form onSubmit={handleSubmitCreateLesson}>
            <div className="my-5 space-y-3">
              <div>
                <label htmlFor="id">ไอดีบทเรียน</label>
                <input
                  type="text"
                  className="block p-2 rounded border w-full"
                  id="id"
                  placeholder="ไอดีบทเรียน"
                  value={lessonData.id}
                  disabled
                />
              </div>
              <div>
                <label htmlFor="name">ชื่อบทเรียน</label>
                <input
                  type="text"
                  className="block p-2 rounded border w-full"
                  id="name"
                  placeholder="ชื่อบทเรียน"
                  value={lessonData.name}
                  onChange={handleChangeLessonDataInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="description">คำอธิบายบทเรียน</label>
                <textarea
                  className="block p-2 rounded border w-full"
                  id="description"
                  placeholder="คำอธิบายบทเรียน"
                  rows={4}
                  value={lessonData.description}
                  onChange={handleChangeLessonDataInput}
                />
              </div>
              <div>
                <p>ประเภทบทเรียน</p>
                <div>
                  <input
                    type="radio"
                    id="video"
                    value="video"
                    name="lessonType"
                    checked={lessonData.type === 'video'}
                    onChange={handleChangeLessonType}
                  />
                  <label htmlFor="video" className="ml-2">
                    วิดีโอ
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="file"
                    value="file"
                    name="lessonType"
                    checked={lessonData.type === 'file'}
                    onChange={handleChangeLessonType}
                  />
                  <label htmlFor="file" className="ml-2">
                    ไฟล์
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor="source">ลิงค์วิดีโอหรือไฟล์บทเรียน</label>
                <input
                  type="text"
                  className="block p-2 rounded border w-full"
                  id="source"
                  placeholder="ลิงค์วิดีโอหรือไฟล์บทเรียน"
                  value={lessonData.source}
                  onChange={handleChangeLessonDataInput}
                  required
                />
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disableElevation
            >
              บันทึก
            </Button>
          </form>
        </div>
        <Footer />
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">เกิดข้อผิดพลาด</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {!!error && error.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} autoFocus>
              ปิด
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  } else {
    return <p>Only admin can access this page.</p>;
  }
};

export default EditLesson;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { createCourse } from '../../functions/courseManagement';

import Logo from '../../assets/logo.svg';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import LoadingPage from '../../components/LoadingPage';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const CreateCourse = () => {
  const auth = useAuth();

  useEffect(() => {
    document.title = 'Courseiku | สร้างคอร์สเรียน';
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const courseDataDefault = {
    id: '',
    name: '',
    description: '',
    instructor: '',
    coverImage: null,
    price: '',
  };
  const [courseData, setCourseData] = useState(courseDataDefault);

  const handleChangeCourseDataInput = (event) => {
    setCourseData({ ...courseData, [event.target.id]: event.target.value });
  };

  const handleChangeCoverImage = (event) => {
    const file = event.target.files[0];
    setCourseData({ ...courseData, coverImage: file });
  };

  const convertFileToDataUrl = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmitCreateCourse = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      let coverImageDataURL = null;
      if (!!courseData.coverImage) {
        coverImageDataURL = await convertFileToDataUrl(courseData.coverImage);
      }
      const courseDataExcludeId = {
        name: courseData.name,
        description: courseData.description,
        instructor: courseData.instructor,
        coverImage: coverImageDataURL,
        price: parseFloat(courseData.price),
      };
      await createCourse(courseData.id, courseDataExcludeId);
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
      <div className="bg-gradient-to-br from-orange-400 to-orange-300 min-h-screen flex flex-col items-center justify-center p-5">
        <img className="w-full max-w-xs mb-5" src={Logo} alt="Courseiku" />
        <div
          className="bg-white px-5 py-8 rounded-xl shadow-xl"
          style={{ minWidth: '300px' }}
        >
          <h2 className="text-lg font-medium">สร้างคอร์สสำเร็จ</h2>
          <p className="mb-5">
            คุณได้ทำการสร้างคอร์ส {courseData.name} (ไอดี: {courseData.id})
          </p>
          <Link to={`/course/${courseData.id}`}>
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              fullWidth
            >
              ไปยังหน้าคอร์สเรียน
            </Button>
          </Link>
        </div>
        <p className="text-white mt-16">Courseiku © 2022</p>
      </div>
    );
  }
  if (!!auth.user && auth.user.admin) {
    return (
      <>
        <div className="flex flex-col h-screen justify-between">
          <Navbar />
          <div className="mb-auto">
            <div className="max-w-screen-lg mx-auto my-10 px-5">
              <div>
                <Link to="/">
                  <span className="text-gray-400 hover:text-orange-400">
                    {'<'} กลับ
                  </span>
                </Link>
              </div>
              <h1 className="mt-7 text-2xl font-medium">สร้างคอร์สเรียน</h1>
              <form onSubmit={handleSubmitCreateCourse}>
                <div className="my-5 space-y-3">
                  <div>
                    <label htmlFor="id">ไอดีคอร์ส</label>
                    <input
                      type="text"
                      className="block p-2 rounded border w-full"
                      id="id"
                      placeholder="ไอดีคอร์ส"
                      value={courseData.id}
                      onChange={handleChangeCourseDataInput}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="name">ชื่อคอร์ส</label>
                    <input
                      type="text"
                      className="block p-2 rounded border w-full"
                      id="name"
                      placeholder="ชื่อคอร์ส"
                      value={courseData.name}
                      onChange={handleChangeCourseDataInput}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="instructor">ผู้สอน</label>
                    <input
                      type="text"
                      className="block p-2 rounded border w-full"
                      id="instructor"
                      placeholder="ชื่อผู้สอน"
                      value={courseData.instructor}
                      onChange={handleChangeCourseDataInput}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description">คำอธิบายคอร์ส</label>
                    <textarea
                      className="block p-2 rounded border w-full"
                      id="description"
                      placeholder="คำอธิบายคอร์ส"
                      rows={4}
                      value={courseData.description}
                      onChange={handleChangeCourseDataInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="price">ราคาคอร์ส (บาท)</label>
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      className="block p-2 rounded border w-full"
                      id="price"
                      placeholder="ราคาคอร์ส (บาท)"
                      value={courseData.price}
                      onChange={handleChangeCourseDataInput}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="coverImageUrl">รูปปกคอร์ส</label>
                    <div>
                      <input
                        accept="image/jpeg,image/png"
                        id="coverImageFile"
                        multiple={false}
                        type="file"
                        onChange={handleChangeCoverImage}
                        hidden
                      />
                      <label htmlFor="coverImageFile">
                        <Button variant="text" component="span">
                          เลือกไฟล์
                        </Button>
                      </label>
                      <label className="ml-3">
                        {courseData.coverImage
                          ? courseData.coverImage.name
                          : 'ยังไม่มีไฟล์ที่ถูกเลือก'}
                      </label>
                    </div>
                  </div>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disableElevation
                >
                  สร้าง
                </Button>
              </form>
            </div>
          </div>
          <Footer />
        </div>
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

export default CreateCourse;

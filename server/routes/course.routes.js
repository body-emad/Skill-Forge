import { Router } from 'express'
const router = Router()
import {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
  addLectureToCourseById,
  deleteCourseLecture,
  updateCourseLecture,
} from '../controllers/course.controller.js'
import { isLoggedIn, authorisedRoles } from '../middleware/auth.middleware.js'
import upload from '../middleware/multer.middleware.js'
import { verifyEnrollment } from '../utils/verifyEnrollment.js'

router
  .route('/')
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorisedRoles('ADMIN'),
    upload.single('thumbnail'),
    createCourse
  )
  .delete(isLoggedIn, authorisedRoles('ADMIN'), deleteCourseLecture)
  .put(
    isLoggedIn,
    authorisedRoles('ADMIN'),
    upload.single('lecture'),
    updateCourseLecture
  )

router
  .route('/:id')
  .get(isLoggedIn, verifyEnrollment, getLecturesByCourseId)
  .put(
    isLoggedIn,
    authorisedRoles('ADMIN'),
    upload.single('thumbnail'),
    updateCourse
  )
  .delete(isLoggedIn, authorisedRoles('ADMIN'), removeCourse)
  .post(
    isLoggedIn,
    authorisedRoles('ADMIN'),
    upload.single('lecture'),
    addLectureToCourseById
  )

export default router

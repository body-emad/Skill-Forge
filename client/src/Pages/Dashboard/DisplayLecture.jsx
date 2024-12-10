import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCourseLectures,
  deleteCourseLecture,
} from '../../Redux/Slices/LectureSlice'
import Layout from '../../Layout/Layout'
import { Player } from 'video-react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

export default function DisplayLecture() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const state = location.state
  const lectures = useSelector((state) => state.lecture.lectures)
  const { role } = useSelector((state) => state.auth)

  const [currentVideo, setCurrentVideo] = useState(0)

  async function onLectureDelete(courseId, lectureId) {
    await dispatch(deleteCourseLecture({ courseId, lectureId }))
    await dispatch(getCourseLectures(courseId))
  }

  useEffect(() => {
    if (!state?._id) {
      navigate('/courses')
      return
    }
    dispatch(getCourseLectures(state._id))
  }, [state, dispatch, navigate])

  return (
    <Layout hideFooter={true} hideNav={true} hideBar={true}>
      <section className="flex flex-col gap-6 items-center md:py-8 py-0 px-0 h-screen overflow-y-scroll">
        <div
          className="flex flex-col dark:bg-base-100 relative md:gap-12 gap-5 rounded-lg
         md:py-10 md:pt-3 py-0 pt-3 md:px-7 px-0 md:w-[780px] w-full h-full overflow-y-hidden shadow-custom dark:shadow-xl"
        >
          <Link to={`/courses/description/${state?._id}`} state={state}>
            <AiOutlineArrowLeft className="text-primary text-[2.5rem]" />
          </Link>
          <h1
            className="text-center relative md:px-0 px-3 w-fit dark:text-purple-500 md:text-2xl text-lg font-bold
           font-inter after:content-[' ']  after:absolute after:-bottom-2  md:after:left-0 after:left-3 after:h-[3px] after:w-[60%] after:rounded-full after:bg-primary "
          >
            Course:
            <span className="text-secondary font-nunito-sans ml-2">
              {state?.title}
            </span>
          </h1>
          <div className="flex md:flex-row flex-col md:justify-between w-full h-full">
            {/* Left section for lecture video and details */}
            <div className="md:w-[48%] w-full md:p-3 p-1 overflow-y-scroll md:h-full h-[40%] flex justify-center">
              {lectures && lectures.length > 0 ? (
                <div className="w-full h-[170px] border bg-[#0000003d] shadow-lg">
                  <Player
                    className="h-full mx-auto"
                    playsInline
                    poster="/assets/poster.png"
                    src={lectures?.[currentVideo]?.lecture?.secure_url}
                  />

                  <div className="py-7">
                    <h1 className="text-[17px] text-gray-700 font-[500] dark:text-white font-lato">
                      <span className="text-secondary  font-inter font-semibold text-lg">
                        Title:
                      </span>{' '}
                      {lectures?.[currentVideo]?.title}
                    </h1>
                    <p className="text-[16.5px] pb-12 text-gray-700 font-[500] dark:text-slate-300 font-lato">
                      <span className="text-secondary  font-inter font-semibold text-lg">
                        Description:
                      </span>{' '}
                      {lectures?.[currentVideo]?.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 dark:text-slate-300">
                  <p className="text-lg font-medium">
                    No lectures available to display.
                  </p>
                  {role === 'ADMIN' && (
                    <button
                      onClick={() =>
                        navigate('/course/addlecture', { state: { ...state } })
                      }
                      className=" mt-4 px-3 py-2 font-inter rounded-md font-semibold text-sm"
                    >
                      Add a new lecture
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Right section for lectures list */}
            <div className="md:w-[48%] pb-12 md:flex-row flex-col w-full md:h-full h-[60%] overflow-y-scroll">
              <ul className="w-full md:p-2 p-0 flex flex-col gap-5 shadow-sm">
                <li className="font-semibold bg-slate-50 dark:bg-slate-100 p-3 rounded-md shadow-lg sticky top-0 text-xl text-secondary font-nunito-sans flex items-center justify-between">
                  <p>Lectures list</p>
                  {role === 'ADMIN' && (
                    <button
                      onClick={() =>
                        navigate('/course/addlecture', { state: { ...state } })
                      }
                      className="btn-secondary px-3 py-2 font-inter rounded-md font-semibold text-sm"
                    >
                      Add new lecture
                    </button>
                  )}
                </li>
                {lectures && lectures.length > 0 ? (
                  lectures.map((lecture, idx) => (
                    <li className="space-y-2" key={lecture._id}>
                      <p
                        className={`cursor-pointer text-base font-[500] font-open-sans ${
                          currentVideo === idx
                            ? 'text-secondary dark:text-yellow-500'
                            : ' text-gray-600 dark:text-white'
                        }`}
                        onClick={() => setCurrentVideo(idx)}
                      >
                        <span className="font-inter">{idx + 1}. </span>
                        {lecture?.title}
                      </p>
                      {role === 'ADMIN' && (
                        <button
                          onClick={() => onLectureDelete(state, lecture?._id)}
                          className="bg-[#bc2323] capitalize px-[16px] py-1 rounded-md text-white font-inter font-[500]  text-sm"
                        >
                          Delete lecture
                        </button>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="text-center text-lg text-gray-600 dark:text-slate-300">
                    No lectures available.{' '}
                    {role === 'ADMIN' && (
                      <span>
                        Please{' '}
                        <button
                          onClick={() =>
                            navigate('/course/addlecture', {
                              state: { ...state },
                            })
                          }
                          className="text-blue-500 underline dark:text-yellow-500"
                        >
                          add a lecture
                        </button>
                        .
                      </span>
                    )}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

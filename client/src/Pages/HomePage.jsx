import { Link } from 'react-router-dom'
import Layout from '../Layout/Layout'
import heroPng from '../assets/images/HeroImg.svg'

export default function HomePage() {
  return (
    <Layout>
      <section className="md:py-10 py-7 mb-10 text-white flex md:flex-row flex-col-reverse items-center justify-center md:gap-10 gap-7 md:px-12 px-6 min-h-[85vh]">
        <div className="md:w-1/2 w-full space-y-6">
          <h1 className="md:text-[45px] text-6xl font-semibold text-gray-900 dark:text-gray-200">
            Forge Your Future with New Skills
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-300 pb-8">
            Empowering learners with high-quality, practical courses crafted by
            industry experts. Start shaping your career today
          </p>

          <Link to="/courses">
            <button className="bg-secondary dark:bg-primary px-[28px] py-[12px] rounded-md hover:opacity-90">
              Explore courses
            </button>
          </Link>
        </div>

        <div className="md:w-1/2 w-1/7 flex items-center justify-center">
          <img alt="homepage image" src={heroPng} />
        </div>
      </section>
    </Layout>
  )
}

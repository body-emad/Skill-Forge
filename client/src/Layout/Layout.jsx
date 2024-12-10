import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'

export default function Layout({ children, hideBar, hideNav, hideFooter }) {
  return (
    <>
      <main className="min-h-screen font-lato bg-[#FBFBFB] dark:bg-[#131212] text-black dark:text-white">
        {/* navbar */}
        {!hideNav && <Navbar />}

        {/* main content */}
        {children}

        {/* footer */}
        {!hideFooter && <Footer />}
      </main>
    </>
  )
}

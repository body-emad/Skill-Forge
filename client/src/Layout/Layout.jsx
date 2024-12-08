import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

export default function Layout({ children, hideBar, hideNav, hideFooter }) {
  return (
    <>
      <main className="min-h-[100vh] bg-[#FBFBFB] dark:bg-[#131212]">
        {/* navbar */}
        {!hideNav && <Navbar />}

        {/* sidebar */}
        <Sidebar hideBar={hideBar} />

        {/* main content */}
        {children}

        {/* footer */}
        {!hideFooter && <Footer />}
      </main>
    </>
  )
}

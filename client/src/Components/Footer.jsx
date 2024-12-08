export default function Footer() {
  const curDate = new Date()
  const year = curDate.getFullYear()
  return (
    <footer className="py-4 md:px-16 px-3 dark:bg-gray-900 flex md:flex-row flex-col md:justify-between justify-center items-center gap-4">
      <span className="md:text-[14px]  text-lg font-medium text-black dark:text-white">
        Copyright {year} | All Right Reserved
      </span>
      <p className="md:text-[16px] text-lg font-semibold text-black dark:text-white">
        Skill Forge
      </p>
    </footer>
  )
}

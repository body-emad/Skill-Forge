const FEATURED_THRESHOLD = 4.5
const BESTSELLER_THRESHOLD = 100

const updateCourseFlags = async (courseId) => {
  const course = await Course.findById(courseId)

  if (!course) throw new Error('Course not found')

  // Check thresholds and update flags
  course.isFeatured = course.ratings >= FEATURED_THRESHOLD
  course.isBestseller = course.purchases >= BESTSELLER_THRESHOLD

  await course.save()
}

export default updateCourseFlags

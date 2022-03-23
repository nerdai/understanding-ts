// Generic Utility Types that exist in TS
// only available in development
// Generic types lock in a type (re: difference between union types and generic)

// Partial
// turns all properties as optional
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string, 
  description: string, 
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

// ReadOnly
// not allow to change, mutate variables
const names: Readonly<string[]> = ['Max', 'Anna'];
// names.push('Manu'); // won't compile
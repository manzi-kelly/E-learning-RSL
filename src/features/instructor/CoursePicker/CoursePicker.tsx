import { useId } from "react";
import { assignedCourses, type AssignedCourseId } from "../data/mockInstructorData";
import styles from "./CoursePicker.module.css";

export default function CoursePicker({ value, onChange, allowAll = false }: {
  value: AssignedCourseId | ""; onChange: (course: AssignedCourseId | "") => void; allowAll?: boolean;
}) {
  const id = useId();
  return (
    <div className={styles.picker}>
      <label htmlFor={id} className={styles.label}>
        <span className={styles.labelText}>Assigned course</span>
        <span className={styles.control}>
          <select
            id={id}
            className={styles.select}
            value={value}
            onChange={event => {
              const course = assignedCourses.find(item => item.courseId === event.target.value);
              if (course || allowAll) onChange(course?.courseId ?? "");
            }}
          >
            {allowAll && <option value="">All assigned courses</option>}
            {assignedCourses.map(item => (
              <option key={item.courseId} value={item.courseId}>{item.course.title}</option>
            ))}
          </select>
        </span>
      </label>
    </div>
  );
}
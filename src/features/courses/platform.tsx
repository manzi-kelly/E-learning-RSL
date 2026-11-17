"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import SectionMotion from "../landing/SectionMotion";
import { courses, type Course } from "./courseData";
import styles from "./platform.module.css";

type HeadingLevel = 2 | 3;

export function CourseCard({
  course,
  index,
  headingLevel = 2,
}: {
  course: Course;
  index?: number;
  headingLevel?: HeadingLevel;
}) {
  const TitleTag = headingLevel === 3 ? "h3" : "h2";
  const number = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    void video.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <article
      className={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/courses/${course.id}`}
        className={styles.thumbnailLink}
        aria-label={`View details for ${course.title}`}
      >
        <div className={styles.thumbnail} aria-hidden="true">
          <video
            ref={videoRef}
            className={styles.coverVideo}
            src="/video1.mp4"
            muted
            loop
            playsInline
            preload="metadata"
          />
          {number && <span className={styles.number}>{number}</span>}
        </div>
      </Link>
      <div className={styles.content}>
        <p className={styles.badge}>{course.level}</p>
        <TitleTag className={styles.cardTitle}>{course.title}</TitleTag>
        <p className={styles.description}>{course.objective}</p>
        <Link className={styles.cardAction} href={`/courses/${course.id}`} aria-label={`Explore course: ${course.title}`}>
          <span>Explore Course</span>
          <span className={styles.arrow} aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 10h12m-5-5 5 5-5 5" />
            </svg>
          </span>
        </Link>
      </div>
    </article>
  );
}

export function Catalogue() {
  return (
    <div className={styles.shell}>
      <header className={styles.catalogueIntro}>
        <div>
          <p className={styles.eyebrow}>Rwanda Sign Language</p>
          <h1 className={styles.title}>Courses</h1>
        </div>
        <div className={styles.catalogueIntroAside}>
          <p className={styles.lead}>Find a learning pathway for your experience or the setting where you want to communicate. This catalogue previews planned courses.</p>
          <p className={styles.catalogueMeta}>
            <span aria-hidden="true" className={styles.catalogueMetaDot} />
            Six pathways <span aria-hidden="true">·</span> Enrollment unavailable
          </p>
        </div>
      </header>
      <SectionMotion>
        <ul className={styles.catalogueGrid} role="list">
          {courses.map((course, index) => (
            <li key={course.id} data-section-reveal>
              <CourseCard course={course} index={index} />
            </li>
          ))}
        </ul>
      </SectionMotion>
    </div>
  );
}

const learningFormat = [
  ["Lessons and topics", "Organized topics will introduce learning objectives, followed by demonstration, practice and review."],
  ["Accessible learning materials", "Sign-language demonstrations will be paired with captions and written explanations. Supporting resources and downloads are planned where permitted."],
  ["Assessment and progress", "The planned classroom includes quizzes and assessments with student progress tracking."],
  ["Certificates", "Certificates are planned for eligible courses after successful completion. Eligibility for this course is pending."],
  ["Availability", "Free or paid availability is pending Management configuration. Enrollment is unavailable."],
];

export function CourseDetails({ course }: { course: Course }) {
  return (
    <div className={styles.shell}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/courses">Courses</Link><span aria-hidden="true">/</span>
        <span aria-current="page">Course overview</span>
      </nav>
      <div className={styles.pageGrid}>
        <div className={styles.main}>
          <header className={styles.detailsIntro}>
            <p className={styles.eyebrow}>{course.level} · Course preview</p>
            <h1 className={styles.title}>{course.title}</h1>
            <p className={styles.lead}>{course.objective}</p>
            <Link className={styles.action} href={`/courses/${course.id}/learn`}>Preview classroom <span aria-hidden="true">↗</span></Link>
          </header>
          <section className={styles.outline} aria-labelledby="outline-heading">
            <div>
              <h2 id="outline-heading">Planned learning format</h2>
              <p>Course materials and the final syllabus are awaiting Management approval.</p>
            </div>
            <dl>
              {learningFormat.map(([title, description]) => (
                <div key={title}><dt>{title}</dt><dd>{description}</dd></div>
              ))}
            </dl>
          </section>
        </div>
        <aside className={styles.videoAside} aria-label="Course preview video">
          <div className={styles.videoCard}>
            <video
              className={styles.video}
              src="/video1.mp4"
              controls
              playsInline
              preload="metadata"
            />
            <p className={styles.videoCaption}>Course preview</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

const lessons = ["Introduction", "Video demonstration", "Review and assessment"] as const;

const answers = [
  { value: "captions", label: "Look for captions and the written explanation." },
  { value: "audio", label: "Turn up the volume for spoken instructions." },
  { value: "skip", label: "Skip the explanation and move to the next lesson." },
];

export function Classroom({ course }: { course: Course }) {
  const [step, setStep] = useState(0);
  const [visited, setVisited] = useState([0]);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const moveFocus = useRef(false);

  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    heading.current?.focus();
  }, [step]);

  function navigate(next: number) {
    if (next < 0 || next >= lessons.length || next === step) return;
    moveFocus.current = true;
    setStep(next);
    setVisited((previous) => (previous.includes(next) ? previous : [...previous, next]));
  }

  function checkAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(
      answer === "captions"
        ? "Demo result: Correct. Captions and written explanations provide information without relying on sound."
        : "Demo result: Try again. Look for an option that makes the information available without sound."
    );
  }

  return (
    <div className={styles.shell}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/courses">Courses</Link><span aria-hidden="true">/</span>
        <Link href={`/courses/${course.id}`}>Course overview</Link><span aria-hidden="true">/</span>
        <span aria-current="page">Classroom preview</span>
      </nav>
      <header className={styles.classroomIntro}>
        <p className={styles.eyebrow}>RSL-ELP classroom</p>
        <h1 className={styles.title}>Classroom preview</h1>
        <p className={styles.classroomCourse}>{course.title}</p>
        <p className={styles.lead}>Explore a sample classroom. This preview uses local state and resets on reload.</p>
      </header>
      <div className={styles.classroom}>
        <div className={styles.sidebar}>
          <nav aria-label="Preview lessons">
            <h2>Sample lessons</h2>
            <ol role="list">
              {lessons.map((lesson, index) => (
                <li key={lesson}>
                  <button type="button" aria-current={step === index ? "step" : undefined} onClick={() => navigate(index)}>
                    <span aria-hidden="true">0{index + 1}</span> {lesson}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
          <div className={styles.progress}>
            <label htmlFor="preview-progress">Simulated progress</label>
            <progress id="preview-progress" max={lessons.length} value={visited.length} />
            <p aria-live="polite">{visited.length} of {lessons.length} preview steps viewed</p>
          </div>
        </div>
        <section className={styles.lesson} aria-labelledby="preview-lesson-title">
          <p className={styles.eyebrow}>Preview step {step + 1} of {lessons.length}</p>
          <h2 id="preview-lesson-title" tabIndex={-1} ref={heading}>{lessons[step]}</h2>
          {step === 0 && (
            <p className={styles.lead}>This introduction shows where a lesson’s learning objectives and supporting text will appear. Approved objectives and activities will be added with the course materials.</p>
          )}
          {step === 1 && (
            <>
              <figure className={styles.media}>
                <div className={styles.mediaArt} aria-hidden="true" />
                <figcaption>Rwanda Sign Language video placeholder · Approved media pending</figcaption>
              </figure>
              <dl className={styles.transcript}>
                <div><dt>Captions</dt><dd>Captions will accompany the approved video.</dd></div>
                <div><dt>Written explanation</dt><dd>A written explanation will accompany the demonstration.</dd></div>
              </dl>
            </>
          )}
          {step === 2 && (
            <form onSubmit={checkAnswer} className={styles.quiz}>
              <fieldset>
                <legend>Demo question: How can you follow a lesson without relying on audio?</legend>
                {answers.map((option) => (
                  <label key={option.value}>
                    <input type="radio" name="preview-answer" value={option.value} checked={answer === option.value} required
                      onChange={() => { setAnswer(option.value); setResult(""); }} />
                    {option.label}
                  </label>
                ))}
              </fieldset>
              <button type="submit" className={styles.action}>Check demo answer</button>
              <p role="status">{result}</p>
            </form>
          )}
          <div className={styles.controls}>
            <button type="button" disabled={step === 0} onClick={() => navigate(step - 1)}>← Previous lesson</button>
            <button type="button" disabled={step === lessons.length - 1} onClick={() => navigate(step + 1)}>Next lesson →</button>
          </div>
        </section>
      </div>
    </div>
  );
}

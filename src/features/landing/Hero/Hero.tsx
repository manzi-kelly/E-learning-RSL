"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Hero.module.css";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const scope = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from("[data-eyebrow]", { y: 14, opacity: 0, duration: 0.5 })
          .from("[data-eyebrow-line]", { scaleX: 0, transformOrigin: "left center", duration: 0.5 }, "<")
          .from("[data-line]", { yPercent: 115, duration: 0.9, stagger: 0.14, ease: "power4.out" }, "-=0.25")
          .from("[data-desc]", { y: 18, opacity: 0, duration: 0.6 }, "-=0.55")
          .from("[data-action]", { y: 16, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.4")
          .from(
            "[data-frame]",
            { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "power4.inOut" },
            0.15
          )
          .from("[data-video]", { scale: 1.18, duration: 1.6, ease: "power2.out" }, 0.15)
          .from("[data-caption]", { y: 10, opacity: 0, duration: 0.5 }, "-=0.5");
      });

      // Without motion: everything is visible immediately (no from() tweens run).
      return () => mm.revert();
    },
    { scope }
  );

  // Some browsers block autoplay until the element is ready; retry once muted.
  const handleCanPlay = () => {
    const video = videoRef.current;
    if (video && video.paused) {
      video.muted = true;
      video.play().catch(() => {});
    }
  };

  return (
    <section ref={scope} id="home" tabIndex={-1} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow} data-eyebrow>
          <span className={styles.eyebrowLine} data-eyebrow-line aria-hidden="true" />
          Rwanda Sign Language E-Learning Platform
        </p>

        <h1 id="hero-title" className={styles.title}>
          <span className={styles.mask}>
            <span className={styles.line} data-line>Every sign is</span>
          </span>
          <span className={styles.mask}>
            <span className={styles.line} data-line>
              a connection<span className={styles.period}>.</span>
            </span>
          </span>
        </h1>

        <p className={styles.description} data-desc>
          Learn Rwanda Sign Language through visual lessons, explore everyday signs, and connect through
          accessible communication.
        </p>

        <div className={styles.actions}>
          <Link href="/courses" data-action>
            Explore Courses <span aria-hidden="true">↓</span>
          </Link>
          <Link href="/dictionary" data-action>
            Explore Dictionary <span aria-hidden="true">↓</span>
          </Link>
        </div>
      </div>

      <figure className={styles.media}>
        <div className={styles.frame} data-frame>
          <video
            ref={videoRef}
            className={styles.video}
            data-video
            src="/video1.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload noplaybackrate nofullscreen"
            tabIndex={-1}
            aria-hidden="true"
            onCanPlay={handleCanPlay}
          />
          <div className={styles.shade} aria-hidden="true" />
        </div>
        <figcaption className={styles.caption} data-caption>
          <span>Rwanda Sign Language</span>
          <span>Learn through visual lessons</span>
        </figcaption>
      </figure>
    </section>
  );
}
"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { isApprovedVideoId, isLocalThumbnail, type PlatformLesson } from "./platformLessonData";
import VideoPlayer from "./VideoPlayer";
import styles from "./PlatformMedia.module.css";

type ApprovedLesson = Extract<PlatformLesson, { availabilityStatus: "approved" }>;

function canPlay(lesson: PlatformLesson): lesson is ApprovedLesson {
  return lesson.availabilityStatus === "approved" && isApprovedVideoId(lesson.youtubeVideoId);
}

export default function PlatformMedia({ lessons }: { lessons: readonly PlatformLesson[] }) {
  const region = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const scrollUnlock = useRef<(() => void) | undefined>(undefined);
  const [brokenImages, setBrokenImages] = useState<string[]>([]);
  const [preview, setPreview] = useState<ApprovedLesson | null>(null);
  const [selected, setSelected] = useState<ApprovedLesson | null>(null);
  const playable = lessons.some(canPlay);

  const stopPreview = useCallback(() => {
    window.clearTimeout(hoverTimer.current);
    setPreview(null);
  }, []);

  const close = useCallback(() => {
    const panel = dialog.current;
    if (panel?.open) panel.close();
    setSelected(null);
    scrollUnlock.current?.();
    scrollUnlock.current = undefined;
    if (panel && document.fullscreenElement === panel) {
      void document.exitFullscreen().catch(() => {});
    }
    trigger.current?.focus();
    trigger.current = null;
  }, []);

  useEffect(() => {
    const element = region.current;
    const panel = dialog.current;
    if (!playable || !element) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const connection = (navigator as Navigator & {
      connection?: EventTarget & { saveData?: boolean };
    }).connection;
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) stopPreview();
    }) : undefined;
    const hide = () => {
      if (document.hidden) stopPreview();
    };
    const leave = () => {
      stopPreview();
      close();
    };

    let wasFullscreen = false;
    const syncFullscreen = () => {
      if (document.fullscreenElement === panel) wasFullscreen = true;
      else if (wasFullscreen && !document.fullscreenElement) {
        wasFullscreen = false;
        if (panel?.open) close();
      }
    };

    observer?.observe(element);
    document.addEventListener("fullscreenchange", syncFullscreen);
    motion.addEventListener("change", stopPreview);
    hover.addEventListener("change", stopPreview);
    connection?.addEventListener("change", stopPreview);
    document.addEventListener("visibilitychange", hide);
    window.addEventListener("pagehide", leave);
    return () => {
      observer?.disconnect();
      document.removeEventListener("fullscreenchange", syncFullscreen);
      window.clearTimeout(hoverTimer.current);
      motion.removeEventListener("change", stopPreview);
      hover.removeEventListener("change", stopPreview);
      connection?.removeEventListener("change", stopPreview);
      document.removeEventListener("visibilitychange", hide);
      window.removeEventListener("pagehide", leave);
      scrollUnlock.current?.();
      scrollUnlock.current = undefined;
      if (panel && document.fullscreenElement === panel) {
        void document.exitFullscreen().catch(() => {});
      }
    };
  }, [close, playable, stopPreview]);

  function schedulePreview(lesson: PlatformLesson, frame: HTMLElement, pointerType: string) {
    if (!canPlay(lesson) || pointerType !== "mouse" || dialog.current?.open) return;
    stopPreview();

    hoverTimer.current = window.setTimeout(() => {
      const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      const { top, bottom, width, height } = frame.getBoundingClientRect();
      if (
        document.hidden || connection?.saveData || top >= window.innerHeight || bottom <= 0 ||
        width < 200 || height < 200 ||
        !window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches
      ) return;
      setPreview(lesson);
    }, 300);
  }

  function watch(lesson: ApprovedLesson, source: HTMLButtonElement) {
    const panel = dialog.current;
    if (!panel || panel.open) return;
    stopPreview();
    trigger.current = source;
    panel.showModal();
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    scrollUnlock.current = () => { root.style.overflow = previousOverflow; };
    closeButton.current?.focus();
    setSelected(lesson);

    if (panel.requestFullscreen) {
      void panel.requestFullscreen().then(() => {
        if (!panel.open && document.fullscreenElement === panel) {
          return document.exitFullscreen();
        }
      }).catch(() => {});
    }
  }

  return (
    <div ref={region} className={styles.mediaList}>
      {lessons.map(lesson => {
        const thumbnail = lesson.thumbnail;
        const showImage = thumbnail && isLocalThumbnail(thumbnail.src) && !brokenImages.includes(lesson.id);
        const available = canPlay(lesson);

        return (
          <figure key={lesson.id} className={styles.lesson}>
            <div
              className={styles.thumbnail}
              onPointerEnter={event => schedulePreview(lesson, event.currentTarget, event.pointerType)}
              onPointerLeave={stopPreview}
              onPointerCancel={stopPreview}
            >
              {showImage ? (
                <Image src={thumbnail.src} alt={thumbnail.alt} fill sizes="(max-width: 767px) 90vw, (max-width: 1440px) 37vw, 560px"
                  onError={() => setBrokenImages(previous => [...previous, lesson.id])} />
              ) : (
                <div className={styles.placeholder}>
                  {available ? "Lesson thumbnail unavailable" : "Awaiting approved lesson media"}
                </div>
              )}
              {preview?.id === lesson.id && !selected && (
                <VideoPlayer videoId={preview.youtubeVideoId} title={preview.title} captionsAvailable={false} onPreviewEnd={stopPreview} />
              )}
            </div>
            <figcaption>
              <strong>{lesson.title}</strong>
              <span>{lesson.description}</span>
            </figcaption>
            {available && (
              <button type="button" className={styles.watch} onClick={event => watch(lesson, event.currentTarget)}>
                Watch Lesson<span className={styles.srOnly}>: {lesson.title}</span>
              </button>
            )}
          </figure>
        );
      })}
      {playable && (
        <dialog
          ref={dialog}
          className={styles.player}
          aria-labelledby="platform-player-title"
          onCancel={event => { event.preventDefault(); close(); }}
        >
          <div className={styles.playerInner}>
            <header className={styles.playerHeader}>
              <h4 id="platform-player-title">{selected?.title ?? "Lesson player"}</h4>
              <button ref={closeButton} type="button" onClick={close}>Close</button>
            </header>
            <div className={styles.playerContent}>
            {selected && (
              <>
                <VideoPlayer key={selected.id} videoId={selected.youtubeVideoId} title={selected.title} captionsAvailable={selected.captionsAvailable} />
                <p className={styles.captions}>{selected.captionsAvailable ? "Captions are available in the player controls." : "Captions availability has not been confirmed for this video."}</p>
              </>
            )}
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

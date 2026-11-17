"use client";

import { useEffect, useRef, useState } from "react";
import { isApprovedVideoId } from "./platformLessonData";
import { loadYouTube } from "./youtubePlayer";
import styles from "./VideoPlayer.module.css";

type Props = {
  videoId: string;
  title: string;
  captionsAvailable: boolean;
  onPreviewEnd?: () => void;
};

export default function VideoPlayer({ videoId, title, captionsAvailable, onPreviewEnd }: Props) {
  const holder = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const preview = Boolean(onPreviewEnd);

  useEffect(() => {
    const container = holder.current;
    if (!container || !isApprovedVideoId(videoId)) return;

    let disposed = false;
    let player: { pauseVideo(): void; destroy(): void } | undefined;
    let ready = false;
    let previewTimer: number | undefined;
    let previewStarted = false;
    let visibility: IntersectionObserver | undefined;
    const dispose = () => {
      if (disposed) return;
      disposed = true;
      window.clearTimeout(readyTimer);
      window.clearTimeout(previewTimer);
      visibility?.disconnect();
      if (ready) player?.pauseVideo();
      player?.destroy();
      container.replaceChildren();
    };
    const fail = () => {
      if (disposed) return;
      if (onPreviewEnd) onPreviewEnd();
      else {
        dispose();
        setStatus("unavailable");
      }
    };
    const readyTimer = window.setTimeout(fail, 15000);

    void loadYouTube().then(api => {
      if (disposed) return;

      const iframe = document.createElement("iframe");
      const embed = new URL(`https://www.youtube.com/embed/${videoId}`);
      embed.search = new URLSearchParams({
        enablejsapi: "1",
        origin: window.location.origin,
        autoplay: "0",
        playsinline: "1",
        controls: preview ? "0" : "1",
        ...(captionsAvailable && !preview ? { cc_load_policy: "1" } : {}),
      }).toString();
      iframe.src = embed.href;
      iframe.title = title;
      iframe.allow = preview ? "autoplay; encrypted-media" : "encrypted-media; picture-in-picture; fullscreen";
      iframe.allowFullscreen = !preview;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      if (preview) iframe.tabIndex = -1;
      container.append(iframe);
      if (preview && "IntersectionObserver" in window) {
        visibility = new IntersectionObserver(([entry]) => {
          if (entry.intersectionRatio <= .5) fail();
        }, { threshold: [.5, .51] });
        visibility.observe(iframe);
      }

      player = new api.Player(iframe, {
        events: {
          onReady({ target }) {
            if (disposed) return;
            ready = true;
            window.clearTimeout(readyTimer);
            if (preview) {
              const { top, right, bottom, left, width, height } = iframe.getBoundingClientRect();
              const visibleWidth = Math.max(0, Math.min(right, window.innerWidth) - Math.max(left, 0));
              const visibleHeight = Math.max(0, Math.min(bottom, window.innerHeight) - Math.max(top, 0));
              if (visibleWidth * visibleHeight <= width * height / 2) {
                fail();
                return;
              }
              target.mute();
              target.playVideo();
              previewTimer = window.setTimeout(fail, 8000);
            } else {
              setStatus("ready");
            }
          },
          onStateChange({ data }) {
            if (disposed || !onPreviewEnd) return;
            if (data === 1 && !previewStarted) {
              previewStarted = true;
              window.clearTimeout(previewTimer);
              previewTimer = window.setTimeout(onPreviewEnd, 6000);
            } else if (data === 0) {
              onPreviewEnd();
            }
          },
          onError: fail,
          onAutoplayBlocked() {
            if (preview) fail();
          },
        },
      });
    }).catch(fail);

    return dispose;
  }, [videoId, title, captionsAvailable, onPreviewEnd, preview]);

  const available = isApprovedVideoId(videoId) && status !== "unavailable";

  return (
    <>
      {available && <div ref={holder} className={preview ? styles.previewFrame : styles.frame} aria-hidden={preview || undefined} />}
      {!preview && status !== "ready" && (
        <p className={styles.status} role="status">
          {available ? "Loading video player…" : "This video is unavailable for playback here."}
        </p>
      )}
    </>
  );
}

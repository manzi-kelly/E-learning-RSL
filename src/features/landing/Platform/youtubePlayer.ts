type Player = {
  mute(): void;
  playVideo(): void;
  pauseVideo(): void;
  destroy(): void;
};

type PlayerEvent = { target: Player };

type YouTube = {
  Player: new (iframe: HTMLIFrameElement, options: {
    events: {
      onReady(event: PlayerEvent): void;
      onStateChange(event: PlayerEvent & { data: number }): void;
      onError(): void;
      onAutoplayBlocked(): void;
    };
  }) => Player;
};

type YouTubeWindow = Window & {
  YT?: YouTube;
  onYouTubeIframeAPIReady?: () => void;
};

let pending: Promise<YouTube> | undefined;

export function loadYouTube(): Promise<YouTube> {
  const host = window as YouTubeWindow;
  if (host.YT?.Player) return Promise.resolve(host.YT);
  if (pending) return pending;

  pending = new Promise<YouTube>((resolve, reject) => {
    const script = document.createElement("script");
    const previousCallback = host.onYouTubeIframeAPIReady;

    function cleanup() {
      window.clearTimeout(timeout);
      script.removeEventListener("error", fail);
      if (host.onYouTubeIframeAPIReady === ready) {
        host.onYouTubeIframeAPIReady = previousCallback;
      }
    }

    function fail() {
      cleanup();
      script.remove();
      reject(new Error("YouTube player API unavailable"));
    }

    function ready() {
      if (!host.YT?.Player) {
        fail();
        return;
      }
      cleanup();
      resolve(host.YT);
      previousCallback?.();
    }

    host.onYouTubeIframeAPIReady = ready;
    script.async = true;
    script.src = "https://www.youtube.com/iframe_api";
    script.addEventListener("error", fail, { once: true });
    const timeout = window.setTimeout(fail, 12000);
    document.head.append(script);
  }).catch(error => {
    pending = undefined;
    throw error;
  });

  return pending;
}

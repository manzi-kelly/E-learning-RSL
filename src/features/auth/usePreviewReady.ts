import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export default function usePreviewReady() {
  // Until hydration, the preview has no submit handler and must remain disabled.
  return useSyncExternalStore(subscribe, () => true, () => false);
}

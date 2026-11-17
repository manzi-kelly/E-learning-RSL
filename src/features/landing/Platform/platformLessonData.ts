type LessonMedia = {
  id: string;
  title: string;
  description: string;
  thumbnail: { src: `/${string}`; alt: string } | null;
  captionsAvailable: boolean;
} & (
  | { availabilityStatus: "awaiting-content"; youtubeVideoId: null }
  | { availabilityStatus: "approved"; youtubeVideoId: string }
);

export const platformLessons: readonly LessonMedia[] = [
  {
    id: "visual-lesson",
    title: "Visual lesson preview",
    description: "Approved lesson video and thumbnail are pending.",
    thumbnail: null,
    youtubeVideoId: null,
    captionsAvailable: false,
    availabilityStatus: "awaiting-content",
  },
];

export type PlatformLesson = LessonMedia;

export function isApprovedVideoId(id: string): boolean {
  return /^[A-Za-z0-9_-]{11}$/.test(id) && platformLessons.some(
    lesson => lesson.availabilityStatus === "approved" && lesson.youtubeVideoId === id,
  );
}

export function isLocalThumbnail(src: string): boolean {
  return /^\/(?:[\w-]+\/)*[\w.-]+\.(?:avif|jpe?g|png|webp)$/i.test(src);
}

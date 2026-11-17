export type ArticleCategory = "Education" | "Platform Updates" | "Community";

export type PublishedArticle = {
  title: string;
  category: ArticleCategory;
  excerpt: string;
  publicationStatus: "Published";
  href: `/blog/${string}`;
  author?: string;
  publicationDate?: { iso: string; label: string };
  cover?: { src: `/${string}`; alt: string; width: number; height: number };
};

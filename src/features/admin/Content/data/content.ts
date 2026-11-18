export type ContentDraft = {
  id: string; title: string; type: "Blog post" | "News" | "Announcement";
  status: "Draft preview"; body: string;
};

export const drafts: readonly ContentDraft[] = [
  { id: "demo-blog", title: "Sample blog draft", type: "Blog post", status: "Draft preview", body: "Sample text for testing the article editor." },
  { id: "demo-news", title: "Sample news draft", type: "News", status: "Draft preview", body: "Sample text for testing the news editor." },
  { id: "demo-announcement", title: "Sample announcement draft", type: "Announcement", status: "Draft preview", body: "Sample text for testing the announcement editor." },
];

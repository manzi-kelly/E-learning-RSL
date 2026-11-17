import { notFound } from "next/navigation";
import { entries, findEntry } from "@/src/features/dictionary/data/dictionaryData";
import EntryDetails from "@/src/features/dictionary/EntryDetails/EntryDetails";

export function generateStaticParams() {
  return entries.map(({ id }) => ({ entryId: id }));
}

export async function generateMetadata({ params }: PageProps<"/dictionary/[entryId]">) {
  const entry = findEntry((await params).entryId);
  if (!entry) notFound();
  return { title: `${entry.word} · Dictionary preview | RSL-ELP` };
}

export default async function Page({ params }: PageProps<"/dictionary/[entryId]">) {
  const entry = findEntry((await params).entryId);
  if (!entry) notFound();

  const related = entry.relatedIds.flatMap(id => {
    const match = findEntry(id);
    return match ? [match] : [];
  });

  return <EntryDetails entry={entry} related={related} />;
}

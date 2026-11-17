import Image from "next/image";
import Link from "next/link";
import type { PublishedArticle } from "../types/article";
import styles from "./ArticleList.module.css";

export default function ArticleList({ articles }: { articles: readonly PublishedArticle[] }) {
  return (
    <section className={styles.library} aria-labelledby="published-articles">
      <h2 id="published-articles">Published articles</h2>
      {articles.length === 0 ? (
        <p className={styles.empty}>No articles have been published yet. Updates will appear here when approved by RSL-ELP Management.</p>
      ) : (
        <ul className={styles.rows} role="list">
          {articles.map(article => (
            <li key={article.href}>
              <article className={styles.article}>
                <div>
                  <p className={styles.category}>{article.category} · {article.publicationStatus}</p>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  {(article.author || article.publicationDate) && (
                    <p className={styles.byline}>
                      {article.author && <span>{article.author}</span>}
                      {article.publicationDate && <time dateTime={article.publicationDate.iso}>{article.publicationDate.label}</time>}
                    </p>
                  )}
                  <Link href={article.href} aria-label={`Read article: ${article.title}`}>Read Article <span aria-hidden="true">↗</span></Link>
                </div>
                {article.cover && <Image src={article.cover.src} alt={article.cover.alt} width={article.cover.width} height={article.cover.height} sizes="(max-width: 767px) 90vw, 30vw" />}
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

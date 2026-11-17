import ArticleList from "../ArticleList/ArticleList";
import { provisionalCategories, publishedArticles } from "../data/articlesData";
import styles from "./BlogPage.module.css";

export default function BlogPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div className={styles.inner}>
          <h1>Blog <em>&amp; News</em></h1>
          <p>Educational articles, platform news, and community updates will appear here once approved by RSL-ELP Management.</p>
        </div>
      </header>
      <div className={`${styles.inner} ${styles.content}`}>
        <section className={styles.topics} aria-labelledby="blog-topics">
          <h2 id="blog-topics">Provisional categories</h2>
          <div>
            <ul role="list">
              {provisionalCategories.map(category => <li key={category}>{category}</li>)}
            </ul>
            <p>Categories are pending Management confirmation.</p>
          </div>
        </section>
        <ArticleList articles={publishedArticles} />
      </div>
    </div>
  );
}

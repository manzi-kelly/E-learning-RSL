"use client";

import { usePreviewForm } from "../usePreviewForm";
import form from "../PreviewForm.module.css";
import styles from "./MaterialsManager.module.css";

export default function MaterialsManager() {
  const preview = usePreviewForm("Material references checked. No files have been uploaded or published.");

  return (
    <section id="course-materials" tabIndex={-1} className={form.section} aria-labelledby="course-materials-title">
      <h2 id="course-materials-title">Materials</h2>
      <p>Preview metadata for approved files. Use sample reference text. File uploads and publication are unavailable.</p>
      <form className={form.form} onSubmit={preview.submit} onChange={preview.change} noValidate>
        <div className={form.fields}>
          <div>
            <label htmlFor="material-video">Sign-language demonstration video reference</label>
            <input id="material-video" maxLength={180} />
          </div>
          <div>
            <label htmlFor="material-captions">Caption availability</label>
            <select id="material-captions">
              <option value="">Awaiting confirmation</option>
              <option value="available">Available (sample)</option><option value="unavailable">Unavailable (sample)</option>
            </select>
          </div>
          <div className={form.wide}>
            <label htmlFor="material-written">Written lesson material reference</label>
            <input id="material-written" maxLength={180} />
          </div>
          <div className={form.wide}>
            <label htmlFor="material-download">Downloadable file reference</label>
            <input id="material-download" maxLength={180} aria-describedby="material-download-note" />
            <p id="material-download-note" className={styles.note}>Downloads require permission to publish.</p>
          </div>
        </div>
        <button type="submit" disabled={!preview.ready}>Check material references</button>
        <p role="status" className={form.feedback}>{preview.feedback}</p>
      </form>
    </section>
  );
}

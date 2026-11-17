"use client";

import { useState } from "react";
import { availabilityLabels, resources } from "../data/resourcesData";
import ResourceFilters from "../ResourceFilters/ResourceFilters";
import type { ResourceFormat } from "../types/resource";
import styles from "./ResourceLibrary.module.css";

export default function ResourceLibrary() {
  const [query, setQuery] = useState("");
  const [format, setFormat] = useState<ResourceFormat | "All">("All");
  const term = query.trim().toLowerCase();
  const matching = resources.filter(resource =>
    (format === "All" || resource.format === format) &&
    [resource.title, resource.description, resource.format].some(value => value.toLowerCase().includes(term)),
  );

  return (
    <section className={styles.library} aria-labelledby="resource-library">
      <h2 id="resource-library">Resource library</h2>
      <ResourceFilters query={query} onQueryChange={setQuery} format={format} onFormatChange={setFormat} />
      <p role="status" aria-atomic="true" className={styles.count}>
        {matching.length ? `${matching.length} planned ${matching.length === 1 ? "resource" : "resources"}` : "No matching resources. Try another search or choose a different format."}
      </p>
      {matching.length > 0 && (
        <ul role="list" className={styles.rows}>
          {matching.map(resource => (
            <li key={resource.id} className={styles.row}>
              <div>
                <p className={styles.format}>{resource.format}</p>
                <h3>{resource.title}</h3>
              </div>
              <div>
                <p>{resource.description}</p>
                <p className={styles.availability}>{availabilityLabels[resource.availability]}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

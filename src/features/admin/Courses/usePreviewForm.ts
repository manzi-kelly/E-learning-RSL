"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";

const subscribe = () => () => {};

type ValidatableField = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export function usePreviewForm(message: string) {
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  const [feedback, setFeedback] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = Array.from(event.currentTarget.querySelectorAll<ValidatableField>("input[required], textarea[required], select[required]"));
    const empty = fields.find(field => !field.value.trim());
    if (empty) {
      empty.setCustomValidity(empty instanceof HTMLSelectElement ? "Choose an option." : "Enter text other than whitespace.");
      empty.reportValidity();
      setFeedback("Check the highlighted field.");
      return;
    }
    setFeedback(message);
  }

  function change(event: FormEvent<HTMLFormElement>) {
    const field = event.target;
    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) field.setCustomValidity("");
    setFeedback("");
  }

  return { ready, feedback, submit, change };
}

import type { SrsSection } from "./types";

export const mapTemplateToSections = (template: any): SrsSection[] => {
  return template.sections.map((section: any, index: number) => ({
    id: `${index + 1}`,
    title: section.title,
    content: "",
  }));
};

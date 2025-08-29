import * as pdfjsLib from "pdfjs-dist";
import { mapSections } from "./sectionMapper";

// Set up the worker to avoid issues with Create React App or Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Parses a PDF file to dynamically extract its table of contents (outline).
 * @param {File | string} file - The PDF file object or a URL to the PDF.
 * @returns {Promise<Array<{title: string, page: number}>>} A promise that resolves to an array of section objects.
 */
export const parsePdfToc = async (file) => {
  try {
    // Create a URL for the file object if it's not already a string path
    const fileUrl = file instanceof File ? URL.createObjectURL(file) : file;
    const loadingTask = pdfjsLib.getDocument(fileUrl);
    const pdf = await loadingTask.promise;
    const outline = await pdf.getOutline();

    if (!outline) {
      console.warn("No table of contents found in PDF");
      return [];
    }

    return await mapSections(pdf, outline);
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw error;
  }
};

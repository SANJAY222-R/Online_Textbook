/**
 * Maps a PDF's outline (table of contents) to a flat array of sections with page numbers.
 * @param {import('pdfjs-dist/types/src/display/api').PDFDocumentProxy} pdf - The loaded PDF document instance from pdf.js.
 * @param {Array<Object>} outline - The raw outline array from pdf.getOutline().
 * @returns {Promise<Array<{title: string, page: number}>>} A promise that resolves to the formatted table of contents.
 */
export const mapSections = async (pdf, outline) => {
  const toc = [];

  // This recursive function processes each level of the outline
  const processItems = async (items) => {
    for (const item of items) {
      // The 'dest' property is what links a section title to a page in the PDF.
      if (item.dest) {
        // We need to get the destination reference from the PDF document
        const dest = typeof item.dest === 'string' ? await pdf.getDestination(item.dest) : item.dest;
        
        if (dest) {
          // The destination reference points to an internal page index.
          const pageIndex = await pdf.getPageIndex(dest[0]);
          toc.push({
            title: item.title,
            page: pageIndex + 1, // PDF page indices are 0-based, so we add 1.
          });
        }
      }
      
      // If a section has sub-sections (item.items), process them recursively.
      if (item.items && item.items.length > 0) {
        await processItems(item.items);
      }
    }
  };

  await processItems(outline);
  return toc;
};
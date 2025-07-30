/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: one cell, should span all columns implicitly.
  const headerRow = ['Columns (columns29)'];

  // Find the two columns (image and text)
  const children = element.querySelectorAll(':scope > div');

  let imageCell = null;
  let textCellContent = [];

  // Locate image cell
  const imageWrapper = Array.from(children).find((child) => child.classList.contains('fifty-fifty-wrapping-image'));
  if (imageWrapper) {
    imageCell = imageWrapper.querySelector('img.custom-desktop-only') || imageWrapper.querySelector('img');
  }

  // Locate text cell and gather all content
  const textWrapper = Array.from(children).find((child) => child.classList.contains('fifty-fifty-wrapping-text'));
  if (textWrapper) {
    // Append all non-empty direct children (to keep headings, paragraphs, links, etc)
    textCellContent = Array.from(textWrapper.childNodes).filter(
      (node) => node.nodeType === Node.ELEMENT_NODE && node.innerHTML.trim()
    );
  }

  // Build the cells array: header row (1 cell), then content row (2 cells)
  const cells = [
    headerRow,
    [imageCell, textCellContent]
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

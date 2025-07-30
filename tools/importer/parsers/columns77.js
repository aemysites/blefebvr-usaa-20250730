/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid row containing columns
  const gridRow = element.querySelector('.feature-spotlight__columns');
  if (!gridRow) return;
  const colEls = Array.from(gridRow.children);

  // Left column: image column
  let imageCell = '';
  const imageCol = colEls.find(col => col.classList.contains('feature-spotlight__image-column'));
  if (imageCol) {
    const img = imageCol.querySelector('img');
    if (img) imageCell = img;
  }

  // Right column: content column
  let textCell = [];
  const textCol = colEls.find(col => !col.classList.contains('feature-spotlight__image-column'));
  if (textCol) {
    const children = Array.from(textCol.children);
    children.forEach(child => {
      if (child.textContent.trim() || child.querySelector('a, ul, ol')) {
        textCell.push(child);
      }
    });
  }

  // Header row must have as many columns as the content row (to match example)
  const headerRow = ['Columns (columns77)', ''];
  const columnsRow = [textCell, imageCell];
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

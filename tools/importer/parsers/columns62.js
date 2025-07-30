/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two columns in the original block
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Identify image and text wrappers
  let imgCol = null, textCol = null;
  for (const col of children) {
    if (col.classList.contains('fifty-fifty-wrapping-image')) {
      imgCol = col;
    } else if (col.classList.contains('fifty-fifty-wrapping-text')) {
      textCol = col;
    }
  }

  // IMAGE COLUMN: Prefer desktop image, fallback to any image
  let image = null;
  if (imgCol) {
    image = imgCol.querySelector('img.desktop-only') || imgCol.querySelector('img');
  }

  // TEXT COLUMN: Collect heading, list, and button in order
  const textParts = [];
  if (textCol) {
    const h2 = textCol.querySelector('h2');
    if (h2) textParts.push(h2);
    const ul = textCol.querySelector('ul');
    if (ul) textParts.push(ul);
    const cta = textCol.querySelector('a');
    if (cta) textParts.push(cta);
  }

  // Build the table: header, then one row with two columns
  const headerRow = ['Columns (columns62)'];
  const contentRow = [image, textParts];
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

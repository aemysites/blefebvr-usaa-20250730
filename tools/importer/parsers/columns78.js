/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid row that contains the two columns
  const gridRow = element.querySelector('.feature-spotlight__columns');
  if (!gridRow) return;

  // Get the two columns (image and content)
  const columns = gridRow.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // Column 1: image (visually right), Column 2: content (visually left)
  const imageCol = columns[0];
  const contentCol = columns[1];

  // --- IMAGE COLUMN ---
  // Attempt to get the main visible <img>
  let img = null;
  // Prefer the largest image if multiple <img> present
  const allImgs = imageCol.querySelectorAll('img');
  if (allImgs.length > 0) {
    // Find the one with the largest width/height if possible, else first
    img = allImgs[0];
    let maxSize = 0;
    allImgs.forEach(i => {
      // Try to use naturalWidth * naturalHeight if loaded, else fallback to width attribute
      const size = (i.naturalWidth || i.width || 0) * (i.naturalHeight || i.height || 0);
      if (size > maxSize) {
        img = i;
        maxSize = size;
      }
    });
  }

  // --- CONTENT COLUMN ---
  // Collect all element children (not text nodes)
  const contentEls = [];
  contentCol.childNodes.forEach((node) => {
    if (node.nodeType === 1) {
      contentEls.push(node);
    }
  });

  // Header row has exactly one cell, per requirements
  const headerRow = ['Columns (columns78)'];
  // Data row contains both columns (content and image)
  const dataRow = [contentEls, img].map(col => col ? col : '');

  // Create the table where the header row only has ONE cell (spanning columns visually)
  const table = WebImporter.DOMUtils.createTable([
    headerRow, // Only one cell in header row
    dataRow    // Two cells in data row
  ], document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children columns from columns wrapper
  function getColumns(el) {
    const columnsWrap = el.querySelector('.feature-spotlight__columns');
    if (!columnsWrap) return [null, null];
    // Find the two grid columns
    const cols = Array.from(columnsWrap.children).filter(c => c.matches('[class*="rds-layout__grid-column"]'));
    if (cols.length === 2) {
      // Left can be image or text, but we distinguish by checking for image inside
      const hasImg0 = !!cols[0].querySelector('img');
      const hasImg1 = !!cols[1].querySelector('img');
      if (hasImg0 && !hasImg1) return [cols[1], cols[0]]; // [textCol, imageCol]
      if (!hasImg0 && hasImg1) return [cols[0], cols[1]]; // [textCol, imageCol]
      // fallback: likely [textCol, imageCol]
      return [cols[0], cols[1]];
    }
    return [cols[0] || null, cols[1] || null];
  }
  
  // Find the .feature-spotlight block within the section
  const spotlight = element.querySelector('.feature-spotlight');
  if (!spotlight) return;

  // Get [textCol, imageCol]
  const [textCol, imageCol] = getColumns(spotlight);
  if (!textCol || !imageCol) return;

  // TEXT COLUMN: collect all structured content
  let textContent = [];
  // Get heading (h1-h6)
  const headline = textCol.querySelector('h1, h2, h3, h4, h5, h6');
  if (headline) textContent.push(headline);
  // Get all paragraph containers (to handle all HTML variations)
  const paraContainers = textCol.querySelectorAll('[class*="paragraph"]');
  paraContainers.forEach(pc => textContent.push(pc));
  // Links/buttons (may be outside paraContainers)
  const buttonGroups = textCol.querySelectorAll('[class*="button__group"]');
  buttonGroups.forEach(bg => {
    // Only add actual <a> elements, not SVGs, so iterate all children
    bg.querySelectorAll('a').forEach(a => textContent.push(a));
  });
  // Fallback if nothing found
  if (textContent.length === 0) {
    textContent = Array.from(textCol.children);
  }

  // IMAGE COLUMN: use existing <img> if present
  let imgCell = '';
  const img = imageCol.querySelector('img');
  if (img) imgCell = img;

  // If image is missing, keep cell empty. Do not create new elements.

  // Build the table
  // Fix: The header row must be a single cell, even though content row has two columns.
  const headerRow = ['Columns (columns9)'];
  const contentRow = [textContent, imgCell];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}

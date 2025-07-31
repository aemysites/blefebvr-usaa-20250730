/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match the block name and variant exactly
  const headerRow = ['Columns (columns14)'];

  // Get the immediate children of the main div
  const children = Array.from(element.children);
  // The layout is .fifty-fifty-wrapping-image and .fifty-fifty-wrapping-text (order may change for reverse)
  let imageCol = children.find(e => e.classList.contains('fifty-fifty-wrapping-image'));
  let textCol = children.find(e => e.classList.contains('fifty-fifty-wrapping-text'));

  // Defensive fallback
  if (!imageCol && !textCol) {
    // nothing to do
    return;
  }

  // For the image column: prefer desktop-only image if present
  let imageEl = null;
  if (imageCol) {
    const images = Array.from(imageCol.querySelectorAll('img'));
    imageEl = images.find(img => img.classList.contains('desktop-only')) || images[0] || null;
  }

  // For the text column: collect all child elements (h2, ul, a)
  let textContent = [];
  if (textCol) {
    textContent = Array.from(textCol.childNodes).filter(node => {
      // Keep elements and non-empty text nodes
      return node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim());
    });
  }

  // Build the columns row: left text, right image (match layout in screenshot)
  const row = [textContent, imageEl ? [imageEl] : ['']];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  element.replaceWith(table);
}

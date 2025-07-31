/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate child divs
  const children = element.querySelectorAll(':scope > div');
  let imageDiv = null;
  let textDiv = null;
  for (const child of children) {
    if (child.classList.contains('fifty-fifty-wrapping-image')) {
      imageDiv = child;
    } else if (child.classList.contains('fifty-fifty-wrapping-text')) {
      textDiv = child;
    }
  }
  // Extract the desktop image, fallback to any available image
  let mainImg = null;
  if (imageDiv) {
    mainImg = imageDiv.querySelector('img.fifty-fifty-image.desktop-only') || imageDiv.querySelector('img.fifty-fifty-image');
  }
  // Extract all content from the text column, preserving order and semantics
  let textContent = [];
  if (textDiv) {
    textContent = Array.from(textDiv.children);
  }
  // Ensure we always have 2 columns as per example structure
  const headerRow = ['Columns (columns69)'];
  const contentRow = [mainImg, textContent];
  const cells = [headerRow, contentRow];
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns wrapper .fifty-fifty (inside section)
  const columns = element.querySelector('.fifty-fifty');
  if (!columns) return;

  // Get direct children = [imageWrapper, textWrapper] but their order may change due to 'reverse' class
  const wrappers = columns.querySelectorAll(':scope > div');
  let imageWrapper = null;
  let textWrapper = null;

  // Both wrappers must exist for a valid columns block
  if (wrappers.length === 2) {
    // The image wrapper has img(s), the text wrapper has heading/text/button
    if (wrappers[0].querySelector('img')) {
      imageWrapper = wrappers[0];
      textWrapper = wrappers[1];
    } else {
      textWrapper = wrappers[0];
      imageWrapper = wrappers[1];
    }
  }
  if (!imageWrapper || !textWrapper) return;

  // For left/text column: use textWrapper as-is, referencing the original element
  // For right/image column: use only the preferred <img> element
  // Per convention, prefer .custom-desktop-only then .custom-mobile-only
  let img = imageWrapper.querySelector('img.custom-desktop-only') || imageWrapper.querySelector('img.custom-mobile-only') || imageWrapper.querySelector('img');
  // if no img found, fallback to entire imageWrapper
  const imageCell = img || imageWrapper;

  // Compose the table
  const cells = [
    ['Columns (columns44)'],
    [textWrapper, imageCell]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the direct child .fifty-fifty block
  const mainBlock = element.querySelector('.fifty-fifty');
  if (!mainBlock) return;

  // Find all immediate children of .fifty-fifty (should be image and text wrappers)
  const wrappers = mainBlock.querySelectorAll(':scope > div');
  if (wrappers.length < 2) return;

  // First column: image(s) - pick desktop if present, fallback to first image
  const imageWrapper = wrappers[0];
  let img = imageWrapper.querySelector('img.custom-desktop-only');
  if (!img) {
    img = imageWrapper.querySelector('img');
  }
  // If no image found, fallback to the wrapper itself (in case of odd markup)
  const firstColumn = img ? img : imageWrapper;

  // Second column: text wrapper (contains heading and paragraphs)
  const textWrapper = wrappers[1];

  // Compose table cells as per the block guidelines
  const cells = [
    ['Columns (columns9)'],
    [firstColumn, textWrapper]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns container
  const wrapper = element.querySelector('.fifty-fifty');
  if (!wrapper) return;

  // Get the two direct children: image and text wrappers
  const children = Array.from(wrapper.children);
  if (children.length < 2) return;

  const imageCol = children[0];
  const textCol = children[1];

  // Find the desktop image inside the image wrapper (prefer desktop, fallback to first img)
  let img = imageCol.querySelector('.custom-desktop-only');
  if (!img) {
    img = imageCol.querySelector('img');
  }

  // Reference the ACTUAL text column element (not cloning or creating new)
  // For robustness, if .fifty-fifty-wrapping-text exists, use it, else the whole textCol
  let textContent = textCol.querySelector('.fifty-fifty-wrapping-text');
  if (!textContent) {
    textContent = textCol;
  }

  // If the image or text is missing, fall back to empty cell to avoid breaking table
  const cells = [
    ['Columns (columns4)'],
    [img || '', textContent || '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

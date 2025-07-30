/* global WebImporter */
export default function parse(element, { document }) {
  // The block header must match the specified block name
  const headerRow = ['Columns (columns71)'];

  // Get the two main columns: left (content), right (cta)
  // Try to find by class for robustness
  let leftCol = element.querySelector(':scope > .callout-content');
  let rightCol = element.querySelector(':scope > .callout-cta');

  // Fallback: if any is missing, assign by order
  if (!leftCol || !rightCol) {
    const children = element.querySelectorAll(':scope > *');
    leftCol = leftCol || children[0];
    rightCol = rightCol || children[1];
  }

  // Only include a column if it exists, but always create 2 columns as per the block's structure
  // If a column is missing, leave cell empty
  const row = [leftCol || '', rightCol || ''];

  const rows = [
    headerRow,
    row
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

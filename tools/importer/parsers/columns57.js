/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct child ULs
  const uls = element.querySelectorAll(':scope > ul');
  if (uls.length === 0) return;

  // The block header must exactly match the block name variant
  const headerRow = ['Columns (columns57)'];

  // Each UL becomes a column cell
  const contentRow = Array.from(uls);

  // Compose the table
  const cells = [
    headerRow,
    contentRow
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

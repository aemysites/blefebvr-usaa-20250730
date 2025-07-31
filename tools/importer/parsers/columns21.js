/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per requirements
  const headerRow = ['Columns (columns21)'];

  // Find all .fifty-fifty blocks (each will be a row in the columns block)
  const sections = element.querySelectorAll('.fifty-fifty');
  const rows = [];

  // For each .fifty-fifty block
  sections.forEach((section) => {
    // Each .fifty-fifty block has two direct children: one is image wrapper, one is text wrapper
    const children = section.querySelectorAll(':scope > div');
    // There should always be 2 children, but handle defensively
    if (children.length === 2) {
      // Figure out which child is the image and which is the text
      const imageDiv = children[0].querySelector('img') ? children[0] : children[1];
      const textDiv  = children[0].querySelector('img') ? children[1] : children[0];
      // Row order is: text cell, image cell (to match original screenshot/markdown structure)
      rows.push([textDiv, imageDiv]);
    } else if (children.length === 1) {
      // One column only (edge case)
      rows.push([children[0]]);
    }
  });

  // Combine header and rows
  const tableData = [headerRow, ...rows];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

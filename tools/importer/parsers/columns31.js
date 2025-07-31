/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate columns within this row
  const colDivs = element.querySelectorAll(':scope > .usaa-aem-feature-item');

  // For each column, collect the heading and the list for that column
  const columns = [];
  colDivs.forEach((colDiv) => {
    const textSection = colDiv.querySelector('.aem-feature-collection__text');
    const cellContent = [];
    if (textSection) {
      // Heading
      const heading = textSection.querySelector('h3');
      if (heading) cellContent.push(heading);
      // List (inside a div)
      const paraDiv = textSection.querySelector('div');
      if (paraDiv) {
        Array.from(paraDiv.childNodes).forEach(node => {
          if (node.nodeType === 1) cellContent.push(node); // element
        });
      }
      if (cellContent.length === 0) cellContent.push(textSection);
    } else {
      cellContent.push(colDiv);
    }
    columns.push(cellContent);
  });

  // Header row: a single cell array, per requirements
  const headerRow = ['Columns (columns31)'];
  
  // Compose the table input as an array of arrays
  const tableRows = [headerRow, columns];
  
  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  
  // Replace original element
  element.replaceWith(table);
}

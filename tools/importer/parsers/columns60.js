/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell (one array entry) per requirements
  const headerRow = ['Columns (columns60)'];

  // Find the grid row containing the two columns
  const gridRow = element.querySelector('.rds-layout__grid-row');
  if (!gridRow) return;

  // Find columns (left and right)
  const columns = gridRow.querySelectorAll(':scope > [class*="rds-layout__grid-column"]');
  if (columns.length < 2) return;

  // Left column: h1 or all content
  const leftCol = columns[0];
  let leftCell;
  const h1 = leftCol.querySelector('h1');
  if (h1) {
    leftCell = h1;
  } else {
    leftCell = Array.from(leftCol.childNodes);
  }

  // Right column: collect the product sections
  const rightCol = columns[1];
  // Each block is a div with children h3+p
  const productDivs = Array.from(rightCol.children).filter(div => div.querySelector && div.querySelector('h3'));
  const rightCellContent = [];
  productDivs.forEach(div => {
    Array.from(div.childNodes).forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        rightCellContent.push(node);
      }
    });
  });

  // Create table with header row as a single cell, second row with two columns
  const cells = [
    headerRow,
    [leftCell, rightCellContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

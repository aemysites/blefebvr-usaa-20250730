/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid row, which contains the two columns
  const gridRow = element.querySelector('.aem-text-block.rds-layout__grid-row');
  if (!gridRow) return;

  // Get the two column divs - must have at least two for 'columns2'
  const columns = gridRow.querySelectorAll(':scope > .rds-layout__grid-column-md-6');
  if (columns.length < 2) return;

  // First column: likely contains a heading
  // Look for a direct heading in the first column, otherwise use the column itself
  let leftContent = columns[0].querySelector('h1, h2, h3, h4, h5, h6');
  if (!leftContent) leftContent = columns[0];
  
  // Second column: likely contains paragraph(s). Use the text block if found, else the column itself
  let rightContent = columns[1].querySelector('.text-block-custom');
  if (!rightContent) rightContent = columns[1];

  // Compose the table structure
  const cells = [
    ['Columns (columns2)'],
    [leftContent, rightContent],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}

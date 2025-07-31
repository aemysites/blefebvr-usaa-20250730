/* global WebImporter */
export default function parse(element, { document }) {
  // Find the section containing the columns content
  const calloutSection = element.querySelector('section.callout-block');
  if (!calloutSection) return;

  // The grid structure: left: text, right: image/content
  const leftCol = calloutSection.querySelector('.icon-content');
  const rightCol = calloutSection.querySelector('.callout-block-icon');

  let numColumns = 1;
  let columns = [];
  if (leftCol && rightCol) {
    numColumns = 2;
    columns = [leftCol, rightCol];
  } else if (leftCol) {
    columns = [leftCol];
  } else if (rightCol) {
    columns = [rightCol];
  } else {
    columns = [calloutSection];
  }

  // Create header row with single cell
  const headerRow = ['Columns (columns15)'];
  const rows = [headerRow, columns];

  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Set colspan on header row to match number of columns if more than one
  if (numColumns > 1) {
    const th = table.querySelector('tr:first-child th');
    if (th) {
      th.setAttribute('colspan', numColumns);
    }
  }

  element.replaceWith(table);
}

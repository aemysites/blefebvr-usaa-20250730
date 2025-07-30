/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell array with the block name
  const headerRow = ['Columns (columns42)'];

  // Find all direct column containers (the grid columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its main content (the first child <div> that contains the actual content)
  const contentCells = columnDivs.map(colDiv => {
    // Find the first child div that has meaningful content
    const candidateDivs = Array.from(colDiv.children).filter(child => child.tagName === 'DIV');
    let mainContentDiv = candidateDivs.find(div => div.querySelector('img, h1, h2, h3, h4, h5, h6, p'));
    if (!mainContentDiv) {
      // fallback: maybe the column's first child is the content
      mainContentDiv = colDiv.firstElementChild;
    }
    // Defensive: fallback to colDiv itself if no child divs
    if (!mainContentDiv) mainContentDiv = colDiv;
    return mainContentDiv;
  });

  // The content row is a single array of content columns
  const contentRow = contentCells;

  // Compose the table rows: header with one cell, content row with n columns
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

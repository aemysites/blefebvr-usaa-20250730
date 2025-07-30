/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid row that contains the two columns
  const gridRow = element.querySelector('.rds-layout__grid-row');
  if (!gridRow) return;

  // Get the two main columns
  const columns = gridRow.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // First column: header (h1)
  const col1 = columns[0];
  let header = col1.querySelector('h1');
  if (!header) {
    // Fallback: use all content if no h1 exists
    header = col1;
  }

  // Second column: the list of coverage items
  const col2 = columns[1];
  // We'll grab all direct children (the product blocks)
  const coverageBlocks = [];
  const col2Children = col2.querySelectorAll(':scope > div');
  col2Children.forEach((child) => {
    if (child.querySelector('h3')) {
      coverageBlocks.push(child);
    }
  });

  // Instead of putting the array of divs, wrap them in a container div
  let rightColContent;
  if (coverageBlocks.length) {
    const wrapper = document.createElement('div');
    coverageBlocks.forEach(block => wrapper.appendChild(block));
    rightColContent = wrapper;
  } else {
    rightColContent = col2;
  }

  // Compose the cells for the columns block
  const headerRow = ['Columns (columns54)'];
  const contentRow = [header, rightColContent];
  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

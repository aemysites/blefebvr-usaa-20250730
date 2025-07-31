/* global WebImporter */
export default function parse(element, { document }) {
  // Get all columns: each ul is a column
  const columns = Array.from(element.querySelectorAll(':scope > ul.link-list'));

  // Build each column's fragment
  const columnCells = columns.map((ul) => {
    const frag = document.createDocumentFragment();
    const lis = Array.from(ul.children);
    if (lis.length > 0) {
      const headingLi = lis[0];
      let heading;
      if (headingLi.classList.contains('h6')) {
        heading = document.createElement('strong');
        heading.textContent = headingLi.textContent;
      } else {
        heading = headingLi;
      }
      frag.appendChild(heading);
    }
    for (let i = 1; i < lis.length; i++) {
      frag.appendChild(document.createElement('br'));
      const link = lis[i].querySelector('a');
      if (link) frag.appendChild(link);
    }
    return frag;
  });

  // The header row should be a single cell (just like the markdown example)
  const headerRow = ['Columns (columns26)'];

  const cells = [
    headerRow,
    columnCells
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

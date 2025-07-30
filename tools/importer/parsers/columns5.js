/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid row containing columns
  const gridRow = element.querySelector('.rds-layout__grid-row');
  if (!gridRow) return;

  // Get all direct children of the grid row that represent columns
  const columns = Array.from(gridRow.children).filter(col => col.classList.contains('rds-layout__grid-column-12'));
  if (columns.length < 2) return;

  // For the left column: collect heading and paragraph
  const leftCol = columns[0];
  const leftContent = Array.from(leftCol.childNodes).filter(
    n => n.nodeType !== Node.COMMENT_NODE && !(n.nodeType === Node.TEXT_NODE && n.textContent.trim() === '')
  );

  // For the right column: check for image; if no image, use all content
  const rightCol = columns[1];
  let rightContent;
  const img = rightCol.querySelector('img');
  if (img) {
    rightContent = img;
  } else {
    // If there is meaningful content, include it; otherwise, replace with an empty string
    const rcNodes = Array.from(rightCol.childNodes).filter(
      n => n.nodeType !== Node.COMMENT_NODE && !(n.nodeType === Node.TEXT_NODE && n.textContent.trim() === '')
    );
    // If empty or just an empty placeholder div, use empty string
    if (rcNodes.length === 1 && rcNodes[0].tagName && rcNodes[0].tagName.toLowerCase() === 'div' && rcNodes[0].textContent.trim() === '') {
      rightContent = '';
    } else if (rcNodes.length) {
      rightContent = rcNodes.length === 1 ? rcNodes[0] : rcNodes;
    } else {
      rightContent = '';
    }
  }

  const rows = [
    ['Columns (columns5)'],
    [leftContent, rightContent]
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

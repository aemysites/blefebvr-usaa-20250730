/* global WebImporter */
export default function parse(element, { document }) {
  // Set header row: single cell, matching the required format
  const headerRow = ['Columns (columns56)'];

  // Get icon image (first child of .callout-icon)
  const iconDiv = element.querySelector('.callout-icon');
  let iconImg = '';
  if (iconDiv && iconDiv.firstElementChild) {
    iconImg = iconDiv.firstElementChild;
  }

  // Compose content: get all elements in .callout-content as an array
  const contentDiv = element.querySelector('.callout-content');
  let contentCell = '';
  if (contentDiv) {
    // Collect all children of .callout-content into an array for the cell
    const contentArray = Array.from(contentDiv.childNodes).filter(node => {
      // Accept element nodes and significant text nodes
      return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim() !== '');
    });
    contentCell = contentArray.length > 1 ? contentArray : contentArray[0] || '';
  }

  // Table has two rows: header (1 cell), columns (2 cells)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [iconImg, contentCell]
  ], document);

  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we have the main two columns:
  // .fifty-fifty-wrapping-image and .fifty-fifty-wrapping-text
  const imageWrapper = element.querySelector('.fifty-fifty-wrapping-image');
  const textWrapper = element.querySelector('.fifty-fifty-wrapping-text');

  // Prepare first column: structured text content
  let firstColContent = [];
  if (textWrapper) {
    // We'll collect each child element (h3, p, div)
    textWrapper.childNodes.forEach((node) => {
      // Only add elements (skip empty whitespace text nodes)
      if (node.nodeType === 1) {
        firstColContent.push(node);
      }
    });
    // Fallback in case nothing found
    if (firstColContent.length === 0) {
      firstColContent = '';
    }
  } else {
    firstColContent = '';
  }

  // Prepare second column: the image
  let secondColContent = '';
  if (imageWrapper) {
    // Use the desktop image for the main image
    const img = imageWrapper.querySelector('img.fifty-fifty-image.custom-desktop-only') || imageWrapper.querySelector('img');
    if (img) {
      secondColContent = img;
    }
  }

  // Compose the table structure
  const headerRow = ['Columns (columns64)'];
  const cells = [
    headerRow,
    [firstColContent, secondColContent]
  ];

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

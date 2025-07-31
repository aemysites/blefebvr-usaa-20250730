/* global WebImporter */
export default function parse(element, { document }) {
  // Get the desktop image for background
  const desktopImg = element.querySelector('.fifty-fifty-image.only-desktop');
  // Get the content/text area
  const textDiv = element.querySelector('.fifty-fifty-wrapping-text');

  // Prepare rows for the table block
  const headerRow = ['Hero (hero35)'];
  const bgRow = [desktopImg ? desktopImg : ''];
  
  // Gather all immediate children of textDiv (for heading, paragraph, cta)
  let textContent = [];
  if (textDiv) {
    // We want to preserve the order and semantics
    const children = Array.from(textDiv.children);
    if (children.length > 0) {
      textContent = children;
    } else {
      textContent = [''];
    }
  } else {
    textContent = [''];
  }
  const textRow = [textContent];

  // Build the table and replace the original element
  const cells = [headerRow, bgRow, textRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

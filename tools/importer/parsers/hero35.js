/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Hero (hero35)'];

  // Find the main container for the 50/50 block
  const mainSection = element.querySelector('.fifty-fifty');

  // --- Get the background image (desktop)
  let bgImg = '';
  if (mainSection) {
    const imgWrapper = mainSection.querySelector('.fifty-fifty-wrapping-image');
    if (imgWrapper) {
      // Prefer the desktop version of the image
      const desktopImg = imgWrapper.querySelector('img.only-desktop');
      if (desktopImg) bgImg = desktopImg;
      // fallback to any img if not found
      else {
        const anyImg = imgWrapper.querySelector('img');
        if (anyImg) bgImg = anyImg;
      }
    }
  }

  // --- Get the text content (heading, paragraph, cta)
  let textContent = '';
  if (mainSection) {
    const textWrapper = mainSection.querySelector('.fifty-fifty-wrapping-text');
    if (textWrapper) {
      textContent = textWrapper;
    }
  }

  // Build the table rows
  const rows = [
    headerRow,
    [bgImg],
    [textContent],
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
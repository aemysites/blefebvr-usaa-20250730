/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row for Cards (cards66)
  const headerRow = ['Cards (cards66)'];

  // Find the image to use (prefer desktop, fallback to any)
  const imageWrapper = element.querySelector('.fifty-fifty-wrapping-image');
  let img = null;
  if (imageWrapper) {
    img = imageWrapper.querySelector('img.custom-desktop-only') || imageWrapper.querySelector('img');
  }
  // Handle if no image found (should not happen in this block, fallback null)

  // Collect the text elements for the card
  const textWrapper = element.querySelector('.fifty-fifty-wrapping-text');
  const textContent = [];
  if (textWrapper) {
    // Heading (any h1-h6 inside this wrapper)
    const heading = textWrapper.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textContent.push(heading);
    // All <p> tags for description
    textWrapper.querySelectorAll('p').forEach((p) => textContent.push(p));
    // CTA: the first <a> (if any)
    const cta = textWrapper.querySelector('a');
    if (cta) textContent.push(cta);
  }

  // Build the Cards block table: header row, then one card row (image, text)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [img, textContent]
  ], document);

  // Replace the input element with the new block table
  element.replaceWith(table);
}

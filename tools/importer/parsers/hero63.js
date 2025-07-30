/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row exactly as specified
  const headerRow = ['Hero (hero63)'];

  // No background image in this HTML, so the second row is blank
  const bgRow = [''];

  // Gather the main content: heading, paragraph, CTA
  // .banner-content contains all of these
  const content = element.querySelector('.banner-content') || element;

  // Find heading, paragraph and cta link
  const heading = content.querySelector('h2');
  const paragraph = content.querySelector('p');
  // The CTA is inside .block-wrapper, which may have multiple children in other variants
  const ctaWrapper = content.querySelector('.block-wrapper');
  // Compose an array of existing elements, only if they exist
  const cellContent = [];
  if (heading) cellContent.push(heading);
  if (paragraph) cellContent.push(paragraph);
  if (ctaWrapper) cellContent.push(ctaWrapper);

  const contentRow = [cellContent];

  // Build the block table and replace the element
  const cells = [
    headerRow,
    bgRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

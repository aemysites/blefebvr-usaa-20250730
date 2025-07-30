/* global WebImporter */
export default function parse(element, { document }) {
  // Find the section containing the card content
  const section = element.querySelector('section.callout');
  if (!section) return;

  // Image/Icon cell
  const iconDiv = section.querySelector('.callout-icon');
  let img = null;
  if (iconDiv) {
    img = iconDiv.querySelector('img');
  }

  // Text cell construction
  const contentDiv = section.querySelector('.callout-content');
  const textCellContent = [];
  if (contentDiv) {
    // Heading (title)
    const heading = contentDiv.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textCellContent.push(heading);

    // Description (first paragraph)
    const desc = contentDiv.querySelector('p');
    if (desc) textCellContent.push(desc);

    // CTA (first link)
    const cta = contentDiv.querySelector('a');
    if (cta) textCellContent.push(cta);
  }

  // Only create the row if there is at least an image and text
  if (!img && textCellContent.length === 0) return;

  const cells = [
    ['Cards (cards2)'],
    [img, textCellContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

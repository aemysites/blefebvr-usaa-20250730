/* global WebImporter */
export default function parse(element, { document }) {
  // Table Header
  const rows = [['Cards (cards47)']];
  // Get all card blocks (direct children)
  const cards = element.querySelectorAll(':scope > .usaa-aem-card-ac');
  cards.forEach(card => {
    // IMAGE: Find the image inside the .usaa-aem-card-ac__image
    const img = card.querySelector('.usaa-aem-card-ac__image img');
    // TEXT: Find the content container
    const content = card.querySelector('.usaa-aem-card-ac__content-container');
    const textParts = [];
    if (content) {
      // Heading
      const heading = content.querySelector('h3');
      if (heading) textParts.push(heading);
      // Description (all children of .usaa-aem-card-ac__text)
      const desc = content.querySelector('.usaa-aem-card-ac__text');
      if (desc) {
        Array.from(desc.childNodes).forEach(n => {
          textParts.push(n);
        });
      }
      // CTA (button/link)
      const actionBlock = content.querySelector('.usaa-aem-card-ac__action-block a');
      if (actionBlock) textParts.push(actionBlock);
    }
    // Ensure both cells are present: image and text parts
    rows.push([
      img ? img : '',
      textParts.length > 0 ? textParts : ''
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

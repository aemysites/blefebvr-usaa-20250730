/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required
  const headerRow = ['Cards (cardsNoImages18)'];
  const rows = [headerRow];

  // Get all direct card children
  const cards = element.querySelectorAll(':scope > div.card');
  cards.forEach(card => {
    const cellContent = [];

    // Card heading
    const header = card.querySelector('.product-card-header h3');
    if (header) cellContent.push(header);

    // Card description/content
    const contentWrapper = card.querySelector('.product-card-content');
    if (contentWrapper) {
      // Get all direct P elements inside the content
      Array.from(contentWrapper.children).forEach(p => {
        if (p.tagName === 'P') cellContent.push(p);
      });
    }

    // Card CTAs
    const footer = card.querySelector('.card-footer');
    if (footer) {
      // Only <a> tags that are direct/indirect children of the footer
      const links = footer.querySelectorAll('a');
      links.forEach(link => {
        // Remove any .hiddenMessage children (visually hidden extra text)
        link.querySelectorAll('.hiddenMessage').forEach(hm => hm.remove());
        cellContent.push(link);
      });
    }

    // If the card is empty, skip
    if (cellContent.length) rows.push([cellContent]);
  });

  // Only replace if we have more than just the header
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}

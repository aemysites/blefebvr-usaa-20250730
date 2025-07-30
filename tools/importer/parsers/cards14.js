/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row exactly as in the example
  const headerRow = ['Cards (cards14)'];
  const rows = [headerRow];

  // Edge case: if there are no cards, replace with just the header
  const cards = element.querySelectorAll(':scope > li.card');
  if (!cards.length) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
    return;
  }

  // Process each card
  cards.forEach(card => {
    // First cell: image/icon (mandatory)
    const img = card.querySelector('.card-header img') || '';
    // Second cell: text content (title, description, CTA)
    const textParts = [];
    // Title: Heading element (may be missing)
    const header = card.querySelector('.card-header');
    if (header) {
      const title = header.querySelector('h3');
      if (title) textParts.push(title);
      // Description (may include <sup> and <span> as in VPP)
      const desc = header.querySelector('p');
      if (desc) textParts.push(desc);
    }
    // CTA link (in footer, may be missing)
    const footer = card.querySelector('.card-footer');
    if (footer) {
      const cta = footer.querySelector('a');
      if (cta) textParts.push(cta);
    }
    rows.push([
      img,
      textParts.length === 1 ? textParts[0] : textParts
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

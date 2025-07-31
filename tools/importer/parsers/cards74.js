/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the block definition
  const headerRow = ['Cards (cards74)'];

  // Gather all cards (li.card)
  const cards = Array.from(element.querySelectorAll(':scope > li.card'));

  const rows = cards.map(card => {
    // Left cell: Image
    let img = card.querySelector('.card-header .card-img-wrap img');
    // If not found, leave undefined (edge case safe)

    // Right cell: Text content (title, description, CTA)
    const textContent = [];

    // Title: h3.card-label
    const title = card.querySelector('.card-header .card-label');
    if (title && title.textContent.trim()) {
      // Use strong for title
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      textContent.push(strong);
      // Add line break only if there's other text below
      if (
        card.querySelector('.card-header .body-copy') ||
        card.querySelector('.card-footer a')
      ) {
        textContent.push(document.createElement('br'));
      }
    }

    // Description: p.body-copy
    const desc = card.querySelector('.card-header .body-copy');
    if (desc && desc.textContent.trim()) {
      textContent.push(desc);
      // Add line break only if there's a CTA below
      if (card.querySelector('.card-footer a')) {
        textContent.push(document.createElement('br'));
      }
    }

    // CTA: .card-footer a
    const cta = card.querySelector('.card-footer a');
    if (cta) {
      textContent.push(cta);
    }

    // Remove trailing <br>, if present
    while (
      textContent.length &&
      textContent[textContent.length - 1].tagName === 'BR'
    ) {
      textContent.pop();
    }

    return [img, textContent];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}

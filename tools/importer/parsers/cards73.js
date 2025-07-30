/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards73) block header row
  const rows = [['Cards (cards73)']];

  // Get all direct li.card children (one per card)
  const cards = element.querySelectorAll(':scope > li.card');
  cards.forEach((card) => {
    // First column: image element (if present)
    const img = card.querySelector('img');
    // Second column: all text and link content, in order, referencing originals
    const content = [];
    // From the card-header: heading and description
    const cardHeader = card.querySelector('.card-header');
    if (cardHeader) {
      // Heading (h3 or similar)
      const heading = Array.from(cardHeader.children).find(el => /^H[1-6]$/i.test(el.tagName));
      if (heading) {
        // Use <strong> for card label as in the example visual
        const strong = document.createElement('strong');
        strong.textContent = heading.textContent;
        content.push(strong);
        content.push(document.createElement('br'));
      }
      // Body/description (typically a <p>)
      const desc = Array.from(cardHeader.children).find(el => el.tagName === 'P');
      if (desc) {
        content.push(desc);
        content.push(document.createElement('br'));
      }
    }
    // From the card-footer: CTA link
    const cardFooter = card.querySelector('.card-footer');
    if (cardFooter) {
      const a = cardFooter.querySelector('a');
      if (a) {
        // Remove hidden span if present, referencing the original element
        const hidden = a.querySelector('.hiddenMessage');
        if (hidden) hidden.remove();
        content.push(a);
      }
    }
    // Remove trailing <br>, if present
    if (content.length && content[content.length - 1].tagName === 'BR') {
      content.pop();
    }
    // Table row: [image, [content]]
    rows.push([img, content]);
  });
  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match the block name exactly as in the example
  const headerRow = ['Cards (cardsNoImages74)'];
  const rows = [headerRow];
  
  // Get all direct child card elements
  const cards = element.querySelectorAll(':scope > div.card');
  cards.forEach(card => {
    // Heading (optional)
    const cardHeader = card.querySelector('.product-card-header');
    let heading = null;
    if (cardHeader) {
      // Use the first heading element (e.g., h3, h2, etc.)
      heading = cardHeader.querySelector('h1,h2,h3,h4,h5,h6');
    }
    
    // Description/content (optional)
    const cardContent = card.querySelector('.product-card-content');
    // Will reference the full cardContent as a node (includes any p, a, etc.)
    
    // CTA (optional)
    const cardFooter = card.querySelector('.card-footer');
    let cta = null;
    if (cardFooter) {
      cta = cardFooter.querySelector('a');
    }

    // Combine content for the card row
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (cardContent) cellContent.push(cardContent);
    if (cta) cellContent.push(cta);
    
    // If there is no content, skip creating a row
    if (cellContent.length > 0) {
      rows.push([cellContent]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

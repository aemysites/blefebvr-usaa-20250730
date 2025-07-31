/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row as in the example
  const headerRow = ['Cards (cards52)'];
  
  // Get all cards: immediate li children
  const cards = Array.from(element.querySelectorAll(':scope > li'));
  
  const rows = cards.map((li) => {
    // Card icon (img)
    const img = li.querySelector('img');
    // Card content (text): get the h3 and p (in that order) from .card-header
    const contentContainer = li.querySelector('.card-header');

    // Prepare a wrapper for text content, preserving heading structure and order
    const textContent = document.createElement('div');
    if (contentContainer) {
      const h3 = contentContainer.querySelector('h3');
      const p = contentContainer.querySelector('p');
      if (h3) textContent.appendChild(h3);
      if (p) textContent.appendChild(p);
    }
    // Only add the row if both required pieces exist
    return [img, textContent];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Get all card containers (immediate children)
  const cardNodes = Array.from(element.querySelectorAll(':scope > .usaa-aem-card-ac'));
  const rows = [['Cards (cards1)']];
  cardNodes.forEach(cardNode => {
    // The image/icon (first column)
    let img = cardNode.querySelector('.usaa-aem-card-ac__icon img');
    // Reference the image element directly if found, else empty string
    const imgCell = img || '';
    // Text content (second column)
    const textCell = document.createElement('div');
    // Title (h3)
    const title = cardNode.querySelector('h3');
    if (title) {
      textCell.appendChild(title);
    }
    // Description/subtext (p under .usaa-aem-card-ac__subtext)
    const subtext = cardNode.querySelector('.usaa-aem-card-ac__subtext p');
    if (subtext) {
      textCell.appendChild(subtext);
    }
    // List/details (.usaa-aem-card-ac__text ul)
    const details = cardNode.querySelector('.usaa-aem-card-ac__text ul');
    if (details) {
      textCell.appendChild(details);
    }
    // CTA button (link)
    const cta = cardNode.querySelector('.usaa-aem-card-ac__action-block a');
    if (cta) {
      // Create a container to place the actual <a> node in a paragraph for separation
      const p = document.createElement('p');
      p.appendChild(cta);
      textCell.appendChild(p);
    }
    // Add this card's row
    rows.push([
      imgCell,
      textCell
    ]);
  });
  // Replace the original element with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row - matches example exactly
  const headerRow = ['Cards (cards39)'];
  const rows = [headerRow];

  // Select all direct li.card children
  const cards = element.querySelectorAll(':scope > li.card');

  cards.forEach((card) => {
    // First cell: image
    let img = null;
    const imgWrap = card.querySelector('.card-img-wrap');
    if (imgWrap) {
      img = imgWrap.querySelector('img');
    }

    // Second cell: text content (reuse nodes as much as possible)
    const cell = document.createElement('div');
    // Title (h3.card-label), preserve strong/heading style with <strong>
    const title = card.querySelector('.card-label');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent;
      cell.appendChild(strong);
      cell.appendChild(document.createElement('br'));
    }
    // Description (p.body-copy)
    const desc = card.querySelector('.body-copy');
    if (desc) {
      const descDiv = document.createElement('div');
      descDiv.textContent = desc.textContent;
      cell.appendChild(descDiv);
    }
    // CTA (a inside .card-footer)
    const cta = card.querySelector('.card-footer a');
    if (cta) {
      if (desc) cell.appendChild(document.createElement('br'));
      cell.appendChild(cta);
    }

    rows.push([img, cell]);
  });

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

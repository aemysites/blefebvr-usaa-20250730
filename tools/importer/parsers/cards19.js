/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block header
  const headerRow = ['Cards (cards19)'];
  const rows = [];

  // Select all immediate card items
  const cards = element.querySelectorAll(':scope > li.card');
  cards.forEach(card => {
    // First cell: image (mandatory)
    let imgEl = card.querySelector('.card-header .card-img-wrap img');
    // Reference the existing image element, not clone (per instructions)

    // Second cell: Text content
    // Use a fragment to collect content in order
    const textFragment = document.createDocumentFragment();
    // Title (optional)
    const title = card.querySelector('.card-header .card-label');
    if (title) {
      // Use a <strong> for the title to match the markdown (bold)
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      textFragment.appendChild(strong);
      textFragment.appendChild(document.createElement('br'));
    }
    // Description (optional)
    const desc = card.querySelector('.card-header .body-copy');
    if (desc) {
      textFragment.appendChild(document.createTextNode(desc.textContent.trim()));
      textFragment.appendChild(document.createElement('br'));
    }
    // CTA (optional)
    const cta = card.querySelector('.card-footer a');
    if (cta) {
      textFragment.appendChild(document.createElement('br'));
      textFragment.appendChild(cta);
    }
    // Remove any trailing <br> if no CTA
    if (!cta && textFragment.lastChild && textFragment.lastChild.nodeName === 'BR') {
      textFragment.removeChild(textFragment.lastChild);
    }

    rows.push([
      imgEl || '',
      textFragment
    ]);
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards16) block header
  const headerRow = ['Cards (cards16)'];

  // Select each direct card <li>
  const liCards = Array.from(element.querySelectorAll(':scope > li'));

  const rows = liCards.map(li => {
    // Icon or image (left cell)
    const img = li.querySelector('.card-header img');
    // Text stack (right cell): title, description, CTA
    const fragments = [];
    // Title (h3, bold)
    const h3 = li.querySelector('.card-header h3');
    if (h3) {
      const strong = document.createElement('strong');
      strong.innerHTML = h3.innerHTML;
      fragments.push(strong);
    }
    // Description (p)
    const desc = li.querySelector('.card-header p');
    if (desc) {
      if (fragments.length > 0) fragments.push(document.createElement('br'));
      fragments.push(desc);
    }
    // CTA link (always at bottom, after <br><br>)
    const cta = li.querySelector('.card-footer a');
    if (cta) {
      fragments.push(document.createElement('br'));
      fragments.push(document.createElement('br'));
      fragments.push(cta);
    }
    return [img, fragments];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}

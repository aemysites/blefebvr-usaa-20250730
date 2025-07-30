/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Set up the block header row, matching the example EXACTLY
  const headerRow = ['Cards (cardsNoImages22)'];

  // 2. Extract all <li> elements (direct children of the given element)
  const cards = Array.from(element.querySelectorAll(':scope > li'));

  // 3. For each card, extract the heading and paragraph, preserving original elements
  const rows = cards.map((card) => {
    const cardBody = card.querySelector('.card-body');
    if (cardBody) {
      // We'll put both heading and paragraph in one fragment, preserving order
      const frag = document.createDocumentFragment();
      // Heading: h3, h4, h5, or h6 (as in source)
      const heading = cardBody.querySelector('h3, h4, h5, h6');
      if (heading) frag.appendChild(heading);
      // Paragraph (the description)
      const desc = cardBody.querySelector('p');
      if (desc) frag.appendChild(desc);
      return [frag];
    } else {
      // Fallback: use entire card if for some reason .card-body is missing
      return [card];
    }
  });

  // Combine header and data rows
  const cells = [headerRow, ...rows];

  // 4. Create the table using the provided utility
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace the original element with the new block table
  element.replaceWith(table);
}

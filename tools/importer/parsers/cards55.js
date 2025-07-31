/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards55) block: 2 columns, 1 row per card
  const headerRow = ['Cards (cards55)'];

  // --- Get the image element ---
  // Prefer desktop image if present, else fallback to mobile
  let image = element.querySelector('.fifty-fifty-wrapping-image img.custom-desktop-only');
  if (!image) {
    image = element.querySelector('.fifty-fifty-wrapping-image img');
  }

  // --- Get the text content ---
  const textWrap = element.querySelector('.fifty-fifty-wrapping-text');
  const cardTextCell = [];
  if (textWrap) {
    // Heading
    const heading = textWrap.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) cardTextCell.push(heading);
    // Description(s)
    textWrap.querySelectorAll('p').forEach(p => cardTextCell.push(p));
    // CTA (bottom link)
    const cta = textWrap.querySelector('a');
    if (cta) cardTextCell.push(cta);
  }

  // Compose the table structure
  const tableRows = [
    headerRow,
    [image, cardTextCell]
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}

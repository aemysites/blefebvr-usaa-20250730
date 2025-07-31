/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards81)'];
  // Get all immediate card columns
  const columns = element.querySelectorAll(':scope > .rds-layout__grid-column-sm-12');
  const rows = [headerRow];
  columns.forEach((col) => {
    // Find image (can be null)
    const imgDiv = col.querySelector(':scope > .sc-htpNat');
    const img = imgDiv ? imgDiv.querySelector('img') : null;

    // Title (headline)
    const headline = col.querySelector(':scope > .rds-typography__headline-4');
    // Description(s)
    const paragraphs = [];
    col.querySelectorAll(':scope > .rds-typography__paragraph').forEach((p) => paragraphs.push(p));
    // CTA (link)
    const cta = col.querySelector(':scope > a.rds-button__tertiary');

    // Build text cell: use existing elements, referencing (not cloning)
    const textContent = [];
    if (headline) textContent.push(headline);
    paragraphs.forEach((p) => textContent.push(p));
    if (cta) textContent.push(cta);

    // Add this card row to the table
    rows.push([
      img,
      textContent
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

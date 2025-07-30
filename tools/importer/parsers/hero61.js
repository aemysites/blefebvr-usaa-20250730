/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with exact block name
  const headerRow = ['Hero (hero61)'];

  // 2nd row: background/main image/icon, optional
  let imageRow = [''];
  const gridRow = element.querySelector('.rds-layout__grid-row');
  if (gridRow) {
    const iconCol = gridRow.querySelector('.callout-block-icon');
    if (iconCol) {
      const img = iconCol.querySelector('img');
      if (img) {
        imageRow = [img];
      }
    }
  }

  // 3rd row: heading, text, cta
  let contentRow = [''];
  if (gridRow) {
    const contentCol = gridRow.querySelector('.icon-content');
    if (contentCol) {
      const contentParts = [];
      // Heading(s)
      const heading = contentCol.querySelector('h2, h1, h3, h4, h5, h6');
      if (heading) contentParts.push(heading);
      // Paragraph(s)
      contentCol.querySelectorAll('p').forEach(p => contentParts.push(p));
      // CTA container (as is, will bring in buttons/links)
      const cta = contentCol.querySelector('.cta-container');
      if (cta) contentParts.push(cta);
      if (contentParts.length > 0) {
        contentRow = [contentParts];
      }
    }
  }

  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

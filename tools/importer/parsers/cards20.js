/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards20) block - 2 columns: image/icon, text content
  const headerRow = ['Cards (cards20)'];

  // Try to find the card section
  const section = element.querySelector('section.callout');
  if (!section) return;

  // First cell: Icon or image
  let imgCell = null;
  const iconDiv = section.querySelector('.callout-icon');
  if (iconDiv) {
    const img = iconDiv.querySelector('img');
    if (img) {
      imgCell = img;
    }
  }

  // Second cell: heading, description, cta (in order)
  const contentDiv = section.querySelector('.callout-content');
  const textCellContent = [];
  if (contentDiv) {
    // Get heading
    const heading = contentDiv.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textCellContent.push(heading);
    // Get description (all paragraphs, in order)
    const paragraphs = contentDiv.querySelectorAll('p');
    paragraphs.forEach(p => {
      textCellContent.push(p);
    });
    // Get call-to-action (all direct <a>s)
    const ctas = contentDiv.querySelectorAll('a');
    ctas.forEach(a => {
      textCellContent.push(a);
    });
  }

  // Only add the row if we have at least one cell
  if (imgCell || textCellContent.length > 0) {
    const rows = [
      headerRow,
      [imgCell, textCellContent]
    ];
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}

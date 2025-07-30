/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns wrapper
  const columnsWrapper = element.querySelector('.feature-spotlight__columns');
  if (!columnsWrapper) return;
  const directCols = Array.from(columnsWrapper.children).filter(el => el.tagName === 'DIV');
  // Defensive: expect two columns (image + content), but order may vary
  let imageCol, contentCol;
  if (directCols.length === 2) {
    const imgA = directCols[0].querySelector('img');
    const imgB = directCols[1].querySelector('img');
    if (imgA && !imgB) {
      imageCol = directCols[0];
      contentCol = directCols[1];
    } else if (imgB && !imgA) {
      imageCol = directCols[1];
      contentCol = directCols[0];
    } else {
      // fallback, assume first is image, second is content
      imageCol = directCols[0];
      contentCol = directCols[1];
    }
  } else {
    // fallback: not the expected structure
    return;
  }
  // IMAGE COLUMN: extract only the main <img> in the column
  let imageEl = imageCol.querySelector('img');
  // CONTENT COLUMN: collect the headline, paragraphs, and relevant button group
  const cellContent = [];
  const headline = contentCol.querySelector('h1, h2, h3, h4, h5, h6');
  if (headline) cellContent.push(headline);
  // Large paragraph block (collect all child nodes to preserve structure)
  const paraBlock = contentCol.querySelector('.rds-typography__paragraph-large');
  if (paraBlock) {
    Array.from(paraBlock.childNodes).forEach(node => cellContent.push(node));
  }
  // Button group (usually contains a <a> as a button)
  const buttonGroup = contentCol.querySelector('[class*="button__group"]');
  if (buttonGroup) cellContent.push(buttonGroup);
  // Compose table structure so that the header row is a single cell spanning two columns (colspan=2),
  // and the content row has two cells (two columns)
  // We'll use a custom table creation routine to respect colspan
  const table = document.createElement('table');
  // Header row with colspan=2
  const trHeader = document.createElement('tr');
  const th = document.createElement('th');
  th.setAttribute('colspan', '2');
  th.textContent = 'Columns (columns19)';
  trHeader.appendChild(th);
  table.appendChild(trHeader);
  // Content row
  const tr = document.createElement('tr');
  const td1 = document.createElement('td');
  if (cellContent.length) {
    cellContent.forEach(node => td1.append(node));
  }
  const td2 = document.createElement('td');
  if (imageEl) td2.append(imageEl);
  tr.appendChild(td1);
  tr.appendChild(td2);
  table.appendChild(tr);
  element.replaceWith(table);
}

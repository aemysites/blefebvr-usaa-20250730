/* global WebImporter */
export default function parse(element, { document }) {
  // Find the ordered list of steps
  const ol = element.querySelector('ol.usaa-step-list');
  if (!ol) return;
  // Get all top-level li.step elements
  const steps = Array.from(ol.querySelectorAll(':scope > li.step'));
  // For each step, gather the content (headline + body)
  const columns = steps.map((li) => {
    const colContent = [];
    const headline = li.querySelector('.usaa-step-headline');
    if (headline) colContent.push(headline);
    const body = li.querySelector('.usaa-step-body-text');
    if (body) colContent.push(body);
    if (colContent.length === 0) colContent.push(li);
    return colContent;
  });
  // According to the markdown example, the header row should be a single cell spanning all columns
  // So, we must ensure the first row is a single header cell: ['Columns (columns34)']
  // The next row contains as many columns as there are steps
  const cells = [
    ['Columns (columns34)'], // header row: one cell, not one per column!
    columns // second row: one cell per column
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

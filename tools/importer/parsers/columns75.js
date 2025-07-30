/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main callout section
  const section = element.querySelector('section.callout-cobranded') || element;

  // Get immediate children: expect two columns (logo col, content col)
  const columns = Array.from(section.querySelectorAll(':scope > div'));
  const col1 = columns[0] || '';
  const col2 = columns[1] || '';

  // The header row must have EXACTLY one column containing the block name and variant
  const headerRow = ['Columns (columns75)'];
  // The content row should have as many columns as needed
  const contentRow = [col1, col2];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}

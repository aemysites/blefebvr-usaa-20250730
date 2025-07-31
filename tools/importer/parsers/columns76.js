/* global WebImporter */
export default function parse(element, { document }) {
  // Find the section containing the content
  const section = element.querySelector('section.callout');
  if (!section) return;

  // Get both the left and right column elements
  const leftCol = section.querySelector('.callout-content');
  const rightCol = section.querySelector('.callout-button');
  // Defensive: always ensure we have two column cells
  const left = leftCol || document.createElement('div');
  const right = rightCol || document.createElement('div');

  // The header row is a single cell, as in the example
  const headerRow = ['Columns (columns76)'];
  // The columns row has two cells
  const contentRow = [left, right];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}

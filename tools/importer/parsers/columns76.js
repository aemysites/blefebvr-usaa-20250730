/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid row containing the columns
  const gridRow = element.querySelector('.aem-text-block.rds-layout__grid-row');
  if (!gridRow) return;

  // Get all immediate column elements
  const columns = gridRow.querySelectorAll(':scope > .rds-layout__grid-column-md-6');
  if (columns.length !== 2) return;

  // For each column, gather all direct children as content
  // This ensures all text, headings, and lists are included
  function gatherColumnCells(colElem) {
    // Gather all direct children (to include any kind of content)
    const children = Array.from(colElem.children);
    // If there's a single wrapper, e.g., <div>, unwrap its children
    if (children.length === 1 && children[0].children.length > 0) {
      return Array.from(children[0].children);
    } else if (children.length > 0) {
      return children;
    } else {
      // fallback: column itself as content
      return [colElem];
    }
  }

  const leftContent = gatherColumnCells(columns[0]);
  const rightContent = [];
  // For right column, we want both the text block and the CTA
  // Text block
  const textBlock = columns[1].querySelector('.text-block-custom');
  if (textBlock) rightContent.push(textBlock);
  // CTA button group (if present)
  const ctaGroup = columns[1].querySelector('.cta-container');
  if (ctaGroup) rightContent.push(ctaGroup);

  // If neither sub-block found, fall back to entire column's children
  if (rightContent.length === 0) {
    rightContent.push(...gatherColumnCells(columns[1]));
  }

  // Table header from example: Columns (columns76)
  const cells = [
    ['Columns (columns76)'],
    [leftContent, rightContent],
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

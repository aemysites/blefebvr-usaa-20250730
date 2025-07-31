/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main .aem-text-block that contains the column content
  const aemTextBlock = element.querySelector('.aem-text-block');
  if (!aemTextBlock) return;

  // Get the two immediate column divs (left and right)
  const columns = Array.from(aemTextBlock.querySelectorAll(':scope > div'));
  const leftCol = columns[0] || document.createElement('div');
  const rightCol = columns[1] || document.createElement('div');

  // Collect left column content
  const leftContent = Array.from(leftCol.childNodes).filter(n => {
    return n.nodeType !== Node.TEXT_NODE || (n.textContent && n.textContent.trim());
  });

  // Collect right column content
  let rightContent = [];
  // Get the text block (paragraphs, headings, etc)
  const textBlock = rightCol.querySelector('.text-block-custom, .rds-typography__paragraph-large');
  if (textBlock) {
    rightContent.push(...Array.from(textBlock.childNodes).filter(n => {
      return n.nodeType !== Node.TEXT_NODE || (n.textContent && n.textContent.trim());
    }));
  }
  // Get CTA button if present
  const ctaButton = rightCol.querySelector('.cta-container a');
  if (ctaButton) {
    rightContent.push(ctaButton);
  }

  // The header row must be a single cell (one column), not two
  const headerRow = ['Columns (columns77)'];
  const contentRow = [leftContent, rightContent];

  // For proper spanning, createTable will render the header as a single cell, contentRow as two cells
  const cells = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

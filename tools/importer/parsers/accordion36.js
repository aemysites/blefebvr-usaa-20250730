/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match example exactly
  const headerRow = ['Accordion (accordion36)'];

  // Find the accordion container
  const accordion = element.querySelector('.rds-accordion');
  const sections = accordion ? Array.from(accordion.querySelectorAll(':scope > .rds-accordion__section')) : [];
  const rows = [headerRow];

  sections.forEach(section => {
    // Extract title: .rds-accordion__header > button > span (reference existing span if possible)
    let titleCell;
    const headerBtn = section.querySelector('.rds-accordion__header > button');
    if (headerBtn) {
      const span = headerBtn.querySelector('span');
      // Use the span element directly if it exists, else fallback to button's text
      if (span) {
        titleCell = span;
      } else {
        // fallback: create a div with the button's text
        const div = document.createElement('div');
        div.textContent = headerBtn.textContent.trim();
        titleCell = div;
      }
    } else {
      // fallback: empty div
      const div = document.createElement('div');
      div.textContent = '';
      titleCell = div;
    }

    // Extract content: .rds-accordion__panel > div (reference existing div directly)
    let contentCell;
    const panel = section.querySelector('.rds-accordion__panel');
    if (panel) {
      const contentDiv = panel.querySelector(':scope > div');
      if (contentDiv) {
        contentCell = contentDiv;
      } else {
        // fallback: empty div
        const div = document.createElement('div');
        div.textContent = '';
        contentCell = div;
      }
    } else {
      // fallback: empty div
      const div = document.createElement('div');
      div.textContent = '';
      contentCell = div;
    }

    rows.push([titleCell, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

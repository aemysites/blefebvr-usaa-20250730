/* global WebImporter */
export default function parse(element, { document }) {
  // Get all accordion sections
  let sectionContainer = element.querySelector('.rds-accordion');
  let sections = [];
  if (sectionContainer) {
    sections = Array.from(sectionContainer.querySelectorAll(':scope > .rds-accordion__section'));
  } else {
    sections = Array.from(element.querySelectorAll(':scope > .rds-accordion__section'));
  }

  // Compose all accordion rows
  const rows = [];
  sections.forEach(section => {
    // Title cell
    let titleCell = '';
    const header = section.querySelector('.rds-accordion__header');
    if (header) {
      const triggerBtn = header.querySelector('.rds-accordion__trigger');
      if (triggerBtn) {
        const span = triggerBtn.querySelector('span');
        if (span) {
          titleCell = span;
        } else {
          titleCell = triggerBtn.textContent.trim();
        }
      }
    }
    // Content cell
    let contentCell = '';
    const panel = section.querySelector('.rds-accordion__panel');
    if (panel) {
      if (panel.childElementCount === 1 && panel.firstElementChild.tagName === 'DIV') {
        const innerDiv = panel.firstElementChild;
        if (innerDiv.childNodes.length === 1 && innerDiv.firstChild.nodeType === Node.TEXT_NODE) {
          contentCell = innerDiv.textContent.trim();
        } else {
          contentCell = Array.from(innerDiv.childNodes);
        }
      } else {
        contentCell = Array.from(panel.childNodes);
      }
    }
    rows.push([titleCell, contentCell]);
  });

  // Insert the header row as a single cell (for correct createTable structure), then set colspan after creation
  const tableData = [['Accordion (accordion36)'], ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Fix header: Make sure the <th> spans 2 columns, so structure matches the example and is semantically correct
  const th = block.querySelector('tr:first-child th');
  if (th) {
    th.setAttribute('colspan', '2');
  }

  element.replaceWith(block);
}

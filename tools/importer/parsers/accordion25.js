/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the accordion title
  let titleEl = element.querySelector('button h3');
  if (!titleEl) {
    const btn = element.querySelector('button');
    titleEl = document.createElement('span');
    titleEl.textContent = btn ? btn.textContent.trim() : '';
  }

  // Extract the accordion content
  let contentEl = element.querySelector('div[role=region] div[itemprop="text"]');
  if (!contentEl) {
    const panel = element.querySelector('div[role=region]');
    contentEl = document.createElement('div');
    if (panel) {
      Array.from(panel.childNodes).forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE || child.nodeType === Node.TEXT_NODE) {
          contentEl.appendChild(child);
        }
      });
    }
  }

  // Table rows: header row (single cell), then two-cell row
  const rows = [
    [{
      element: document.createTextNode('Accordion (accordion25)'),
      colspan: 2
    }],
    [titleEl, contentEl]
  ];

  // Patch WebImporter.DOMUtils.createTable to support colspan on header
  function createTableWithColspan(rows, document) {
    const table = document.createElement('table');
    rows.forEach((row, rowIndex) => {
      const tr = document.createElement('tr');
      row.forEach((cell) => {
        let cellEl;
        if (rowIndex === 0) {
          cellEl = document.createElement('th');
        } else {
          cellEl = document.createElement('td');
        }
        if (typeof cell === 'object' && cell !== null && cell.element) {
          cellEl.appendChild(cell.element);
          if (cell.colspan) cellEl.colSpan = cell.colspan;
        } else if (Array.isArray(cell)) {
          cellEl.append(...cell);
        } else if (typeof cell === 'string') {
          cellEl.textContent = cell;
        } else {
          cellEl.append(cell);
        }
        tr.appendChild(cellEl);
      });
      table.appendChild(tr);
    });
    return table;
  }

  const table = createTableWithColspan(rows, document);
  element.replaceWith(table);
}

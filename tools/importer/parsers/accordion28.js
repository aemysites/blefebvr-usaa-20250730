/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion (accordion28) block header, must match exactly
  const headerRow = ['Accordion (accordion28)'];
  const rows = [headerRow];

  // Extract the accordion question/title (left cell) and answer/content (right cell)
  // The structure is:
  // <div .rds-accordion__header>...<h3>Title</h3>...</div>
  // <div .rds-accordion__panel>...<div itemprop=text>Content</div>...</div>

  // Defensive: find header and panel children
  const headerDiv = element.querySelector('.rds-accordion__header');
  const panelDiv = element.querySelector('.rds-accordion__panel');

  // Default empty placeholders
  let titleCell = '';
  let contentCell = '';

  // Extract title cell
  if (headerDiv) {
    // Try to find h3 in headerDiv (anywhere, as structure can vary)
    const h3 = headerDiv.querySelector('h3');
    if (h3) {
      titleCell = h3;
    } else {
      // Fallback: look for text inside the button
      const button = headerDiv.querySelector('button');
      if (button) {
        // Remove inside icons (svg) if present
        const btnClone = button.cloneNode(true);
        btnClone.querySelectorAll('svg').forEach(svg => svg.remove());
        titleCell = document.createElement('span');
        titleCell.textContent = btnClone.textContent.trim();
      }
    }
  }

  // Extract content cell
  if (panelDiv) {
    // Look for [itemprop=text] within panelDiv
    const text = panelDiv.querySelector('[itemprop="text"]');
    if (text) {
      contentCell = text;
    } else {
      // If not, use all children of panelDiv (excluding scripts, etc)
      const fragment = document.createDocumentFragment();
      Array.from(panelDiv.childNodes).forEach(node => {
        if (node.nodeType === 1 || node.nodeType === 3) {
          if (!(node.tagName && node.tagName.toLowerCase() === 'script')) {
            fragment.appendChild(node.cloneNode(true));
          }
        }
      });
      contentCell = fragment;
    }
  }

  // Add this accordion section row
  rows.push([titleCell, contentCell]);

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

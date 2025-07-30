/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid row containing the columns
  const gridRow = element.querySelector('.rds-layout__grid-row');
  const columnDivs = gridRow ? gridRow.querySelectorAll(':scope > div') : [];

  // Prepare left and right columns
  let leftColEls = [];
  let rightColEls = [];

  // LEFT COLUMN: headline + paragraph (possibly multiple paragraphs)
  if (columnDivs[0]) {
    // Collect all children that are not just dividers
    const leftChildren = Array.from(columnDivs[0].children).filter((child) => {
      // filter out dividers
      return !child.classList.contains('rds-layout__divider');
    });
    leftChildren.forEach((child) => {
      leftColEls.push(child);
    });
  }

  // RIGHT COLUMN: phone illustration, phone link, TTY text, hours button
  if (columnDivs[1]) {
    // Look for the flex display wrapper
    const flexWrapper = columnDivs[1].querySelector('.rds-layout--display-flex');
    if (flexWrapper) {
      // IMAGE (phone illustration)
      const illustration = flexWrapper.querySelector('img');
      if (illustration) rightColEls.push(illustration);
      // TEXT + CALL LINK
      const textContainer = illustration ? illustration.nextElementSibling : null;
      if (textContainer) {
        // Phone link (keep as <a>)
        const phoneLink = textContainer.querySelector('a[href^="tel:"]');
        if (phoneLink) rightColEls.push(phoneLink);
        // TTY note
        const ttyNote = textContainer.querySelector('p');
        if (ttyNote) rightColEls.push(ttyNote);
        // Hours button (render as text since it's not a link)
        const hoursBtn = textContainer.querySelector('button');
        if (hoursBtn) {
          // Copy just the button's main label
          const btnLabel = document.createElement('span');
          btnLabel.textContent = hoursBtn.textContent.trim().replace(/,.*$/, '');
          rightColEls.push(btnLabel);
        }
      }
    }
  }

  // Edge case: ensure at least an empty cell if missing
  if (leftColEls.length === 0) leftColEls = [''];
  if (rightColEls.length === 0) rightColEls = [''];

  // Build the cells for the table
  // First row: single header cell as required
  // Second row: two columns (left and right)
  const cells = [];
  cells.push(['Columns (columns55)']);
  cells.push([leftColEls, rightColEls]);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Set header cell to span two columns (as required by the spec)
  const th = table.querySelector('th');
  if (th) th.setAttribute('colspan', '2');

  element.replaceWith(table);
}

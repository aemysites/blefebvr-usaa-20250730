/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Hero (hero1)'];

  // There is no background image element in the provided HTML, so the second row will be empty
  const backgroundRow = [''];

  // Compose content row
  const contentDiv = element.querySelector('.banner-content');
  const contentItems = [];

  // Get the heading (h2)
  const heading = contentDiv && contentDiv.querySelector('h2');
  if (heading) contentItems.push(heading);

  // Get all CTA links (direct children of .block-wrapper)
  if (contentDiv) {
    // Only direct children block-wrappers
    const blockWrappers = Array.from(contentDiv.querySelectorAll(':scope > .block-wrapper'));
    blockWrappers.forEach(wrapper => {
      // Only reference the <a> inside each wrapper
      const link = wrapper.querySelector('a');
      if (link) contentItems.push(link);
    });
  }

  const contentRow = [contentItems];

  // Create the table block
  const cells = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

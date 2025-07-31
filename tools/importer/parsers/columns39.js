/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly as in the instructions
  const headerRow = ['Columns (columns39)'];

  // Select all direct column containers (immediate children)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, collect its relevant content (heading and list)
  const contentRow = columns.map((col) => {
    // Get the heading if present
    const heading = col.querySelector('h3');
    // Get the list if present
    const list = col.querySelector('ul');
    // Create a fragment to combine heading and list, keeping references
    const frag = document.createDocumentFragment();
    if (heading) frag.appendChild(heading);
    if (list) frag.appendChild(list);
    // If both are missing, avoid empty fragments: add an empty string
    if (!heading && !list) {
      return '';
    }
    return frag;
  });

  // Build the table rows
  const tableRows = [headerRow, contentRow];

  // Create the table and replace the original element
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}

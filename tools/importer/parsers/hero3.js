/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches exactly the block name
  const headerRow = ['Hero (hero3)'];

  // Second row: Background Image (optional)
  let imageRow = [''];
  // The only image here is the icon inside .callout-icon
  const icon = element.querySelector('.callout-icon img');
  if (icon) {
    imageRow = [icon]; // Reference the existing element
  }

  // Third row: Title, subheading, paragraphs, and CTA
  // Collect all relevant content in order:
  const contentContainer = document.createElement('div');

  // Title (usually h2)
  const title = element.querySelector('.callout-content h2, h2');
  if (title) contentContainer.appendChild(title);

  // All paragraphs (body copy and link)
  const paragraphs = element.querySelectorAll('.callout-content p');
  paragraphs.forEach(p => contentContainer.appendChild(p));

  // CTA button (appears before the section)
  const ctaBtn = element.querySelector('a.cta-btn');
  if (ctaBtn) contentContainer.appendChild(ctaBtn);

  const contentRow = [contentContainer];

  // Compose cells
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  // Build the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

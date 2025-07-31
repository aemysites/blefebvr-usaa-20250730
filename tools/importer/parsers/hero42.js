/* global WebImporter */
export default function parse(element, { document }) {
  // Compose Hero (hero42) block table: header, (optional) image row, content row
  // In this example, there is no image in the HTML, so image row is blank
  // All text and CTA content is inside the .banner-content

  // Get the .banner-content node (should contain all the main content)
  const bannerContent = element.querySelector('.banner-content');

  // Defensive: If missing .banner-content, just use element itself for content
  const contentElement = bannerContent || element;

  // Extract the main heading (h2 or element with 'banner-sub-heading')
  let heading = contentElement.querySelector('h2, .banner-sub-heading');
  // Defensive: heading could be null

  // Extract the first paragraph as subheading/description
  let description = contentElement.querySelector('p');

  // Extract CTA button/link, if present
  let cta = contentElement.querySelector('a');

  // Prepare the content array in the order: heading, description, cta (if present)
  const contentNodes = [];
  if (heading) contentNodes.push(heading);
  if (description) contentNodes.push(description);
  if (cta) contentNodes.push(cta);

  // Table structure: 1-col, 3-rows (header, image, content)
  const rows = [
    ['Hero (hero42)'],
    [''], // no image in this example
    [contentNodes], // content cell: heading, description, cta
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  
  // Replace original element with the new block
  element.replaceWith(block);
}

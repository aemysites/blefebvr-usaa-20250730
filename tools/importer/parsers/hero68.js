/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the callout section
  const section = element.querySelector('section.callout');
  if (!section) return;

  // There is no background image in the example HTML, so the second row is an empty string
  const imageRow = [''];

  // Prepare content for the third row
  const calloutContent = section.querySelector('.callout-content');
  let contentEls = [];
  if (calloutContent) {
    // Get the headline/paragraph
    const headline = calloutContent.querySelector('p');
    if (headline) contentEls.push(headline);

    // Get the select and its label, wrap together in a div if they exist
    const selectWrapper = calloutContent.querySelector('div.usaa-select');
    if (selectWrapper) contentEls.push(selectWrapper);
    
    // Get the CTA button
    const cta = calloutContent.querySelector('a.cta-btn');
    if (cta) contentEls.push(cta);
  }

  // Construct cells as per requirements
  const cells = [
    ['Hero (hero68)'],
    imageRow,
    [contentEls]
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

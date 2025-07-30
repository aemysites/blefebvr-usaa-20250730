/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row: Block name, exactly as provided
  const headerRow = ['Hero (hero41)'];

  // 2. Background row: None in the HTML provided (no img or background asset)
  const backgroundRow = [''];

  // 3. Content row: heading, CTA button, secondary link
  // Reference elements directly (do not clone)
  const contentElements = [];

  // Find the first .banner-content child
  const bannerContent = element.querySelector(':scope > .banner-content');
  if (bannerContent) {
    // Heading (h2 or alternatives)
    const heading = bannerContent.querySelector('h2, h1, h3, h4, h5, h6');
    if (heading) contentElements.push(heading);

    // Find all direct .block-wrapper children:
    const wrappers = bannerContent.querySelectorAll(':scope > .block-wrapper');
    wrappers.forEach(wrapper => {
      // Each wrapper contains a button/link; reference it directly
      const ctaOrLink = wrapper.querySelector('a, button');
      if (ctaOrLink) contentElements.push(ctaOrLink);
    });
  }

  // Compose the cells array
  const cells = [
    headerRow,
    backgroundRow,
    [contentElements]
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Table header (matches example exactly)
  const headerRow = ['Cards (cards40)'];
  const rows = [headerRow];

  // Select each card block (each card column)
  const cards = Array.from(element.querySelectorAll(':scope > .usaa-aem-card-ac'));

  cards.forEach(card => {
    // IMAGE COLUMN
    let img = null;
    const imgContainer = card.querySelector('.usaa-aem-card-ac__icon');
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }

    // TEXT COLUMN
    const textFragments = [];

    // Heading
    const heading = card.querySelector('h3');
    if (heading) {
      // Use the actual heading element
      textFragments.push(heading);
    }

    // Subtext/Description
    const subtext = card.querySelector('.usaa-aem-card-ac__subtext');
    if (subtext) {
      // Add all child nodes (span, p, etc), not just .textContent
      Array.from(subtext.childNodes).forEach(node => textFragments.push(node));
    }

    // Bullet/Details
    const detail = card.querySelector('.usaa-aem-card-ac__text');
    if (detail) {
      Array.from(detail.childNodes).forEach(node => {
        // Exclude empty <p>&nbsp;</p>
        if (node.nodeType === 1 && node.tagName === 'P' && node.innerHTML.match(/^\s*&nbsp;\s*$/)) return;
        textFragments.push(node);
      });
    }

    // CTA
    const cta = card.querySelector('.usaa-aem-card-ac__action-block a');
    if (cta) {
      // Add a line break if needed before CTA, as in visual
      textFragments.push(document.createElement('br'));
      textFragments.push(cta);
    }

    // Remove leading/trailing <br> if any
    while (textFragments.length && textFragments[0].tagName === 'BR') textFragments.shift();
    while (textFragments.length && textFragments[textFragments.length-1].tagName === 'BR') textFragments.pop();

    // Compose row
    rows.push([img, textFragments]);
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

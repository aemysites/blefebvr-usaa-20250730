/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Columns (columns29)'];

  // Get the direct children: image and text containers
  const children = element.querySelectorAll(':scope > div');
  let imageDiv = null;
  let textDiv = null;

  children.forEach(div => {
    if (div.classList.contains('fifty-fifty-wrapping-image')) {
      imageDiv = div;
    } else if (div.classList.contains('fifty-fifty-wrapping-text')) {
      textDiv = div;
    }
  });

  // IMAGE CELL: Use the desktop image if present, else first image
  let imageCell = '';
  if (imageDiv) {
    const imgs = imageDiv.querySelectorAll('img');
    let img = Array.from(imgs).find(i => i.classList.contains('custom-desktop-only'));
    if (!img) img = imgs[0];
    if (img) {
      imageCell = img;
    }
  }

  // TEXT CELL: Use the entire textDiv
  let textCell = '';
  if (textDiv) {
    // Remove hidden <span class="usaa-hiddenMessage"> if present inside sup
    const sup = textDiv.querySelector('sup');
    if (sup) {
      const hiddenSpan = sup.querySelector('.usaa-hiddenMessage');
      if (hiddenSpan) {
        hiddenSpan.remove();
      }
    }
    textCell = textDiv;
  }

  // Always use two columns as in the example layout
  const row = [imageCell, textCell];
  const cells = [headerRow, row];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
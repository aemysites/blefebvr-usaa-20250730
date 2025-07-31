/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container that holds the illustration and content
  const background = element.querySelector('.rds-globals__background-secondary') || element;
  const container = background.querySelector('.rds-layout__container') || background;
  const illustrationGroup = container.querySelector('.aem-callout-block__illustration-group');

  let leftCellContent = [];
  let rightCellContent = [];

  if (illustrationGroup) {
    // Right column: illustration image (with badge overlay, but only the main image as per example)
    const illustrationDiv = illustrationGroup.querySelector('.aem-callout-block__illustration-group-illustration');
    if (illustrationDiv) {
      const img = illustrationDiv.querySelector('img');
      if (img) {
        rightCellContent.push(img);
      }
    }

    // Left column: headline, text, button
    const contentDiv = illustrationGroup.querySelector('.aem-callout-block__illustration-group-content');
    if (contentDiv) {
      // headline
      const headlineWrap = contentDiv.querySelector('.rds-typography__headline-2');
      if (headlineWrap) {
        const headline = headlineWrap.querySelector('h2, h1, h3, h4, h5, h6');
        if (headline) leftCellContent.push(headline);
      }
      // paragraph
      const paragraphDiv = contentDiv.querySelector('.rds-typography__paragraph-large');
      if (paragraphDiv) {
        const para = paragraphDiv.querySelector('p');
        if (para) leftCellContent.push(para);
      }
      // button
      const buttonGroup = contentDiv.querySelector('.rds-button__group--align-left');
      if (buttonGroup) {
        const btn = buttonGroup.querySelector('a');
        if (btn) leftCellContent.push(btn);
      }
    }
  }

  // Table header must match exactly
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns43)'],
    [leftCellContent, rightCellContent]
  ], document);

  element.replaceWith(table);
}

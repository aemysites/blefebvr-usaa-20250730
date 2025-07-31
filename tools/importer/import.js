/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import hero1Parser from './parsers/hero1.js';
import columns4Parser from './parsers/columns4.js';
import cards8Parser from './parsers/cards8.js';
import hero10Parser from './parsers/hero10.js';
import hero3Parser from './parsers/hero3.js';
import columns5Parser from './parsers/columns5.js';
import hero6Parser from './parsers/hero6.js';
import columns12Parser from './parsers/columns12.js';
import columns14Parser from './parsers/columns14.js';
import cards16Parser from './parsers/cards16.js';
import cards18Parser from './parsers/cards18.js';
import columns13Parser from './parsers/columns13.js';
import cards19Parser from './parsers/cards19.js';
import columns17Parser from './parsers/columns17.js';
import cardsNoImages22Parser from './parsers/cardsNoImages22.js';
import cards20Parser from './parsers/cards20.js';
import columns15Parser from './parsers/columns15.js';
import accordion28Parser from './parsers/accordion28.js';
import columns29Parser from './parsers/columns29.js';
import accordion7Parser from './parsers/accordion7.js';
import columns32Parser from './parsers/columns32.js';
import columns2Parser from './parsers/columns2.js';
import hero35Parser from './parsers/hero35.js';
import hero33Parser from './parsers/hero33.js';
import columns34Parser from './parsers/columns34.js';
import columns39Parser from './parsers/columns39.js';
import columns37Parser from './parsers/columns37.js';
import hero42Parser from './parsers/hero42.js';
import cards40Parser from './parsers/cards40.js';
import accordion46Parser from './parsers/accordion46.js';
import columns45Parser from './parsers/columns45.js';
import columns44Parser from './parsers/columns44.js';
import cards47Parser from './parsers/cards47.js';
import columns26Parser from './parsers/columns26.js';
import columns50Parser from './parsers/columns50.js';
import columns49Parser from './parsers/columns49.js';
import columns31Parser from './parsers/columns31.js';
import hero51Parser from './parsers/hero51.js';
import cards55Parser from './parsers/cards55.js';
import cards52Parser from './parsers/cards52.js';
import columns57Parser from './parsers/columns57.js';
import columns21Parser from './parsers/columns21.js';
import columns56Parser from './parsers/columns56.js';
import hero58Parser from './parsers/hero58.js';
import columns24Parser from './parsers/columns24.js';
import columns59Parser from './parsers/columns59.js';
import accordion61Parser from './parsers/accordion61.js';
import columns63Parser from './parsers/columns63.js';
import cardsNoImages64Parser from './parsers/cardsNoImages64.js';
import cards62Parser from './parsers/cards62.js';
import columns60Parser from './parsers/columns60.js';
import columns43Parser from './parsers/columns43.js';
import accordion36Parser from './parsers/accordion36.js';
import columns66Parser from './parsers/columns66.js';
import cardsNoImages67Parser from './parsers/cardsNoImages67.js';
import hero68Parser from './parsers/hero68.js';
import columns69Parser from './parsers/columns69.js';
import hero65Parser from './parsers/hero65.js';
import hero70Parser from './parsers/hero70.js';
import cards74Parser from './parsers/cards74.js';
import columns71Parser from './parsers/columns71.js';
import columns76Parser from './parsers/columns76.js';
import cards79Parser from './parsers/cards79.js';
import columns9Parser from './parsers/columns9.js';
import columns80Parser from './parsers/columns80.js';
import columns75Parser from './parsers/columns75.js';
import columns77Parser from './parsers/columns77.js';
import cards81Parser from './parsers/cards81.js';
import columns78Parser from './parsers/columns78.js';
import columns82Parser from './parsers/columns82.js';
import columns73Parser from './parsers/columns73.js';
import columns53Parser from './parsers/columns53.js';
import columns72Parser from './parsers/columns72.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import sectionsTransformer from './transformers/sections.js';
import { TransformHook } from './transformers/transform.js';
import { customParsers, customTransformers, customElements } from './import.custom.js';
import {
  generateDocumentPath,
  handleOnLoad,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  hero1: hero1Parser,
  columns4: columns4Parser,
  cards8: cards8Parser,
  hero10: hero10Parser,
  hero3: hero3Parser,
  columns5: columns5Parser,
  hero6: hero6Parser,
  columns12: columns12Parser,
  columns14: columns14Parser,
  cards16: cards16Parser,
  cards18: cards18Parser,
  columns13: columns13Parser,
  cards19: cards19Parser,
  columns17: columns17Parser,
  cardsNoImages22: cardsNoImages22Parser,
  cards20: cards20Parser,
  columns15: columns15Parser,
  accordion28: accordion28Parser,
  columns29: columns29Parser,
  accordion7: accordion7Parser,
  columns32: columns32Parser,
  columns2: columns2Parser,
  hero35: hero35Parser,
  hero33: hero33Parser,
  columns34: columns34Parser,
  columns39: columns39Parser,
  columns37: columns37Parser,
  hero42: hero42Parser,
  cards40: cards40Parser,
  accordion46: accordion46Parser,
  columns45: columns45Parser,
  columns44: columns44Parser,
  cards47: cards47Parser,
  columns26: columns26Parser,
  columns50: columns50Parser,
  columns49: columns49Parser,
  columns31: columns31Parser,
  hero51: hero51Parser,
  cards55: cards55Parser,
  cards52: cards52Parser,
  columns57: columns57Parser,
  columns21: columns21Parser,
  columns56: columns56Parser,
  hero58: hero58Parser,
  columns24: columns24Parser,
  columns59: columns59Parser,
  accordion61: accordion61Parser,
  columns63: columns63Parser,
  cardsNoImages64: cardsNoImages64Parser,
  cards62: cards62Parser,
  columns60: columns60Parser,
  columns43: columns43Parser,
  accordion36: accordion36Parser,
  columns66: columns66Parser,
  cardsNoImages67: cardsNoImages67Parser,
  hero68: hero68Parser,
  columns69: columns69Parser,
  hero65: hero65Parser,
  hero70: hero70Parser,
  cards74: cards74Parser,
  columns71: columns71Parser,
  columns76: columns76Parser,
  cards79: cards79Parser,
  columns9: columns9Parser,
  columns80: columns80Parser,
  columns75: columns75Parser,
  columns77: columns77Parser,
  cards81: cards81Parser,
  columns78: columns78Parser,
  columns82: columns82Parser,
  columns73: columns73Parser,
  columns53: columns53Parser,
  columns72: columns72Parser,
  ...customParsers,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
  sections: sectionsTransformer,
  ...customTransformers,
};

// Additional page elements to parse that are not included in the inventory
const pageElements = [{ name: 'metadata' }, ...customElements];

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.values(transformers).forEach((transformerFn) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        uuid: instance.uuid,
        section: instance.section,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  const defaultContentElements = inventory.outliers
    .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
    .map((instance) => ({
      ...instance,
      element: WebImporter.Import.getElementByXPath(document, instance.xpath),
    }));

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  // transform all elements using parsers
  [...defaultContentElements, ...blockElements, ...pageElements]
    // sort elements by order in the page
    .sort((a, b) => (a.uuid ? parseInt(a.uuid.split('-')[1], 10) - parseInt(b.uuid.split('-')[1], 10) : 999))
    // filter out fragment elements
    .filter((item) => !fragmentElements.includes(item.element))
    .forEach((item, idx, arr) => {
      const { element = main, ...pageBlock } = item;
      const parserName = WebImporter.Import.getParserName(pageBlock);
      const parserFn = parsers[parserName];
      try {
        let parserElement = element;
        if (typeof parserElement === 'string') {
          parserElement = main.querySelector(parserElement);
        }
        // before parse hook
        WebImporter.Import.transform(
          TransformHook.beforeParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
            nextEl: arr[idx + 1],
          },
        );
        // parse the element
        if (parserFn) {
          parserFn.call(this, parserElement, { ...source });
        }
        // after parse hook
        WebImporter.Import.transform(
          TransformHook.afterParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
          },
        );
      } catch (e) {
        console.warn(`Failed to parse block: ${parserName}`, e);
      }
    });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, inventory });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, inventory });

    return [{
      element: main,
      path,
    }];
  },
};

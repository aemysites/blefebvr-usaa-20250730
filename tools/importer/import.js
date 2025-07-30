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
import accordion7Parser from './parsers/accordion7.js';
import cards2Parser from './parsers/cards2.js';
import columns9Parser from './parsers/columns9.js';
import hero4Parser from './parsers/hero4.js';
import hero3Parser from './parsers/hero3.js';
import cards1Parser from './parsers/cards1.js';
import hero10Parser from './parsers/hero10.js';
import columns6Parser from './parsers/columns6.js';
import cards14Parser from './parsers/cards14.js';
import columns5Parser from './parsers/columns5.js';
import cards16Parser from './parsers/cards16.js';
import hero17Parser from './parsers/hero17.js';
import cardsNoImages18Parser from './parsers/cardsNoImages18.js';
import columns15Parser from './parsers/columns15.js';
import cardsNoImages22Parser from './parsers/cardsNoImages22.js';
import columns30Parser from './parsers/columns30.js';
import columns28Parser from './parsers/columns28.js';
import columns24Parser from './parsers/columns24.js';
import columns32Parser from './parsers/columns32.js';
import columns19Parser from './parsers/columns19.js';
import columns31Parser from './parsers/columns31.js';
import columns8Parser from './parsers/columns8.js';
import columns33Parser from './parsers/columns33.js';
import columns13Parser from './parsers/columns13.js';
import cardsNoImages37Parser from './parsers/cardsNoImages37.js';
import hero35Parser from './parsers/hero35.js';
import accordion36Parser from './parsers/accordion36.js';
import cards39Parser from './parsers/cards39.js';
import hero41Parser from './parsers/hero41.js';
import columns40Parser from './parsers/columns40.js';
import accordion44Parser from './parsers/accordion44.js';
import columns29Parser from './parsers/columns29.js';
import cardsNoImages48Parser from './parsers/cardsNoImages48.js';
import columns43Parser from './parsers/columns43.js';
import columns51Parser from './parsers/columns51.js';
import hero49Parser from './parsers/hero49.js';
import cards50Parser from './parsers/cards50.js';
import hero53Parser from './parsers/hero53.js';
import columns26Parser from './parsers/columns26.js';
import columns47Parser from './parsers/columns47.js';
import columns42Parser from './parsers/columns42.js';
import columns56Parser from './parsers/columns56.js';
import cardsNoImages57Parser from './parsers/cardsNoImages57.js';
import columns55Parser from './parsers/columns55.js';
import columns54Parser from './parsers/columns54.js';
import cards58Parser from './parsers/cards58.js';
import columns21Parser from './parsers/columns21.js';
import hero61Parser from './parsers/hero61.js';
import accordion25Parser from './parsers/accordion25.js';
import hero63Parser from './parsers/hero63.js';
import columns62Parser from './parsers/columns62.js';
import columns64Parser from './parsers/columns64.js';
import columns60Parser from './parsers/columns60.js';
import columns45Parser from './parsers/columns45.js';
import cards67Parser from './parsers/cards67.js';
import accordion69Parser from './parsers/accordion69.js';
import cards66Parser from './parsers/cards66.js';
import columns71Parser from './parsers/columns71.js';
import cardsNoImages74Parser from './parsers/cardsNoImages74.js';
import columns65Parser from './parsers/columns65.js';
import columns76Parser from './parsers/columns76.js';
import cards78Parser from './parsers/cards78.js';
import columns72Parser from './parsers/columns72.js';
import columns79Parser from './parsers/columns79.js';
import cards80Parser from './parsers/cards80.js';
import columns81Parser from './parsers/columns81.js';
import cards73Parser from './parsers/cards73.js';
import columns82Parser from './parsers/columns82.js';
import columns34Parser from './parsers/columns34.js';
import columns77Parser from './parsers/columns77.js';
import columns70Parser from './parsers/columns70.js';
import columns75Parser from './parsers/columns75.js';
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
  accordion7: accordion7Parser,
  cards2: cards2Parser,
  columns9: columns9Parser,
  hero4: hero4Parser,
  hero3: hero3Parser,
  cards1: cards1Parser,
  hero10: hero10Parser,
  columns6: columns6Parser,
  cards14: cards14Parser,
  columns5: columns5Parser,
  cards16: cards16Parser,
  hero17: hero17Parser,
  cardsNoImages18: cardsNoImages18Parser,
  columns15: columns15Parser,
  cardsNoImages22: cardsNoImages22Parser,
  columns30: columns30Parser,
  columns28: columns28Parser,
  columns24: columns24Parser,
  columns32: columns32Parser,
  columns19: columns19Parser,
  columns31: columns31Parser,
  columns8: columns8Parser,
  columns33: columns33Parser,
  columns13: columns13Parser,
  cardsNoImages37: cardsNoImages37Parser,
  hero35: hero35Parser,
  accordion36: accordion36Parser,
  cards39: cards39Parser,
  hero41: hero41Parser,
  columns40: columns40Parser,
  accordion44: accordion44Parser,
  columns29: columns29Parser,
  cardsNoImages48: cardsNoImages48Parser,
  columns43: columns43Parser,
  columns51: columns51Parser,
  hero49: hero49Parser,
  cards50: cards50Parser,
  hero53: hero53Parser,
  columns26: columns26Parser,
  columns47: columns47Parser,
  columns42: columns42Parser,
  columns56: columns56Parser,
  cardsNoImages57: cardsNoImages57Parser,
  columns55: columns55Parser,
  columns54: columns54Parser,
  cards58: cards58Parser,
  columns21: columns21Parser,
  hero61: hero61Parser,
  accordion25: accordion25Parser,
  hero63: hero63Parser,
  columns62: columns62Parser,
  columns64: columns64Parser,
  columns60: columns60Parser,
  columns45: columns45Parser,
  cards67: cards67Parser,
  accordion69: accordion69Parser,
  cards66: cards66Parser,
  columns71: columns71Parser,
  cardsNoImages74: cardsNoImages74Parser,
  columns65: columns65Parser,
  columns76: columns76Parser,
  cards78: cards78Parser,
  columns72: columns72Parser,
  columns79: columns79Parser,
  cards80: cards80Parser,
  columns81: columns81Parser,
  cards73: cards73Parser,
  columns82: columns82Parser,
  columns34: columns34Parser,
  columns77: columns77Parser,
  columns70: columns70Parser,
  columns75: columns75Parser,
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

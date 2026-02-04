// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import 'dotenv/config';
import rehypeCitation from 'rehype-citation';
import remarkGfm from 'remark-gfm';
import remarkIgnoreCitationsInCode from './remark-ignore-citations-in-code.mjs';



/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '1000FARMS Docs',
  tagline: 'Guidebook for product use testing in agriculture',
  favicon: 'img/1000FARMS-wide.jpg',

  // Set the production url of your site here
  url: 'https://AgrDataSci.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/documentation/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'AgrDataSci', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },

   presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          sidebarCollapsed: true,
          editUrl: 'https://github.com/AgrDataSci/documentation/tree/main/',
          lastVersion: 'current',
          versions: {
            current: { label: 'current', path: '' },
          },
          remarkPlugins: [remarkIgnoreCitationsInCode, remarkGfm],
          rehypePlugins: [
            [
              rehypeCitation,
              {
                bibliography: 'docs/ref.bib',
                path: process.cwd(),
                linkCitations: true,
              },
            ],
          ],
        },

        blog: false,

        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: 'DN3EGM2WTS',
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: 'agrdatasciio',
        contextualSearch: true,
        externalUrlRegex: 'external\\.com|domain\\.com',
        replaceSearchResultPathname: { from: '/documentation/', to: '/' },
        searchParameters: {},
        searchPagePath: 'search',
        insights: false,
      },

      image: 'img/1000FARMS.jpg',

      navbar: {
        title: '1000FARMS Docs',
        logo: { alt: '1000FARMS logo', src: 'img/1000FARMS.jpg' },
        items: [
          { href: 'https://github.com/AgrDataSci/documentation', label: 'GitHub', position: 'right' },
          { type: 'localeDropdown', position: 'left' },
          { type: 'docsVersionDropdown', position: 'left' },
        ],
      },

      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Tutorial', to: '/' },
              { label: 'License', to: '/license' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'Community Of Practice website', href: 'https://community.1000farms.net/' },
              { label: 'ClimMob', href: 'https://1000farms.climmob.net/' },
              { label: 'Project website', href: 'https://1000farms.net/' },
            ],
          },
          {
            title: 'More',
            items: [{ label: 'GitHub', href: 'https://github.com/AgrDataSci/documentation' }],
          },
        ],
        copyright:
          `Copyright © ${new Date().getFullYear()} 1000FARMS. ` +
          `Content licensed under <a href="/documentation/license">CC BY-SA</a>. Built with Docusaurus.`,
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    };


export default config;

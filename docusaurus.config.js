// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import 'dotenv/config';
import rehypeCitation from 'rehype-citation';
import remarkGfm from 'remark-gfm';


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
    current: {
      label: 'current',
      path: '',
    },
  },
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    [
      rehypeCitation,
      {
        bibliography: 'docs/01-intro/ref.bib',
        path: process.cwd(),
        linkCitations: true,
      },
    ],
  ],
},

          },
        },
        blog: false,
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/${organizationName}/${projectName}/tree/main/',
        // },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'DN3EGM2WTS',

        // Public API key: it is safe to commit it
        apiKey: process.env.ALGOLIA_API_KEY,

        indexName: 'agrdatasciio',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'external\\.com|domain\\.com',

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: '/documentation/', // or as RegExp: /\/docs\//
          to: '/',
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

        // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
        insights: false,

        //... other Algolia params
      },
      // Replace with your project's social card
      image: 'img/1000FARMS.jpg',
      navbar: {
        title: '1000FARMS Docs',
        logo: {
          alt: '1000FARMS logo',
          src: 'img/1000FARMS.jpg',
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: 'Documentation',
          // },
         // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/AgrDataSci/documentation',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'left',
          },
          {
            type: 'docsVersionDropdown',
            versions: ['current', '1.0'],
          },
          // {
          //   type: 'docsVersionDropdown',
          // },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Community Of Practice website',
                href: 'https://community.1000farms.net/',
              },
              {
                label: 'ClimMob',
                href: 'https://1000farms.climmob.net/',
              },
              {
                label: 'Project website',
                href: 'https://1000farms.net/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              // {
              //   label: 'Blog',
              //   to: '/blog',
              // },
              {
                label: 'GitHub',
                href: 'https://github.com/AgrDataSci/documentation',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 1000FARMS. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },

    }),
};

export default config;

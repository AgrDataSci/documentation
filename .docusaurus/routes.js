import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/documentation/__docusaurus/debug',
    component: ComponentCreator('/documentation/__docusaurus/debug', '919'),
    exact: true
  },
  {
    path: '/documentation/__docusaurus/debug/config',
    component: ComponentCreator('/documentation/__docusaurus/debug/config', '30d'),
    exact: true
  },
  {
    path: '/documentation/__docusaurus/debug/content',
    component: ComponentCreator('/documentation/__docusaurus/debug/content', 'ffd'),
    exact: true
  },
  {
    path: '/documentation/__docusaurus/debug/globalData',
    component: ComponentCreator('/documentation/__docusaurus/debug/globalData', 'bf7'),
    exact: true
  },
  {
    path: '/documentation/__docusaurus/debug/metadata',
    component: ComponentCreator('/documentation/__docusaurus/debug/metadata', '6f8'),
    exact: true
  },
  {
    path: '/documentation/__docusaurus/debug/registry',
    component: ComponentCreator('/documentation/__docusaurus/debug/registry', 'dca'),
    exact: true
  },
  {
    path: '/documentation/__docusaurus/debug/routes',
    component: ComponentCreator('/documentation/__docusaurus/debug/routes', '721'),
    exact: true
  },
  {
    path: '/documentation/markdown-page',
    component: ComponentCreator('/documentation/markdown-page', 'd86'),
    exact: true
  },
  {
    path: '/documentation/search',
    component: ComponentCreator('/documentation/search', '648'),
    exact: true
  },
  {
    path: '/documentation/',
    component: ComponentCreator('/documentation/', '35e'),
    routes: [
      {
        path: '/documentation/1.0',
        component: ComponentCreator('/documentation/1.0', 'c7a'),
        routes: [
          {
            path: '/documentation/1.0',
            component: ComponentCreator('/documentation/1.0', 'e4d'),
            routes: [
              {
                path: '/documentation/1.0/',
                component: ComponentCreator('/documentation/1.0/', 'f7c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/appendices/appendices',
                component: ComponentCreator('/documentation/1.0/appendices/appendices', '297'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/climmob-suite/climmob_platform',
                component: ComponentCreator('/documentation/1.0/climmob-suite/climmob_platform', 'd0b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/climmob-suite/Design',
                component: ComponentCreator('/documentation/1.0/climmob-suite/Design', '74c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/climmob-suite/Getting_Started',
                component: ComponentCreator('/documentation/1.0/climmob-suite/Getting_Started', 'd5e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/climmob-suite/Implementation',
                component: ComponentCreator('/documentation/1.0/climmob-suite/Implementation', '47b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/climmob-suite/Monitoring',
                component: ComponentCreator('/documentation/1.0/climmob-suite/Monitoring', '9c6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/climmob-suite/Outputs',
                component: ComponentCreator('/documentation/1.0/climmob-suite/Outputs', '2f0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/climmob-suite/Share_your_project',
                component: ComponentCreator('/documentation/1.0/climmob-suite/Share_your_project', '22c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/data-analysis/data-analysis',
                component: ComponentCreator('/documentation/1.0/data-analysis/data-analysis', '616'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/data-analysis/Rinstat',
                component: ComponentCreator('/documentation/1.0/data-analysis/Rinstat', '7b2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/data-analysis/vignette-1-trait-prioritization-and-crop-performance',
                component: ComponentCreator('/documentation/1.0/data-analysis/vignette-1-trait-prioritization-and-crop-performance', '28a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/data-analysis/vignette-2-gari-eba-consumer-testing',
                component: ComponentCreator('/documentation/1.0/data-analysis/vignette-2-gari-eba-consumer-testing', 'ec4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/experimental-design/bean-protocol',
                component: ComponentCreator('/documentation/1.0/experimental-design/bean-protocol', 'e0e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/experimental-design/geographic-sampling',
                component: ComponentCreator('/documentation/1.0/experimental-design/geographic-sampling', 'a99'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/experimental-design/socioeconomic-sampling',
                component: ComponentCreator('/documentation/1.0/experimental-design/socioeconomic-sampling', '0b0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/experimental-design/standard-operating-procedures',
                component: ComponentCreator('/documentation/1.0/experimental-design/standard-operating-procedures', '633'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/experimental-design/tpp',
                component: ComponentCreator('/documentation/1.0/experimental-design/tpp', '6e9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/experimental-design/trial dimensions',
                component: ComponentCreator('/documentation/1.0/experimental-design/trial dimensions', 'af2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/FAQ and resources/FAQs',
                component: ComponentCreator('/documentation/1.0/FAQ and resources/FAQs', '2d3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/FAQ and resources/resources',
                component: ComponentCreator('/documentation/1.0/FAQ and resources/resources', '6e5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/feedback-dissemination/dissemination',
                component: ComponentCreator('/documentation/1.0/feedback-dissemination/dissemination', '6fc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/feedback-dissemination/feedback',
                component: ComponentCreator('/documentation/1.0/feedback-dissemination/feedback', '528'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/glossary',
                component: ComponentCreator('/documentation/1.0/glossary', '78e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/good-bad-ugly/bean-tari',
                component: ComponentCreator('/documentation/1.0/good-bad-ugly/bean-tari', 'ea0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/good-bad-ugly/case-studies',
                component: ComponentCreator('/documentation/1.0/good-bad-ugly/case-studies', 'f04'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/good-bad-ugly/cowpea-iita',
                component: ComponentCreator('/documentation/1.0/good-bad-ugly/cowpea-iita', 'f7e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/good-bad-ugly/groundnut-sari',
                component: ComponentCreator('/documentation/1.0/good-bad-ugly/groundnut-sari', 'b58'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/good-bad-ugly/groundnut-tari',
                component: ComponentCreator('/documentation/1.0/good-bad-ugly/groundnut-tari', '4ec'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/good-bad-ugly/maize-bayer',
                component: ComponentCreator('/documentation/1.0/good-bad-ugly/maize-bayer', '05b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/good-bad-ugly/maize-oneacrefund',
                component: ComponentCreator('/documentation/1.0/good-bad-ugly/maize-oneacrefund', '8a8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/good-bad-ugly/severalcrops-issd',
                component: ComponentCreator('/documentation/1.0/good-bad-ugly/severalcrops-issd', 'bb3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/good-bad-ugly/sweetpotato-cip',
                component: ComponentCreator('/documentation/1.0/good-bad-ugly/sweetpotato-cip', 'b6e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/implementation/implementation',
                component: ComponentCreator('/documentation/1.0/implementation/implementation', '912'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/introduction-to-tricot/introduction',
                component: ComponentCreator('/documentation/1.0/introduction-to-tricot/introduction', '9bc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/introduction-to-tricot/steps',
                component: ComponentCreator('/documentation/1.0/introduction-to-tricot/steps', 'ba9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/planning/Checklist',
                component: ComponentCreator('/documentation/1.0/planning/Checklist', '89b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/planning/Problem Identification',
                component: ComponentCreator('/documentation/1.0/planning/Problem Identification', '23e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/planning/Resources and Budgeting',
                component: ComponentCreator('/documentation/1.0/planning/Resources and Budgeting', '8d3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/1.0/planning/Stakeholder Engagement',
                component: ComponentCreator('/documentation/1.0/planning/Stakeholder Engagement', 'cc5'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      },
      {
        path: '/documentation/2.0',
        component: ComponentCreator('/documentation/2.0', '832'),
        routes: [
          {
            path: '/documentation/2.0',
            component: ComponentCreator('/documentation/2.0', 'f37'),
            routes: [
              {
                path: '/documentation/2.0/',
                component: ComponentCreator('/documentation/2.0/', 'e17'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/climmob-suite/ClimMob Platform',
                component: ComponentCreator('/documentation/2.0/climmob-suite/ClimMob Platform', 'd05'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/climmob-suite/Design',
                component: ComponentCreator('/documentation/2.0/climmob-suite/Design', '254'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/climmob-suite/Getting Started',
                component: ComponentCreator('/documentation/2.0/climmob-suite/Getting Started', '2ca'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/climmob-suite/Implementation',
                component: ComponentCreator('/documentation/2.0/climmob-suite/Implementation', 'd3f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/climmob-suite/Monitoring',
                component: ComponentCreator('/documentation/2.0/climmob-suite/Monitoring', '7dd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/climmob-suite/Outputs',
                component: ComponentCreator('/documentation/2.0/climmob-suite/Outputs', '34f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/climmob-suite/Share your project',
                component: ComponentCreator('/documentation/2.0/climmob-suite/Share your project', '5ad'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/data-analysis/data-analysis',
                component: ComponentCreator('/documentation/2.0/data-analysis/data-analysis', '79f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/data-analysis/Rinstat',
                component: ComponentCreator('/documentation/2.0/data-analysis/Rinstat', 'c9f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/data-analysis/vignette-1-trait-prioritization-and-crop-performance',
                component: ComponentCreator('/documentation/2.0/data-analysis/vignette-1-trait-prioritization-and-crop-performance', '7ba'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/data-analysis/vignette-2-gari-eba-consumer-testing',
                component: ComponentCreator('/documentation/2.0/data-analysis/vignette-2-gari-eba-consumer-testing', '6e5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/experimental-design/bean-protocol',
                component: ComponentCreator('/documentation/2.0/experimental-design/bean-protocol', '838'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/experimental-design/geographic-sampling',
                component: ComponentCreator('/documentation/2.0/experimental-design/geographic-sampling', '32b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/experimental-design/socioeconomic-sampling',
                component: ComponentCreator('/documentation/2.0/experimental-design/socioeconomic-sampling', 'a31'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/experimental-design/standard-operating-procedures',
                component: ComponentCreator('/documentation/2.0/experimental-design/standard-operating-procedures', '3cf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/experimental-design/tpp',
                component: ComponentCreator('/documentation/2.0/experimental-design/tpp', 'a8b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/experimental-design/trial dimensions',
                component: ComponentCreator('/documentation/2.0/experimental-design/trial dimensions', '228'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/FAQ-and-resources/FAQs',
                component: ComponentCreator('/documentation/2.0/FAQ-and-resources/FAQs', 'a98'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/FAQ-and-resources/tricot-resources',
                component: ComponentCreator('/documentation/2.0/FAQ-and-resources/tricot-resources', '96c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/feedback-dissemination/dissemination',
                component: ComponentCreator('/documentation/2.0/feedback-dissemination/dissemination', '739'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/feedback-dissemination/feedback',
                component: ComponentCreator('/documentation/2.0/feedback-dissemination/feedback', 'aa1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/glossary',
                component: ComponentCreator('/documentation/2.0/glossary', '224'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/good-bad-ugly/bean-tari',
                component: ComponentCreator('/documentation/2.0/good-bad-ugly/bean-tari', 'bf4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/good-bad-ugly/case-studies',
                component: ComponentCreator('/documentation/2.0/good-bad-ugly/case-studies', '89b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/good-bad-ugly/cowpea-iita',
                component: ComponentCreator('/documentation/2.0/good-bad-ugly/cowpea-iita', '28d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/good-bad-ugly/groundnut-sari',
                component: ComponentCreator('/documentation/2.0/good-bad-ugly/groundnut-sari', '501'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/good-bad-ugly/groundnut-tari',
                component: ComponentCreator('/documentation/2.0/good-bad-ugly/groundnut-tari', 'f38'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/good-bad-ugly/maize-bayer',
                component: ComponentCreator('/documentation/2.0/good-bad-ugly/maize-bayer', 'ec3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/good-bad-ugly/maize-oneacrefund',
                component: ComponentCreator('/documentation/2.0/good-bad-ugly/maize-oneacrefund', '175'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/good-bad-ugly/severalcrops-issd',
                component: ComponentCreator('/documentation/2.0/good-bad-ugly/severalcrops-issd', 'b4e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/good-bad-ugly/sweetpotato-cip',
                component: ComponentCreator('/documentation/2.0/good-bad-ugly/sweetpotato-cip', '2ca'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/implementation/implementation',
                component: ComponentCreator('/documentation/2.0/implementation/implementation', '577'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/introduction-to-tricot/checklist',
                component: ComponentCreator('/documentation/2.0/introduction-to-tricot/checklist', 'f29'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/introduction-to-tricot/introduction',
                component: ComponentCreator('/documentation/2.0/introduction-to-tricot/introduction', '6f9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/introduction-to-tricot/steps',
                component: ComponentCreator('/documentation/2.0/introduction-to-tricot/steps', '3a0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/planning/Problem Identification',
                component: ComponentCreator('/documentation/2.0/planning/Problem Identification', '317'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/planning/Resources and Budgeting',
                component: ComponentCreator('/documentation/2.0/planning/Resources and Budgeting', '889'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/2.0/planning/Stakeholder Engagement',
                component: ComponentCreator('/documentation/2.0/planning/Stakeholder Engagement', '3cf'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];

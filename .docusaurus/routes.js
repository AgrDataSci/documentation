import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/documentation/fr/markdown-page',
    component: ComponentCreator('/documentation/fr/markdown-page', 'b3b'),
    exact: true
  },
  {
    path: '/documentation/fr/search',
    component: ComponentCreator('/documentation/fr/search', 'fc3'),
    exact: true
  },
  {
    path: '/documentation/fr/',
    component: ComponentCreator('/documentation/fr/', 'bfe'),
    routes: [
      {
        path: '/documentation/fr/1.0',
        component: ComponentCreator('/documentation/fr/1.0', '833'),
        routes: [
          {
            path: '/documentation/fr/1.0',
            component: ComponentCreator('/documentation/fr/1.0', '013'),
            routes: [
              {
                path: '/documentation/fr/1.0/',
                component: ComponentCreator('/documentation/fr/1.0/', 'e64'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/appendices/appendices',
                component: ComponentCreator('/documentation/fr/1.0/appendices/appendices', 'e34'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/climmob-suite/climmob_platform',
                component: ComponentCreator('/documentation/fr/1.0/climmob-suite/climmob_platform', 'fdc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/climmob-suite/Design',
                component: ComponentCreator('/documentation/fr/1.0/climmob-suite/Design', '250'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/climmob-suite/Getting_Started',
                component: ComponentCreator('/documentation/fr/1.0/climmob-suite/Getting_Started', '910'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/climmob-suite/Implementation',
                component: ComponentCreator('/documentation/fr/1.0/climmob-suite/Implementation', 'a81'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/climmob-suite/Monitoring',
                component: ComponentCreator('/documentation/fr/1.0/climmob-suite/Monitoring', '91d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/climmob-suite/Outputs',
                component: ComponentCreator('/documentation/fr/1.0/climmob-suite/Outputs', '6dd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/climmob-suite/Share_your_project',
                component: ComponentCreator('/documentation/fr/1.0/climmob-suite/Share_your_project', '92a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/data-analysis/data-analysis',
                component: ComponentCreator('/documentation/fr/1.0/data-analysis/data-analysis', '4cc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/data-analysis/Rinstat',
                component: ComponentCreator('/documentation/fr/1.0/data-analysis/Rinstat', '744'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/data-analysis/vignette-1-trait-prioritization-and-crop-performance',
                component: ComponentCreator('/documentation/fr/1.0/data-analysis/vignette-1-trait-prioritization-and-crop-performance', '850'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/data-analysis/vignette-2-gari-eba-consumer-testing',
                component: ComponentCreator('/documentation/fr/1.0/data-analysis/vignette-2-gari-eba-consumer-testing', '2c3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/experimental-design/bean-protocol',
                component: ComponentCreator('/documentation/fr/1.0/experimental-design/bean-protocol', '4da'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/experimental-design/geographic-sampling',
                component: ComponentCreator('/documentation/fr/1.0/experimental-design/geographic-sampling', '075'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/experimental-design/socioeconomic-sampling',
                component: ComponentCreator('/documentation/fr/1.0/experimental-design/socioeconomic-sampling', '9ed'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/experimental-design/standard-operating-procedures',
                component: ComponentCreator('/documentation/fr/1.0/experimental-design/standard-operating-procedures', 'b6e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/experimental-design/tpp',
                component: ComponentCreator('/documentation/fr/1.0/experimental-design/tpp', 'eef'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/experimental-design/trial dimensions',
                component: ComponentCreator('/documentation/fr/1.0/experimental-design/trial dimensions', 'a83'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/FAQ and resources/FAQs',
                component: ComponentCreator('/documentation/fr/1.0/FAQ and resources/FAQs', '272'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/FAQ and resources/resources',
                component: ComponentCreator('/documentation/fr/1.0/FAQ and resources/resources', 'b4f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/feedback-dissemination/dissemination',
                component: ComponentCreator('/documentation/fr/1.0/feedback-dissemination/dissemination', '681'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/feedback-dissemination/feedback',
                component: ComponentCreator('/documentation/fr/1.0/feedback-dissemination/feedback', '8b2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/glossary',
                component: ComponentCreator('/documentation/fr/1.0/glossary', '9da'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/good-bad-ugly/bean-tari',
                component: ComponentCreator('/documentation/fr/1.0/good-bad-ugly/bean-tari', 'd1c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/good-bad-ugly/case-studies',
                component: ComponentCreator('/documentation/fr/1.0/good-bad-ugly/case-studies', '370'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/good-bad-ugly/cowpea-iita',
                component: ComponentCreator('/documentation/fr/1.0/good-bad-ugly/cowpea-iita', 'fba'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/good-bad-ugly/groundnut-sari',
                component: ComponentCreator('/documentation/fr/1.0/good-bad-ugly/groundnut-sari', 'fb1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/good-bad-ugly/groundnut-tari',
                component: ComponentCreator('/documentation/fr/1.0/good-bad-ugly/groundnut-tari', '8c3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/good-bad-ugly/maize-bayer',
                component: ComponentCreator('/documentation/fr/1.0/good-bad-ugly/maize-bayer', '5b3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/good-bad-ugly/maize-oneacrefund',
                component: ComponentCreator('/documentation/fr/1.0/good-bad-ugly/maize-oneacrefund', '498'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/good-bad-ugly/severalcrops-issd',
                component: ComponentCreator('/documentation/fr/1.0/good-bad-ugly/severalcrops-issd', 'd0b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/good-bad-ugly/sweetpotato-cip',
                component: ComponentCreator('/documentation/fr/1.0/good-bad-ugly/sweetpotato-cip', 'c07'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/implementation/implementation',
                component: ComponentCreator('/documentation/fr/1.0/implementation/implementation', '615'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/introduction-to-tricot/introduction',
                component: ComponentCreator('/documentation/fr/1.0/introduction-to-tricot/introduction', 'f01'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/introduction-to-tricot/steps',
                component: ComponentCreator('/documentation/fr/1.0/introduction-to-tricot/steps', '115'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/planning/Checklist',
                component: ComponentCreator('/documentation/fr/1.0/planning/Checklist', 'e55'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/planning/Problem Identification',
                component: ComponentCreator('/documentation/fr/1.0/planning/Problem Identification', '241'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/planning/Resources and Budgeting',
                component: ComponentCreator('/documentation/fr/1.0/planning/Resources and Budgeting', '7ac'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/1.0/planning/Stakeholder Engagement',
                component: ComponentCreator('/documentation/fr/1.0/planning/Stakeholder Engagement', '455'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      },
      {
        path: '/documentation/fr/',
        component: ComponentCreator('/documentation/fr/', '9ce'),
        routes: [
          {
            path: '/documentation/fr/',
            component: ComponentCreator('/documentation/fr/', '75f'),
            routes: [
              {
                path: '/documentation/fr/climmob-suite/ClimMob Platform',
                component: ComponentCreator('/documentation/fr/climmob-suite/ClimMob Platform', 'cfb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/climmob-suite/Design',
                component: ComponentCreator('/documentation/fr/climmob-suite/Design', 'a30'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/climmob-suite/Getting Started',
                component: ComponentCreator('/documentation/fr/climmob-suite/Getting Started', '6aa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/climmob-suite/Implementation',
                component: ComponentCreator('/documentation/fr/climmob-suite/Implementation', '6a8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/climmob-suite/Monitoring',
                component: ComponentCreator('/documentation/fr/climmob-suite/Monitoring', 'c6f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/climmob-suite/Outputs',
                component: ComponentCreator('/documentation/fr/climmob-suite/Outputs', 'ac6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/climmob-suite/Share your project',
                component: ComponentCreator('/documentation/fr/climmob-suite/Share your project', '1a0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/data-analysis/data-analysis',
                component: ComponentCreator('/documentation/fr/data-analysis/data-analysis', '0ea'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/data-analysis/Rinstat',
                component: ComponentCreator('/documentation/fr/data-analysis/Rinstat', '63d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/data-analysis/vignette-1-trait-prioritization-and-crop-performance',
                component: ComponentCreator('/documentation/fr/data-analysis/vignette-1-trait-prioritization-and-crop-performance', '85b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/data-analysis/vignette-2-gari-eba-consumer-testing',
                component: ComponentCreator('/documentation/fr/data-analysis/vignette-2-gari-eba-consumer-testing', 'f5e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/experimental-design/bean-protocol',
                component: ComponentCreator('/documentation/fr/experimental-design/bean-protocol', '8db'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/experimental-design/geographic-sampling',
                component: ComponentCreator('/documentation/fr/experimental-design/geographic-sampling', '41a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/experimental-design/socioeconomic-sampling',
                component: ComponentCreator('/documentation/fr/experimental-design/socioeconomic-sampling', '01d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/experimental-design/standard-operating-procedures',
                component: ComponentCreator('/documentation/fr/experimental-design/standard-operating-procedures', '835'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/experimental-design/tpp',
                component: ComponentCreator('/documentation/fr/experimental-design/tpp', '46c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/experimental-design/trial dimensions',
                component: ComponentCreator('/documentation/fr/experimental-design/trial dimensions', 'f3d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/FAQ-and-resources/FAQs',
                component: ComponentCreator('/documentation/fr/FAQ-and-resources/FAQs', '0bd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/FAQ-and-resources/tricot-resources',
                component: ComponentCreator('/documentation/fr/FAQ-and-resources/tricot-resources', 'c62'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/feedback-dissemination/dissemination',
                component: ComponentCreator('/documentation/fr/feedback-dissemination/dissemination', 'f8e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/feedback-dissemination/feedback',
                component: ComponentCreator('/documentation/fr/feedback-dissemination/feedback', '2f9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/glossary',
                component: ComponentCreator('/documentation/fr/glossary', '47e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/good-bad-ugly/bean-tari',
                component: ComponentCreator('/documentation/fr/good-bad-ugly/bean-tari', '9a8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/good-bad-ugly/case-studies',
                component: ComponentCreator('/documentation/fr/good-bad-ugly/case-studies', '46e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/good-bad-ugly/cowpea-iita',
                component: ComponentCreator('/documentation/fr/good-bad-ugly/cowpea-iita', 'b19'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/good-bad-ugly/groundnut-sari',
                component: ComponentCreator('/documentation/fr/good-bad-ugly/groundnut-sari', '8f7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/good-bad-ugly/groundnut-tari',
                component: ComponentCreator('/documentation/fr/good-bad-ugly/groundnut-tari', 'cba'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/good-bad-ugly/maize-bayer',
                component: ComponentCreator('/documentation/fr/good-bad-ugly/maize-bayer', 'ef1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/good-bad-ugly/maize-oneacrefund',
                component: ComponentCreator('/documentation/fr/good-bad-ugly/maize-oneacrefund', '2eb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/good-bad-ugly/severalcrops-issd',
                component: ComponentCreator('/documentation/fr/good-bad-ugly/severalcrops-issd', '9e2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/good-bad-ugly/sweetpotato-cip',
                component: ComponentCreator('/documentation/fr/good-bad-ugly/sweetpotato-cip', 'a68'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/implementation/implementation',
                component: ComponentCreator('/documentation/fr/implementation/implementation', '7f3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/introduction-to-tricot/checklist',
                component: ComponentCreator('/documentation/fr/introduction-to-tricot/checklist', '504'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/introduction-to-tricot/introduction',
                component: ComponentCreator('/documentation/fr/introduction-to-tricot/introduction', 'c3f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/introduction-to-tricot/steps',
                component: ComponentCreator('/documentation/fr/introduction-to-tricot/steps', '485'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/planning/Problem Identification',
                component: ComponentCreator('/documentation/fr/planning/Problem Identification', '01a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/planning/Resources and Budgeting',
                component: ComponentCreator('/documentation/fr/planning/Resources and Budgeting', '56a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/planning/Stakeholder Engagement',
                component: ComponentCreator('/documentation/fr/planning/Stakeholder Engagement', '2fb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/fr/',
                component: ComponentCreator('/documentation/fr/', '56a'),
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

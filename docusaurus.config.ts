import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const globalVariables = {
  'current': {
    'branch': '2.x',
    'file.server.version': '2.0.0',
    'file.client.version': '2.0.0'
  },
  '1.x': {
    'branch': '1.x',
    'file.server.version': '1.0.0',
    'file.client.version': '1.0.0'
  }
}

const config: Config = {
  title: 'File Server',
  tagline: 'Grote Berichten File Server',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://eluinstra.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/file-server/',
  deploymentBranch: 'gh-pages',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'eluinstra', // Usually your GitHub org/user name.
  projectName: 'file-server', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          // includeCurrentVersion: false,
          lastVersion: 'current',
          versions: {
            current: {
              label: '2.x',
              path: '',
            },
          },    
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/eluinstra/file-server-documentation/edit/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  markdown: {
    preprocessor: ({filePath, fileContent}) => {
      var key = '';
      var found = false;
      for (key in globalVariables) {
        let folderName = (key == 'current' ? 'current' : `version-${key}`);
        if (filePath.includes(`/${folderName}/`)) {
          found = true;
          break;
        }
      }
      if (key == '' || !found) {
        key = 'current';
      }
      let content = fileContent;
      for (const variable in globalVariables[key]) {
        content = content.replaceAll('@'+variable+'@', globalVariables[key][variable]);
      }
      return content
    },
  },
  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'File Server',
      logo: {
        alt: 'File Server Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docsVersionDropdown',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/eluinstra/file-server-documentation/',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
      ],
      copyright: `Copyright © ${new Date().getFullYear()} File Server.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [[require.resolve("docusaurus-lunr-search"), {
    enableHighlight: true
  }]],
};

export default config;

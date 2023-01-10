import { mergeConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import path from 'path'

/**
 * @type {import('@storybook/sveltekit').StorybookConfig}
 */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|ts|svelte)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-svelte-csf',
  ],
  framework: {
    name: '@storybook/sveltekit',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Use the same "resolve" configuration as your app
      resolve: {
        alias: {
          $lib: path.resolve(__dirname, '../src/lib'),
        },
      },
      plugins: [
        Icons({
          compiler: 'svelte',
        }),
      ],
      // Add dependencies to pre-optimization
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
    })
  },
}

export default config

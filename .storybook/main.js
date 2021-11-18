const customWebpackConfig = require("../webpack-dev.config.js");

module.exports = {
	"stories": [
		"../src/**/*.stories.mdx",
		"../src/**/*.stories.@(js|jsx|ts|tsx)"
	],
	"addons": [
		"@storybook/addon-links",
		"@storybook/addon-essentials"
	],
  "core": {
    "builder": "webpack5"
  },
	webpackFinal: (config) => {
		return {
			...config,
			resolve: {
				...config.resolve,
				alias: {
					...config.resolve.alias,
          ...customWebpackConfig.resolve.alias
				}
			}
		}
	}
};
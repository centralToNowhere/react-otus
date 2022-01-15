const customWebpackConfig = require("../webpack-dev.config.js");
const path = require("path");
const fs = require("fs");
const { merge } = require("webpack-merge");

function getPackageDir(filepath) {
	let currDir = path.dirname(require.resolve(filepath));
	while (true) {
		if (fs.existsSync(path.join(currDir, "package.json"))) {
			return currDir;
		}
		const { dir, root } = path.parse(currDir);
		if (dir === root) {
			throw new Error(
				`Could not find package.json in the parent directories starting from ${filepath}.`
			);
		}
		currDir = dir;
	}
}

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
	babel: async () => ({
		// 1. want to use new jsx transform https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
		// 2. want to use emotion css property
		// 3. From storybook docs: If your project has a .babelrc file, we'll use that instead of the default config file.
		// 4. Got @emotion/babel-plugin inside project's root .babelrc
		// 5. Expected: storybook uses project's .babelrc and css property starts to work;
		// 		Reality: seems like storybook uses it, but emotion css property not works in stories
		// 6. From storybook docs:
		//    If you need, you can customize the default Babel configuration used by Storybook.
		//    Update your .storybook/main.js and add the babel field with the options you want to use
		//    Okay, works. But how it is uses project's .babelrc by default then, if it works only after override????
		"plugins": ["@emotion/babel-plugin"]
	}),
	webpackFinal: async (config) => {
		// without this storybook can't resolve emotion v11 modules, they were renamed? from v10
		// example of error:
		// ModuleNotFoundError: Module not found: Error:
		// Can't resolve '@emotion/styled/base' in '/home/try/dev/react-otus/src/components/RegistrationScreen'
		// https://stackoverflow.com/questions/65894711/module-not-found-error-cant-resolve-emotion-styled-base-when-running-story
		return {
			...config,
			resolve: {
				...config.resolve,
				alias: {
					...config.resolve.alias,
          ...customWebpackConfig.resolve.alias,
					"@emotion/core": getPackageDir("@emotion/react"),
					"@emotion/styled": getPackageDir("@emotion/styled"),
					"emotion-theming": getPackageDir("@emotion/react"),
				}
			}
		}
	}
};
const webpack = require("webpack");
const webpackConfig = require("./webpack.prod");
const ora = require("ora");
const chalk = require("chalk");

const spinner = ora("Start compiling...\n").start();

webpack(webpackConfig, function (errors, state) {
	if (errors) {
		spinner.fail("Fail to compile");
		console.error(errors);
		return;
	}
	spinner.succeed("Compile success\n");

	process.stdout.write(
		state.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false,
		}) + "\n\n"
	);
});

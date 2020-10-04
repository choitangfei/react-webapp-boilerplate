const path = require("path");
const { merge } = require("webpack-merge");
const commonWebpackConfig = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(commonWebpackConfig, {
	mode: "development",
	output: {
		filename: "js/[name].[hash:8].js",
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			showErrors: true,
			template: path.resolve(__dirname, "../public/index.html"),
			minify: {
				html5: true,
			},
			hash: false,
		}),
	],
	devServer: {
		port: 3000,
		host: "localhost",
		contentBase: path.join(__dirname, "../public"),
		watchContentBase: true,
		publicPath: "/",
		compress: true,
		historyApiFallback: true,
		hot: true,
		clientLogLevel: "error",
		open: true,
		overlay: false,
		quiet: false,
		noInfo: false,
		watchOptions: {
			ignored: /node_modules/,
		},
		proxy: {},
	},
	stats: {
		colors: true,
	},
});

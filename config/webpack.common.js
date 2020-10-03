const path = require('path');
const APP_PATH = path.resolve(__dirname, '../src');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const argv = require('yargs').argv;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackConfig = {
	plugins: []
};

if(argv.report){
	webpackConfig.plugins.push(new BundleAnalyzerPlugin({
		analyzerMode: 'static',
		openAnalyzer: false,
		reportFilename: path.join(__dirname, '../dist/report.html')
	}));
}

module.exports = merge(webpackConfig, {
	entry: {
		app: './src/index.ts'
	},
	output: {
		filename: 'js/[name].bundle.js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.(html)$/,
				loader: 'html-loader'
			},
			{
				test: /\.(j|t)sx?$/,
				include: APP_PATH,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-react',
								'@babel/preset-env'
							],
							plugins: [
								['@babel/plugin-proposal-class-properties', { loose: true }]
							],
							cacheDirectory: true
						}
					},
					{
						loader: 'awesome-typescript-loader'
					}
				]
			},
			{
				test: /\.(less|css)$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: false
						}
					},
					'postcss-loader',
					{
						loader: 'less-loader',
						options: { javascriptEnabled: true }
					}
				]
			},
			{
				test: /\.svg$/,
				use: [ '@svgr/webpack' ]
			},
			{
				test: /\.(jpg|jpeg|bmp|png|webp|gif)$/,
				use: [ 'file-loader' ]
			},
		]
	},
	resolve: {
		extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
		alias: {
			'App': path.resolve(__dirname, '../src/')
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: path.resolve(__dirname, '../public/index.html'),
			showErrors: true
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'public',
					globOptions: {
						ignore: [
							'index.html'
						]
					}
				}
			]
		})
	],
	optimization: {}
});

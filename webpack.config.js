module.exports = {
	entry: "./src/cross-validation.ts",
	output: {
		filename: "./build/cross-validation.js",
		libraryTarget: "var",
		library: "CrossValidator"
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loader: 'typescript-loader'
			}
		]
	}
};
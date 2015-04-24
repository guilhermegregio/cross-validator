module.exports = {
	entry: "./src/cross-validation.ts",
	output: {
		filename: "./build/cross-validation.min.js",
		libraryTarget: "var",
		library: "CrossValidator"
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
	},
	minimize: true,
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loader: 'typescript-loader'
			}
		]
	}
};
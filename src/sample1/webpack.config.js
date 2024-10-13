const path = require('path');

module.exports = {
    entry: './src/sample1/webResources/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
        modules: [path.resolve(__dirname, 'webResources')],
    },
    output: {
        filename: 'sample1_index.js',
        path: path.resolve(__dirname, 'dist/webResources'),
        library: 'sample1',
    },
};
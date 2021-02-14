const path = require('path');

module.exports = {
    entry: './demo/demo.ts',
    output: {
        path: path.resolve(__dirname, 'demo'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js'
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.ts?$/i,
                loader: 'ts-loader',
                options: {
                    allowTsInNodeModules: true
                }
            }
        ]
    },
    mode: 'production'
};
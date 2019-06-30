const commonConfig = require('./webpack.common.js');
const merge = require('webpack-merge');
const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    optimization: {},
    plugins: [
       
    ]
};


module.exports = merge(commonConfig, prodConfig);
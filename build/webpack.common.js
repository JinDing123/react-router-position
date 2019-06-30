const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        main: './src/index.js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            // 合理配置了 pages, 就可以直接写 pages， 活学活用嘛
            'pages': path.resolve(__dirname, '../src/pages'),
            'components': path.resolve(__dirname, '../src/components'),
            'common': path.resolve(__dirname, '../src/common'),
            'models': path.resolve(__dirname, '../src/models'),
            'utils': path.resolve(__dirname, '../src/utils')
        } 
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,  // 编译 react
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                // 图片，字体等资源，不要通过copyWebpackPlugin直接copy过去，而是正常打包，通过指定这里的 outputPath就可以了，图片字体本来就需要打包，你直接拷贝过去就没有打包了，傻逼
                test: /\.(jpg|png|svg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        limit: 2048,
                        outputPath: 'static/images'  // 打包的图片，放在 dist 的某个路径下 这里是放在dist/images下面 
                    }
                },
            },
            {
                test: /\.(eot|ttf|svg|woff|woff2|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name][hash:8].[ext]',
                        outputPath: 'static/icons'
                    }

                }
            },
        ],

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        }),
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin(  // 图片，字体等资源，本来就需要打包，所以不要直接copy过去，而是通过 file-loader的outputPath，指定图片打包的路径，CopyWebpackPlugin 是用来处理一些 index.html 里面引入的 脚本的
        //     [
        //         // 一次性把static 里面的文件全部拷贝过来，不需要单独写 images icons 牛逼
        //         {
        //             from: path.resolve(__dirname, '../src/static'),
        //             to: path.resolve(__dirname, '../dist/static')
        //         },

        //     ]
        // )
    ],
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
}

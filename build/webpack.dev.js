const commonConfig = require('./webpack.common.js');
const merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 是把 css文件单独提取出来，放到一个css文件里面
const devConfig = {
    mode: 'development',
    devtool: 'cheap-eval-module-source-map',
    devServer: {
        contentBase: '/dist',
        hot: true,
        hotOnly: true,
        historyApiFallback: true,  // 单页应用必须要配置这个，否则路由跳转不正确
        proxy: {
            /* 
                跨域配置1   login/index.jsx 45-48
                请求的地址是 api/manage/user/login.do

                和target对应的地址拼接之后  http://admintest.happymmall.com/api/manage/user/login.do 
                pathRewrite 把 以api 开头的api去掉 变成，这就是真实地址
                http://admintest.happymmall.com/manage/user/login.do
            */
            '/api': {
                // 这里是把 target 的地址，和请求的地址拼接，而不是直接替换，pathReWrite才会替换
                target: 'http://admintest.happymmall.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },

            /*
                跨域配置2  login/index.jsx 50-53
                请求的地址是 /manage/user/login.do

                和target对应的地址拼接之后  http://admintest.happymmall.com/manage/user/login.do 这就是真实地址 省略了上面的pathRewrite 感觉比较简单
            */
            '/manage': {
                target: 'http://admintest.happymmall.com',
                changeOrigin: true
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {  // 原来是用style-loader，style-loader自动帮你配置好了 hmr，现在是使用 mini, 把css文件单独提取了出来，需要配置hmr，才能让hmr生效
                            hmr: true,
                            reloadAll: true
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: 'all',  // 对import 引入的代码都进行分割
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            // 这里加上 css/ 打包路径就不对了
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ]
};


module.exports = merge(commonConfig, devConfig);
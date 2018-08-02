//引入node.js的路徑套件
const path = require('path');
//引入webpack套件
const webpack = require('webpack');
//引入webpack產生css檔案的套件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//引入webpack產生html檔案的套件
const HTMLPlugin = require('html-webpack-plugin');

//js檔案預設輸出的物件
module.exports = {
  //wepback的整合模式，分為開發模式以及生產模式
  mode: 'development',
  //產生.map檔案，協助開發，需配合mode使用
  devtool: 'source-map',
  //webpack的進入點
  entry: {
    //進入點的模組名稱為index
    index: [
      './src/index.js',
      //Bootstap用到的css檔案
      'bootstrap/dist/css/bootstrap.min.css',
      './src/index.css',
    ],
  },
  //webpack整合後的輸出設定
  output: {
    //webpack整合後的資料夾名稱，使用node.js的path套件解決路徑問題
    path: path.resolve('build'),
    //webpack整合後的檔案名稱,name代表進入點的模組名稱
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            //用來產生css檔案的loader
            loader: MiniCssExtractPlugin.loader,
          },
          {
            //用來讀取css的loader
            loader: 'css-loader',
            options: {
              minimize: true,
              sourceMap: true,
            },
          },
        ],
      }
    ]
  },
  plugins:[
    //產生html檔案，預設會引入所有模組的js以及css檔案
    new HTMLPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    //產生css檔案,name為模組名稱
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    //webpack dev-server的熱替換(hot module replace)套件
    new webpack.HotModuleReplacementPlugin(),   
    //將jquery設定成預設變數，因為需要使用JQuery
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jquery': 'jquery',
    })
  ],
  //開發用的伺服器設定
  devServer: {
    //webpack整合完的檔案資料夾位置
    contentBase: path.join('build'),
    //不顯示devServer相關終端機訊息
    noInfo: true,
    //指定devServer的port
    port: 3000,
    //是否自動開啟瀏覽器
    open: true,
    //是否將devserver的訊息顯示在畫面上
    inline: false,
    //是否使用熱替換(hot module replace)，需搭配熱替換套件使用
    hot: true
  },
  //因為這個範例整合完的js檔案太大，所以要關掉webpack的效能提示
  performance: { hints: false }
}
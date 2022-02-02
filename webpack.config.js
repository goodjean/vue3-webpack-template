//import
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
// export
module.exports = {
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'src/assets')
    }
  },
  //parcel index.html
  //파일을 읽어들이기 시작하는 진입점 설정
  entry: './src/main.js',

  //결과물(번들)을 변환하는 설정
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
    clean: true
  },

  module: {
    rules: [
      {
        test:/\.vue$/,
        use:'vue-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'postcss-loader', //후처리기, 다양한 플러그인을 수행할 환경일뿐임.
          'sass-loader'//전처리기
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'  //js compiler 최신버전 js문법도 브라우저가 이해할수 있게 변환해줌(es6, es7 => es5)
        ]
      },
      {
        test:/\.(png|jpe?g|gif|webp)$/,
        use: 'file-loader'
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        {  from: 'static' }
      ]
    }),
    new VueLoaderPlugin()
  ],

  devServer: {
    host: 'localhost'
  }
}
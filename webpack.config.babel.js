/*
    ./webpack.config.js
*/
import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
})

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist')
}

// THIS REFERS TO START OR PRODUCTION COMMAND IN package.json
const LAUNCH_COMMAND = process.env.npm_lifecycle_event
const isProduction = LAUNCH_COMMAND === 'production' 
// CONNECTS LAUNCH_COMMAND TO env IN .babelrc
process.env.BABEL_ENV = LAUNCH_COMMAND
// WHEN WE INCLUDE productionPlugin IN OUR PLUGINS, IT WILL TELL REACT WE ARE IN PRODUCTION MODE
const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

const base = {
  // SINCE OUR "main" IN OUR PACKAGE.JSON IS index.js,
  // WE CAN CHANGE TO PATHS.src
  //entry: './src/index.js',
  entry: [
    PATHS.src
  ],
  output: {
    //path: path.resolve('/dist/'),
    //path: __dirname + '/dist',
    path: PATHS.build,
    filename: 'index_bundle.js'
  },
  // long crazy line in the css loader is partially to make css readable in dev tools
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
      { test: /\.css$/, loader: 'style-loader!css-loader?sourceMap&modules&localIdentName=[name]__[local]__[hash:base64:5]'},
      { test: /\.scss$/, loaders: ["style", "css", "sass"], exclude: "/node_modules" },
    ]
  }
}

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    progress: true,
  },
  plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
}

const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [HtmlWebpackPluginConfig, productionPlugin]
}

export default Object.assign({}, base, 
  isProduction === true ? productionConfig : developmentConfig
)

// // BELOW IS WHAT IS USED WITHOUT DEV/PRODUCTION SPECIFICATION
// module.exports = {
//   devtool: 'cheap-module-source-map',
//   // SINCE OUR "main" IN OUR PACKAGE.JSON IS index.js,
//   // WE CAN CHANGE TO PATHS.src
//   //entry: './src/index.js',
//   entry: PATHS.src,
//   output: {
//     //path: path.resolve('/dist/'),
//     //path: __dirname + '/dist',
//     path: PATHS.build,
//     filename: 'index_bundle.js'
//   },
//   module: {
//     loaders: [
//       { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
//       { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
//       { test: /\.css$/, loader: 'style-loader!css-loader'},
//       { test: /\.scss$/, loaders: ["style", "css", "sass"], exclude: "/node_modules" },
//     ]
//   },
//   // resolve: { 
//   //   root: path.resolve('./src') // THIS ALLOWS FOR EXPORTING WITH 'components' INSTEAD OF '../components'
//   // },
//   plugins: [HtmlWebpackPluginConfig, productionPlugin]
// }
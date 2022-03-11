module.exports = {
    entry: './src/js/main.js',
    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        test: /\.css$/,
        use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
            //   options: {
            //     // modules: {
            //     //     localIdentName: "[path][name]__[local]--[hash:base64:5]",
            //     // },		
            //     modules: true,
            //     importLoaders: 1,
            //   }
            }
          ]
      }]
    }
  }
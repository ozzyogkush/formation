'use strict';

// We specify the exposed modules/objects/classes here as it is the WebPacker's
// concern as to what needs to be exposed to the browser, NOT the module itself's job.
module.exports = {
  entry: './src/formation.js',
  output: {
    path: './dist',
    filename: 'formation.js'
  },
  module : {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: require.resolve('jquery'), loader : 'expose?$!expose?jQuery' },
      { test: require.resolve('./src/formation'), loader : 'expose?Formation' }
    ]
  }
};

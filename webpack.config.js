const path = require('path');

module.exports = [
  {
    // CommonJS Configuration
    target: 'node',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'svgo-crop-plugin.cjs.js',
      libraryTarget: 'commonjs2'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript']
            }
          },
          exclude: /node_modules/
        }
      ]
    }
  },
  {
    // ES Module Configuration
    target: 'node',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'svgo-crop-plugin.esm.js',
      libraryTarget: 'module',
      library: {
        type: 'module'
      },
      chunkFormat: 'module' // Specify chunk format
    },
    experiments: {
      outputModule: true
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript']
            }
          },
          exclude: /node_modules/
        }
      ]
    }
  }
];

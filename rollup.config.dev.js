import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload'
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';

const vendorBundle = {
  // cache: true,

  dest: 'public/vendor.js',

  entry: 'src/dependencies.js',

  exports: 'named',

  format: 'iife',

  moduleName: 'vendor',

  plugins: [
    resolve({
      browser: true
    }),

    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/react.js': ['Component', 'PropTypes']
      }
    }),

    replace({
      'process.env.NODE_ENV': '\'development\''
    })
  ],

  sourceMap: false
};

const appBundle = {
  // cache: true,

  dest: 'public/bundle.js',

  entry: 'src/index.tsx',

  external: [
    'react',
    'react-dom'
  ],

  format: 'iife',

  globals: {
    'react': 'vendor.React',
    'react-dom': 'vendor.ReactDom'
  },

  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),

    typescript({
      typescript: require('typescript/lib/typescript.js')
    }),

    livereload()
  ],

  sourceMap: true
};

export default [appBundle, vendorBundle]

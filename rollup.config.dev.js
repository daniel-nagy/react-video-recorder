import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';

export default {
  // cache: true,

  dest: 'public/bundle.js',

  entry: 'src/index.tsx',

  format: 'iife',

  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),

    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/react.js': ['Component', 'PropTypes']
      }
    }),

    replace({
      'process.env.NODE_ENV': '\'development\''
    }),

    typescript()

    // typescript({
    //   "jsx": "react",
    //   "removeComments": true,
    //   "include": [
    //     "src/**/*"
    //   ],
    //   "exclude": [
    //     "node_modules",
    //   ]
    // })
  ],

  sourceMap: true
};

import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import postcss from 'rollup-plugin-postcss';
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

export default {
  input: "src/main.js",
  output: {
    file: "dist/bundle.js",
    format: "umd",
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      extensions: [".js"],
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    eslint({
      parser: "@babel/eslint-parser",
      parseOptions: {
        sourceType: "module"
      },
      include: ['src/**/*.js']
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ["@babel/preset-react"],
    }),
    image(),
    commonjs(),
    postcss({
      extensions: ['.css'],
    }),
    serve({
      open: true,
      verbose: true,
      contentBase: ["", "public"],
      host: "localhost",
      port: 3001,
    }),
    livereload({ watch: "dist" }),
  ]
};;

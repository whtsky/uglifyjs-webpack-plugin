[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![test][test]][test-url]
[![coverage][cover]][cover-url]


<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon.svg">
  </a>
  <h1>UglifyJS Webpack Plugin</h1>
	<p>This plugin uses <a href="https://github.com/mishoo/UglifyJS2/">UglifyJS v3 </a>to minify your JavaScript</p>
</div>

<h2 align="center">Install</h2>

```bash
npm i -D uglifyjs-3-webpack-plugin
```

<h2 align="center">Usage</h2>

**webpack.config.js**
```js
const UglifyJsPlugin = require('uglifyjs-3-webpack-plugin')

module.exports = {
  plugins: [
    new UglifyJsPlugin()
  ]
}
```

<h2 align="center">Options</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`test`**|`{RegExp\|Array<RegExp>}`| <code>/\\.js$/i</code>|Test to match files against|
|**`include`**|`{RegExp\|Array<RegExp>}`|`undefined`|Files to `include`|
|**`exclude`**|`{RegExp\|Array<RegExp>}`|`undefined`|Files to `exclude`|
|**`cache`**|`{Boolean\|String}`|`false`|Enable file caching|
|**`parallel`**|`{Boolean\|Number}`|`false`|Use multi-process parallel running to improve the build speed|
|**`sourceMap`**|`{Boolean}`|`false`|Use source maps to map error message locations to modules (This slows down the compilation) ⚠️ **`cheap-source-map` options don't work with this plugin**|
|**`uglifyOptions`**|`{Object}`|[`{...defaults}`](https://github.com/whtsky/uglifyjs-3-webpack-plugin/tree/master#uglifyoptions)|`uglify` [Options](https://github.com/mishoo/UglifyJS2/tree/master#minify-options)|
|**`extractComments`**|`{Boolean\|RegExp\|Function<(node, comment) -> {Boolean\|Object}>}`|`false`|Whether comments shall be extracted to a separate file, (see [details](https://github.com/webpack/webpack/commit/71933e979e51c533b432658d5e37917f9e71595a) (`webpack >= 2.3.0`)|
|**`warningsFilter`**|`{Function(source) -> {Boolean}}`|`() => true`|Allow to filter uglify warnings|

### `test`

**webpack.config.js**
```js
[
  new UglifyJsPlugin({
    test: /\.js($|\?)/i
  })
]
```

### `include`

**webpack.config.js**
```js
[
  new UglifyJsPlugin({
    include: /\/includes/
  })
]
```

### `exclude`

**webpack.config.js**
```js
[
  new UglifyJsPlugin({
    exclude: /\/excludes/
  })
]
```

### `cache`

#### `{Boolean}`

**webpack.config.js**
```js
[
  new UglifyJsPlugin({
    cache: true
  })
]
```

Enable file caching.
Default path to cache directory: `node_modules/.cache/uglifyjs-webpack-plugin`.

#### `{String}`

**webpack.config.js**
```js
[
  new UglifyJsPlugin({
    cache: 'path/to/cache'
  })
]
```

Path to cache directory.

### `parallel`

#### `{Boolean}`

**webpack.config.js**
```js
[
  new UglifyJsPlugin({
    parallel: true
  })
]
```

Enable parallelization.
Default number of concurrent runs: `os.cpus().length - 1`.

#### `{Number}`

**webpack.config.js**
```js
[
  new UglifyJsPlugin({
    parallel: 4
  })
]
```

Number of concurrent runs.

> ℹ️  Parallelization can speedup your build significantly and is therefore **highly recommended**

### `sourceMap`

**webpack.config.js**
```js
[
  new UglifyJsPlugin({
    sourceMap: true
  })
]
```

> ⚠️ **`cheap-source-map` options don't work with this plugin**

### [`uglifyOptions`](https://github.com/mishoo/UglifyJS2/tree/master#minify-options)

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`warnings`**|`{Boolean}`|`false`|Display Warnings|
|**[`parse`](https://github.com/mishoo/UglifyJS2/tree/master#parse-options)**|`{Object}`|`{}`|Additional Parse Options|
|**[`compress`](https://github.com/mishoo/UglifyJS2/tree/master#compress-options)**|`{Boolean\|Object}`|`true`|Additional Compress Options|
|**[`mangle`](https://github.com/mishoo/UglifyJS2/tree/master#mangle-options)**|`{Boolean\|Object}`|`true`|Enable Name Mangling (See [Mangle Properties](https://github.com/mishoo/UglifyJS2/tree/master#mangle-properties-options) for advanced setups, use with ⚠️)|
|**[`output`](https://github.com/mishoo/UglifyJS2/tree/master#output-options)**|`{Object}`|`{}`|Additional Output Options (The defaults are optimized for best compression)|
|**`toplevel`**|`{Boolean}`|`false`|Enable top level variable and function name mangling and to drop unused variables and functions|
|**`nameCache`**|`{Object}`|`null`|Enable cache of mangled variable and property names across multiple invocations|
|**`ie8`**|`{Boolean}`|`false`|Enable IE8 Support|
|**`keep_fnames`**|`{Boolean}`|`false`| Enable prevent discarding or mangling of function names. Useful for code relying on `Function.prototype.name`.|

**webpack.config.js**
```js
[
  new UglifyJsPlugin({
    uglifyOptions: {
      warnings: false,
      parse: {...options},
      compress: {...options},
      mangle: {
        ...options,
        properties: {
          // mangle property options
        }
      },
      output: {
        comments: false,
        beautify: false,
        ...options
      },
      toplevel: false,
      nameCache: null,
      ie8: false,
      keep_fnames: false,
    }
  })
]
```

### `extractComments`

#### `{Boolean}`

All comments that normally would be preserved by the `comments` option will be moved to a separate file. If the original file is named `foo.js`, then the comments will be stored to `foo.js.LICENSE`.

#### `{RegExp|String}` or  `{Function<(node, comment) -> {Boolean}>}`

All comments that match the given expression (resp. are evaluated to `true` by the function) will be extracted to the separate file. The `comments` option specifies whether the comment will be preserved, i.e. it is possible to preserve some comments (e.g. annotations) while extracting others or even preserving comments that have been extracted.

#### `{Object}`

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`condition`**|`{Regex\|Function}`|``|Regular Expression or function (see previous point)|
|**`filename`**|`{String\|Function}`|`${file}.LICENSE`|The file where the extracted comments will be stored. Can be either a `{String}` or a `{Function<(string) -> {String}>}`, which will be given the original filename. Default is to append the suffix `.LICENSE` to the original filename|
|**`banner`**|`{Boolean\|String\|Function}`|`/*! For license information please see ${filename}.js.LICENSE */`|The banner text that points to the extracted file and will be added on top of the original file. Can be `false` (no banner), a `{String}`, or a `{Function<(string) -> {String}` that will be called with the filename where extracted comments have been stored. Will be wrapped into comment|

### `warningsFilter`

**webpack.config.js**
```js
[
  new UglifyJsPlugin({
    warningsFilter: (src) => true
  })
]
```

[npm]: https://img.shields.io/npm/v/uglifyjs-3-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/uglifyjs-3-webpack-plugin

[node]: https://img.shields.io/node/v/uglifyjs-3-webpack-plugin.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/whtsky/uglifyjs-3-webpack-plugin.svg
[deps-url]: https://david-dm.org/whtsky/uglifyjs-3-webpack-plugin

[test]: 	https://img.shields.io/circleci/project/github/whtsky/uglifyjs-3-webpack-plugin.svg
[test-url]: https://circleci.com/gh/whtsky/uglifyjs-3-webpack-plugin

[cover]: https://codecov.io/gh/whtsky/uglifyjs-3-webpack-plugin/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/whtsky/uglifyjs-3-webpack-plugin

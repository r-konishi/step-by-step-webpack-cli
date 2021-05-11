## Step. 5: 各 HTML ごとに別 TypeScript を読み込む

### index.ts の名前変更

-   簡単に以下のコマンドを実行
    -   もし git などで管理していない場合は単純に名前を変更するだけで良い

```
$ git mv src/index.ts src/common.js
```

-   これによりファイル構造は以下のようになる

```diff
  .
  ├── README.md
  ├── package-lock.json
  ├── package.json
  ├── postcss.config.js
  ├── src
- │   ├── index.ts
+ │   ├── common.ts
  │   ├── html
  │   │   ├── index.html
  │   │   └── template
  │   │       └── header.html
  │   └── scss
  │       ├── _main.scss
  │       └── imports.scss
  ├── tsconfig.json
  └── webpack.config.js
```

-   もしかしたら tsconfig.json の中身書き換えるかと統合開発環境から促された方、そして無視した方！
    -   以下のように tsconfig.json を変更

```diff
-   "files": ["src/index.ts"]
+   "include": [
+     "src/**/*"
+   ],
+   "exclude": [
+     "node_modules",
+     "**/*.spec.ts"
+   ]
```

or

```diff
-   "files": ["src/index.ts"]
+   "files": ["src/common.ts"]
```

### commpn.ts を webpack の entry に追加

-   webpack.config.js を以下のように変更

```diff
  const config = {
-     entry: './src/index.ts',
+     entry: {
+         common: './src/common.ts',
+     },
      output: {
          path: path.resolve(__dirname, 'dist'),
```

-   ここで一旦、ビルド

```
$ npm run build
```

-   できたファイル
    -   今まで `dist/index.js` であったものが、 `dist/common.js` になっていることが確認できる
    -   また、 `dist/index.html` ないのスクリプト読み込みファイルも変わっていることが確認できる

```
.
├── dist
│   ├── common.js
│   ├── css
│   │   └── common.css
│   └── index.html
```

### 新たなファイル、 `page1.html` を追加

-   `src/html/page1.html` を追加（内容は以下を参照）

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Webpack App</title>
    </head>
    <body>
        <%= require('html-loader!./template/header.html').default %>
        <h1>Page1</h1>
    </body>
</html>
```

-   これに合わせて `webpack.config.js` に以下を追加

```diff
          new HtmlWebpackPlugin({
              template: path.resolve(__dirname, 'src/html/index.html'),
+             filename: 'index.html',
          }),
+
+         new HtmlWebpackPlugin({
+             template: path.resolve(__dirname, 'src/html/page1.html'),
+             filename: 'page1.html',
+         }),
```

-   また、 `src/html/template/header.html` を以下のように編集

```diff
  <header>
      <nav>
          <ul>
              <li><a href="./index.html">HOME</a></li>
+             <li><a href="./page1.html">PAGE 1</a></li>
          </ul>
      </nav>
  </header>
```

-   ここで一旦、ビルド

```
$ npm run build
```

-   dist 内は以下のようになる
    -   `page1.html` が増えているのがわかる

```
├── dist
│   ├── css
│   │   └── common.css
│   ├── index.html
│   ├── js
│   │   └── common.js
│   └── page1.html
```

### ページごとに別々のスクリプトファイルを読み込む

-   index.html 用の `src/ts/index.ts` ファイルの追加
    -   ファイルの内容は以下

```typescript:src/ts/index.ts
console.log('loaded src/ts/index.ts');
```

-   `src/html/page.html` に以下の行を追加

```diff
      <body>
          <%= require('html-loader!./template/header.html').default %>
          <h1>Page1</h1>
+         <div id="page1_div"></div>
      </body>
```

-   page.html 用の `src/ts/page1.ts` ファイルの追加
    -   ファイルの内容は以下

```typescript:src/ts/index.ts
const page1Function = () => {
    const div: HTMLDivElement = <HTMLDivElement>(
        document.getElementById('page1_div')
    );

    div.innerHTML = 'Hellow Page1 Script!!!';
};

window.addEventListener('load', page1Function);
```

-   webpack.config.js でそれぞれの html で読み込むスクリプトを指定

```diff
  const config = {
      entry: {
          common: './src/common.ts',
+         index: './src/ts/index.ts',
+         page1: './src/ts/page1.ts',
      },
      output: {
          path: path.resolve(__dirname, 'dist'),
+         filename: 'js/[name].js',
+         chunkFilename: 'js/[id]_[name]_[hash].js',  // ここはなくても良い
          clean: true,
      },
      devServer: {
          open: true,
          host: 'localhost',
      },
      plugins: [
          new HtmlWebpackPlugin({
              template: path.resolve(__dirname, 'src/html/index.html'),
              filename: 'index.html',
+             includeSiblingChunks: true,
+             chunks: ['common', 'index'],
          }),

          new HtmlWebpackPlugin({
              template: path.resolve(__dirname, 'src/html/page1.html'),
              filename: 'page1.html',
+             includeSiblingChunks: true,
+             chunks: ['common', 'page1'],
          }),

          new MiniCssExtractPlugin({
```

-   ここで一旦、ビルド

```
$ npm run build
```

-   dist 内は以下のようになる
    -   `dist/index.html` を確認すると、 `coomon.js` と `index.js` が読み込まれていることが確認できる
    -   `dist/page1.html` を確認すると、 `coomon.js` と `page1.js` が読み込まれていることが確認できる

```
├── dist
│   ├── css
│   │   └── common.css
│   ├── index.html
│   ├── js
│   │   ├── common.js
│   │   ├── index.js
│   │   └── page1.js
│   └── page1.html
```

### 発展

ここまでで、さらに hmlt などが増えた時にいちいち `webpack.config.js` を編集するのが面倒になってきます。

そこで、 `webpack.config.js` で `src` フォルダ内を走査して動的にファイルを出力できるようにしてみます。

-   `webpack.config.js` を以下のように変更

```diff
  // Generated using webpack-cli https://github.com/webpack/webpack-cli

  const path = require('path');
+ const glob = require('glob');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');

  // 中略

  const config = {
      entry: {
          common: './src/common.ts',
-         index: './src/ts/index.ts',
-         page1: './src/ts/page1.ts',
      },

  // 中略

      plugins: [
-        new HtmlWebpackPlugin({
-             template: path.resolve(__dirname, 'src/html/index.html'),
-             filename: 'index.html',
-             includeSiblingChunks: true,
-             chunks: ['common', 'index'],
-         }),
-
-         new HtmlWebpackPlugin({
-             template: path.resolve(__dirname, 'src/html/page1.html'),
-             filename: 'page1.html',
-             includeSiblingChunks: true,
-             chunks: ['common', 'page1'],
-         }),
-
          new MiniCssExtractPlugin({

  // 中略

  };

  module.exports = () => {
+     glob.sync('**/*.ts', {
+         cwd: 'src/ts',
+     }).forEach((tsName) => {
+         // baseName がかぶることがあるので注意
+         const baseName = path.basename(tsName, '.ts');
+         config.entry[baseName] = path.resolve(__dirname, 'src/ts/' + tsName);
+
+         const htmlFileName = baseName + '.html';
+
+         config.plugins.push(
+             new HtmlWebpackPlugin({
+                 template: path.resolve(__dirname, 'src/html/' + htmlFileName),
+                 filename: baseName + '.html',
+                 includeSiblingChunks: true,
+                 chunks: ['common', baseName],
+             })
+         );
+     });
+
      if (isProduction) {
          config.mode = 'production';
      } else {
          config.mode = 'development';
      }
      return config;
  };
```

ただ、上記だと `src/ts/` フォルダ内にある `ts` ファイルと `src/html` フォルダ内にある `html` ファイルの名前が一致していないといけない。

また、 `html` だけの場合だとその `html` が含まれなくなってしまうため、もう少し拡張性のあるコードにすると良い。

もしくは、フォルダ構造を考え直すと良いかもしれません。

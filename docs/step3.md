## Step. 3: HTML テンプレートの導入

-   以降、ファイル一覧などは node_modules ディレクトリと dist ディレクトリは除く
    -   dist ディレクトリは、必要に応じて表示し、 dist が存在しない時は省略時

### 準備: index.html を移動

-   `./index.html` を `./src/html/index.html` に

```diff
  .
  ├── README.md
- ├── index.html
  ├── package-lock.json
  ├── package.json
  ├── postcss.config.js
  ├── src
+ │   ├── html
+ │   │   └── index.html
  │   └── index.ts
  ├── tsconfig.json
  └── webpack.config.js
```

### webpack.config.js の設定変更

```diff
      plugins: [
          new HtmlWebpackPlugin({
-             template: 'index.html',
+             template: path.resolve(__dirname, 'src/html/index.html'),
          }),

          new MiniCssExtractPlugin(),

          // Add your plugins here
          // Learn more about plugins from https://webpack.js.org/configuration/plugins/
      ],
```

### 一度確認

-   以下を実行し、エラーが出ないことを確認

```
$ npm run build
```

### header テンプレートの用意

```diff
  .
  ├── README.md
  ├── package-lock.json
  ├── package.json
  ├── postcss.config.js
  ├── src
  │   ├── html
  │   │   ├── index.html
+ │   │   └── template
+ │   │       └── header.html
  │   └── index.ts
  ├── tsconfig.json
  └── webpack.config.js
```

-   `src/template/header.html` の中身

```html:src/template/header.html
<header>
    <nav>
        <ul>
            <li><a href="./index.html">HOME</a></li>
        </ul>
    </nav>
</header>
```

### `src/html/index.html` に header を読み込む

```diff
      <body>
+         <%= require('html-loader!./template/header.html').default %>
+
          <h1>Hello world!</h1>
          <h2>Tip: Check your console</h2>
      </body>
```

### `html-loader` package の追加

-   以下のコマンドを実行

```
$ npm install --save-dev html-loader
```

### ビルドする

-   以下のコマンドを実行して、エラーが出ないことを確認

```
$ npm run build
```

-   `dist/index.html` の中身を確認
    -   index.html に header.html が記載されたもになっている

### 簡単な説明

上記の手順を経ることで、 `index.html` から `header.html` を読み込み、 `dist` に出力される `index.html` には `header.html` が入った状態になっていることがわかった。

同様にして、 `page1.html` などを追加して同じように `header.html` を読み込むようにすると、共通部分の `header.html` は、それ自体を編集するだけでよくなる。

html の冗長をなくし、メンテナンス性が向上したことがわかる。

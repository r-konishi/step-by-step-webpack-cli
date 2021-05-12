## Step. 4: SASS ファイルの追加と設定

-   今回は、SASS ではなく SCSS で行う

### scss ファイルの追加

-   `src/scss/_main.scss` ファイルの追加

```scss:_main.scss
@charset "UTF-8";

body {
    padding: 0;
    margin: 0;
}
```

-   `src/scss/imports.scss` ファイルの追加

```scss
@charset "UTF-8";

@import 'main';
```

-   ファイル作成後のファイル構成は以下のようになる

```diff
  .
  ├── README.md
  ├── package-lock.json
  ├── package.json
  ├── postcss.config.js
  ├── src
  │   ├── html
  │   │   ├── index.html
  │   │   └── template
  │   │       └── header.html
  │   ├── index.ts
+ │   └── scss
+ │       ├── _main.scss
+ │       └── imports.scss
  ├── tsconfig.json
  └── webpack.config.js
```

### SCSS を読み込む

-   `index.ts` に以下の行を追加して SCSS  を読み込むようにする

```diff
+ import './scss/imports.scss';
+
  console.log('Hello World!');
```

### ビルドする

-   以下のコマンドを実行してエラーが出ないことを確認

```
$ npm run build
```

-   dist に以下の 3 ファイルができていることを確認
    -   既に index.html と main.js ファイルはあったかもしれませんが、ファイルが変更されているのが確認できるかと思います。

```diff
  .
  ├── dist
+ │   ├── index.html
+ │   ├── main.css
+ │   └── main.js
```

-   現状でも動作が以下のコマンドで確認できる

```
$ npm run serve
```

### フォルダ分けする

-   必須ではないが dist の中身が多くなってきたのでスタイルファイルは css フォルダ内に入れるよう設定
-   以下のように `webpack.config.js` を編集

```diff
      plugins: [
          new HtmlWebpackPlugin({
              template: path.resolve(__dirname, 'src/html/index.html'),
          }),

-         new MiniCssExtractPlugin(),
+         new MiniCssExtractPlugin({
+             filename: 'css/[name].css',
+             chunkFilename: 'css/[id]_[name]_[hash].css',
+         }),

          // Add your plugins here
          // Learn more about plugins from https://webpack.js.org/configuration/plugins/
      ],
```

-   また、 dist ないのファイルがビルド時にリフレッシュされない（前のファイルが残る）ため、 `webpack.config.js` に以下の行を追加

```diff
  const config = {
      entry: './src/index.ts',
      output: {
          path: path.resolve(__dirname, 'dist'),
+         clean: true,
      },
      devServer: {
          open: true,
          host: 'localhost',
      },
```

### ビルドする

-   以下のコマンドを実行してエラーが出ないことを確認

```
$ npm run build
```

-   dist フォルダ内は以下のような構成になる
    -   main.css が css フォルダ内に入っていることが確認できる

```diff
.
├── dist
│   ├── css
│   │   └── main.css
│   ├── index.html
│   └── main.js
```

-   以下のコマンドで動作確認できる

```
$ npm run serve
```

# 前提

-   Node.js 14 系
-   Webpack 5 系

# 手順

## Step. 0: Install global package

```
$ npm install --global webpack webpack-cli @webpack-cli/generators
```

## Step. 0.1: git を使用している場合は、 `.gitignore` を忘れずに

-   もし、 git でファイルを管理している場合は `node_modules` や `dist` を `.gitignore` に入れるようにしましょう！

## Step. 1: Initial webpack cli

1. JS ソリューションの選択

```
$ webpack-cli init
? Which of the following JS solutions do you want to use?
❯ none
  ES6
  Typescript
```

-   今回は TypeScript で開発できるように `Typescript` を選択します
    -   矢印キーで選択できます

2. webpack-dev-server を使用するか

```
$ webpack-cli init
? Which of the following JS solutions do you want to use? Typescript
? Do you want to use webpack-dev-server? [Y/n]
```

-   webpack-dev-server というプラグインを使用するか

    -   今回は、サーバサイドは用意しないので、開発時に便利な `webpack-dev-server` を導入するため `Y` を選択

-   `webpack-dev-server` に関しては以下を参照
    -   [DevServer | webpack](https://webpack.js.org/configuration/dev-server/)
    -   [GitHub - webpack/webpack-dev-server: Serves a webpack app. Updates the browser on changes. Documentation https://webpack.js.org/configuration/dev-server/.](https://github.com/webpack/webpack-dev-server)

3. html-webpack-plugin で簡素化するか

```
webpack-cli init
? Which of the following JS solutions do you want to use? Typescript
? Do you want to use webpack-dev-server? Yes
? Do you want to simplify the creation of HTML files for your bundle? [Y/n]
```

-   簡単に `html-webpack-plugin` 導入するかと考えると良さそう

    -   `Y` にすると `html-webpack-plugin` が追加され、 `./index.html` も作成される
    -   今回は、 `Y` を選択

-   `html-webpack-plugin` に関しては以下を参照
    -   [HtmlWebpackPlugin | webpack](https://webpack.js.org/plugins/html-webpack-plugin/)
    -   [GitHub - jantimon/html-webpack-plugin: Simplifies creation of HTML files to serve your webpack bundles](https://github.com/jantimon/html-webpack-plugin)

4. CSS ソリューションの選択

```
$ webpack-cli init
? Which of the following JS solutions do you want to use? Typescript
? Do you want to use webpack-dev-server? Yes
? Do you want to simplify the creation of HTML files for your bundle? Yes
? Which of the following CSS solutions do you want to use? (Use arrow keys)
❯ none
  CSS only
  SASS
  LESS
  Stylus
```

-   今回は SCSS で開発できるように `SASS` を選択
    -   こちらも矢印キーで選択できる

5. CASS 意外に CSS も使うか

```
$ webpack-cli init
? Which of the following JS solutions do you want to use? Typescript
? Do you want to use webpack-dev-server? Yes
? Do you want to simplify the creation of HTML files for your bundle? Yes
? Which of the following CSS solutions do you want to use? SASS
? Will you be using CSS styles along with SASS in your project? [Y/n]
```

-   使うか分からないのでとりあえず使うとして `Y` を選択

6. PostCSS を使うか

```
$ webpack-cli init
? Which of the following JS solutions do you want to use? Typescript
? Do you want to use webpack-dev-server? Yes
? Do you want to simplify the creation of HTML files for your bundle? Yes
? Which of the following CSS solutions do you want to use? SASS
? Will you be using CSS styles along with SASS in your project? Yes
? Will you be using PostCSS in your project? [Y/n]
```

-   メリットを享受できるか分からないですが... `Y` を選択

7. CSS ファイルを全て抽出するか

```
$ webpack-cli init
? Which of the following JS solutions do you want to use? Typescript
? Do you want to use webpack-dev-server? Yes
? Do you want to simplify the creation of HTML files for your bundle? Yes
? Which of the following CSS solutions do you want to use? SASS
? Will you be using CSS styles along with SASS in your project? Yes
? Will you be using PostCSS in your project? Yes
? Do you want to extract CSS for every file? [Y/n]
```

-   もちろんやってくれということで `Y` を選択

8. prettier を導入するか

```
$ webpack-cli init
? Which of the following JS solutions do you want to use? Typescript
? Do you want to use webpack-dev-server? Yes
? Do you want to simplify the creation of HTML files for your bundle? Yes
? Which of the following CSS solutions do you want to use? SASS
? Will you be using CSS styles along with SASS in your project? Yes
? Will you be using PostCSS in your project? Yes
? Do you want to extract CSS for every file? Yes
? Do you like to install prettier to format generated configuration? [y/N]
```

-   綺麗好きな人は必ず `Y`
-   ここだけ `[y/N]` となっているのが不思議ですが、気にしない

9. あとは待つだけでいろいろ入れてくれる

```
$ webpack-cli init
? Which of the following JS solutions do you want to use? Typescript
? Do you want to use webpack-dev-server? Yes
? Do you want to simplify the creation of HTML files for your bundle? Yes
? Which of the following CSS solutions do you want to use? SASS
? Will you be using CSS styles along with SASS in your project? Yes
? Will you be using PostCSS in your project? Yes
? Do you want to extract CSS for every file? Yes
? Do you like to install prettier to format generated configuration? Yes
[webpack-cli] ℹ INFO  Initialising project...
   create package.json
   create src/index.ts
   create README.md
   create index.html
   create webpack.config.js
   create tsconfig.json
   create postcss.config.js

added 635 packages, and audited 636 packages in 13s

43 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[webpack-cli] ⚠ Generated configuration may not be properly formatted as prettier is not installed.
[webpack-cli] Project has been initialised with webpack!
```

-   `途中で package.js あるけど上書きする？` などが聞かれますが、その辺は自己判断で
-   今回はファイルがない状態で行っている前提のため、聞かれませんでした

## Step. 2: 各コマンドを実行する

### ビルドする

```
$ npm run build
```

-   これにより `dist` ディレクトリができ、中に `index.html`, `main.js` が作成される
-   ファイル構成は以下のようになる
    -   node_modules 内、隠しファイル（ `.gitignore` など）は省略

```
.
├── README.md
├── dist                // ここが増える
│   ├── index.html
│   └── main.js
├── index.html
├── node_modules
│
├── package-lock.json
├── package.json
├── postcss.config.js
├── src
│   └── index.ts
├── tree.md
├── tsconfig.json
└── webpack.config.js
```

### dev サーバで確認

```
$ npm run serve
```

-   8080 ポートでサーバが立ち上がり、自動でブラウザが開く...はず

### 他のコマンド

-   package.json ないを確認
    -   以下の 5 つのコマンドが初期で設定されている...はず
    -   init 時の選択によりコマンドは増減する

```
  "scripts": {
    "build": "webpack --mode=production --node-env=production",
    "build:dev": "webpack --mode=development",
    "build:prod": "webpack --mode=production --node-env=production",
    "watch": "webpack --watch",
    "serve": "webpack serve"
  },
```

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

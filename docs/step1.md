## Step. 1: Initial webpack cli

### JS ソリューションの選択

```
$ webpack-cli init
? Which of the following JS solutions do you want to use?
❯ none
  ES6
  Typescript
```

-   今回は TypeScript で開発できるように `Typescript` を選択します
    -   矢印キーで選択できます

### webpack-dev-server を使用するか

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

### html-webpack-plugin で簡素化するか

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

### CSS ソリューションの選択

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

### CASS 意外に CSS も使うか

```
$ webpack-cli init
? Which of the following JS solutions do you want to use? Typescript
? Do you want to use webpack-dev-server? Yes
? Do you want to simplify the creation of HTML files for your bundle? Yes
? Which of the following CSS solutions do you want to use? SASS
? Will you be using CSS styles along with SASS in your project? [Y/n]
```

-   使うか分からないのでとりあえず使うとして `Y` を選択

### PostCSS を使うか

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

### CSS ファイルを全て抽出するか

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

### prettier を導入するか

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

### あとは待つだけでいろいろ入れてくれる

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

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

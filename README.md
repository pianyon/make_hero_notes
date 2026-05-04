# make_hero_notes

Guitar Hero スタイルの**リズム譜面エディタ + プレイヤー**。
ブラウザだけで動作する、サーバー不要の Web アプリです。

[English README](./README.en.md)

## 特徴

- 🎵 **譜面エディタ** — BPM / Offset を指定してステップシーケンサーで打ち込み
- 🎬 **動画オーバーレイ対応** — 任意の動画ファイルを背景に同期再生
- 🎹 **メトロノーム内蔵** — タイミング合わせ込みやすい
- 📦 **JSON で譜面を保存／読み込み** — 共有・バックアップが簡単
- 🌐 **完全クライアントサイド** — ファイルはブラウザ内でのみ処理、外部に送信されません
- ⌨️ **キーボードショートカット完備**

## 使い方

### クイックスタート

1. このリポジトリをクローン or ZIP でダウンロード
   ```bash
   git clone https://github.com/pianyon/make_hero_notes.git
   ```
2. `editor.html` をブラウザで開いて譜面を作成
3. **Export JSON** で譜面を保存
4. `index.html` をブラウザで開き、譜面 JSON・音声・動画を読み込んで再生

### 詳細な使い方

`help.html` をブラウザで開くと、作業フローやショートカット一覧が確認できます。

## 画面構成

| ファイル | 役割 |
|---------|------|
| `index.html` | **Player** — 譜面と音声・動画を同期再生 |
| `editor.html` | **Editor** — BPM/Offset 設定、パターン作成、タイムライン編集 |
| `help.html` | ヘルプ・ドキュメント |

## ショートカット（抜粋）

### Player
- `Space` — 再生 / 一時停止
- `↑` / `↓` — 音量調整
- `,` — 先頭に巻き戻し
- `Ctrl + Enter` — シアターモード切り替え

### Editor
- `Space` — プレビュー再生 / 一時停止
- `,` — プレビューを先頭に戻す

詳細は `help.html` を参照してください。

## 動作環境

- モダンなブラウザ（Chrome / Firefox / Safari / Edge の最新版）
- インターネット接続不要（ローカルファイルだけで動作）

## 開発

ビルド不要。`.html` ファイルを直接編集してブラウザでリロードするだけ。

```
make_hero_notes/
├── index.html       # Player
├── editor.html      # Editor
├── help.html        # Help
└── README.md
```

## ライセンス

[MIT License](./LICENSE)

## Author

[@pianyon](https://github.com/pianyon)

## Contributing

Issue・Pull Request どちらも歓迎です。バグ報告や機能要望はお気軽にどうぞ。

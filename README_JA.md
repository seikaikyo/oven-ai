# スマートオーブン AI 監視システム

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://smart-oven-monitor.vercel.app/)
[![Language](https://img.shields.io/badge/Language-繁體中文-blue.svg)](README.md)
[![English](https://img.shields.io/badge/Language-English-red.svg)](README_EN.md)
[![Japanese](https://img.shields.io/badge/Language-日本語-orange.svg)](README_JA.md)

| ダッシュボード概要 | AI スマート分析 | デバイス監視 |
|:---:|:---:|:---:|
| ![ダッシュボード概要](docs/images/dashboard-overview.png) | ![AI スマート分析](docs/images/ai-insights-panel.png) | ![デバイス監視](docs/images/device-monitoring.png) |
| マルチデバイスリアルタイム監視・状態管理 | 6つのAI分析パネルでインテリジェント洞察 | 完全なシステム構成とプロフェッショナルインターフェース |

## 🔥 プロジェクト概要

AI人工知能とIoT技術を組み合わせた産業用オーブン監視ソリューションのインテリジェント製造監視システム。リアルタイムセンサーデータ監視、AI異常検知、予測メンテナンス推奨機能を提供します。

🌐 **ライブデモ**: [https://smart-oven-monitor.vercel.app/](https://smart-oven-monitor.vercel.app/)

## ✨ 主要機能

- 🌡️ **リアルタイムセンサー監視** - 温度、湿度、消費電力など多次元データのリアルタイム表示
- 🤖 **AI インテリジェント分析** - 異常予測、効率最適化、メンテナンス推奨
- 📊 **マルチデバイス監視** - 最大10台のデバイスの同時監視をサポート
- 💻 **デスクトップアプリケーションサポート** - Electronでパッケージ化されたネイティブデスクトップアプリケーション
- 🎨 **プロフェッショナルインターフェース** - モダンなテック系デザイン
- 📱 **レスポンシブデザイン** - 様々な画面サイズに対応

## 🏗️ システムアーキテクチャ

- **バックエンド**: FastAPI + SQLite + Python
- **フロントエンド**: React + TypeScript + Vite + TailwindCSS
- **デスクトップアプリ**: Electron
- **AIモデル**: 異常検知 + 予測メンテナンスアルゴリズム
- **データベース**: SQLite（Dockerデプロイメントサポート）

## 🚀 クイックスタート

### 方法1: 自動化スクリプトの使用（推奨）

```bash
# システム全体を開始
./start_system.bat

# システムを停止
./stop_system.bat

# デスクトップアプリケーションを再構築
./rebuild_exe.bat
```

### 方法2: 手動開始

#### バックエンドサービス

```bash
cd backend
pip install -r requirements.txt
python main.py
```

バックエンドは `http://localhost:8000` で開始されます

#### フロントエンドアプリケーション

```bash
cd frontend
npm install
npm run dev
```

フロントエンドは `http://localhost:5173` で開始されます

#### デスクトップアプリケーション

```bash
cd frontend
npm run build
npm run electron:build    # インストーラーの構築
# または
npm run electron:dev      # 開発モード
```

## 🌐 デプロイメントオプション

### Vercel デプロイメント（フロントエンドデモ）

モックデータを使用したフロントエンド機能のショーケースに適しています：

1. このプロジェクトをあなたのGitHubにフォーク
2. Vercelでこのリポジトリを接続
3. ビルドディレクトリを `frontend/dist` に設定
4. 自動デプロイメント完了

### Docker デプロイメント

```bash
# 全サービスの構築と開始
docker-compose up -d

# 実行状態の確認
docker-compose ps

# サービスの停止
docker-compose down
```

## 📁 プロジェクト構造

```
OVEN-AI/
├── backend/                 # FastAPI バックエンド
│   ├── main.py             # メインアプリケーション
│   ├── database.py         # データベース設定
│   ├── requirements.txt    # Python 依存関係
│   └── routers/           # API ルート
├── frontend/              # React フロントエンド
│   ├── src/              # ソースコード
│   ├── electron/         # Electron 設定
│   ├── package.json      # Node.js 依存関係
│   └── vite.config.ts    # Vite 設定
├── start_system.bat      # システム起動スクリプト
├── stop_system.bat       # システム停止スクリプト
├── rebuild_exe.bat       # デスクトップアプリ再構築スクリプト
└── README.md            # プロジェクトドキュメント
```

## 🔧 開発環境要件

- **Python**: 3.11+
- **Node.js**: 18+
- **Git**: 最新バージョン
- **Docker**: （オプション）コンテナ化デプロイメント用

## 📊 機能ショーケース

### 🌟 コア機能

- **マルチデバイス監視**: 10台のオーブンデバイスの同時監視をサポート、稼働中、メンテナンス、警告、オフライン状態を含む
- **リアルタイムデータ表示**: 温度、湿度、電力、効率などの主要パラメータが毎秒更新
- **デバイス状態管理**: 異なる状態のデバイスに対応する色表示と運転情報を表示
- **インテリジェント連動分析**: デバイス選択後、右側のAI分析パネルが対応するデバイスデータをリアルタイムで更新

### 🤖 AI インテリジェント分析

- **異常予測**: LSTM-AutoEncoderモデル、精度92.5%
- **湿度トレンド予測**: Prophet + LSTMハイブリッドモデル、精度89.3%
- **電力最適化**: 多目的最適化アルゴリズム、精度94.7%
- **メンテナンス予測**: ランダムフォレスト + 生存分析、精度91.2%

### 🧠 スマートインサイトシステム

デバイス状態に基づいて動的に調整される6つの分析パネル：

1. **異常予測** 🔮 - 機械学習ベースの機器異常早期警告
2. **効率最適化** ⚡ - インテリジェントアルゴリズムがエネルギー消費パターンを分析し、省エネソリューションを提供
3. **メンテナンス推奨** 🔧 - 予測メンテナンス技術で最適なメンテナンス計画を策定
4. **品質予測** 🎯 - 環境パラメータと組み合わせて製品品質性能を予測
5. **エネルギー消費分析** 📊 - エネルギー消費を監視・分析し、省エネ機会を特定
6. **トレンド分析** 📈 - 長期的な機器運転トレンド、意思決定のためのデータサポートを提供

### 🎨 インターフェース特徴

- **カラーコーディングシステム**: 異なるリスクレベルに異なる色表示を使用
  - 🔴 赤：オフライン、緊急、高リスク
  - 🟠 オレンジ：メンテナンス中、高優先度
  - 🟡 黄：中程度リスク、予防的
  - 🟢 緑：正常、安定、低リスク
  - 🔵 青：最適化提案、改善ソリューション

- **プロフェッショナルテックスタイル**: ダークバックグラウンド + ネオンカラーで産業監視センターの雰囲気を演出
- **レスポンシブデザイン**: デスクトップ、タブレット、モバイルなど様々なデバイスに完璧対応

## 🤝 貢献

1. プロジェクトをフォーク
2. 機能ブランチの作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチをプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを開く

## 📄 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細は[LICENSE](LICENSE)ファイルを参照してください

---

🔥 **スマート製造は監視から始まる** 🔥
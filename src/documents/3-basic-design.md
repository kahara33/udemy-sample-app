# 3. 基本設計書

## 3.1 システムアーキテクチャ
### フロントエンド
- React + TypeScript
- Tailwind CSS
- Recharts (データ可視化)
- Lucide React (アイコン)

### 状態管理
- Zustand
- Persist middleware

### API統合
- Udemy Business API
  - Base URL: https://reskillingcampjp.udemy.com/api-2.0
  - Basic認証
  - JSON応答形式

## 3.2 コンポーネント構成
```
src/
├── components/
│   ├── ApiTest.tsx        # API検証コンソール
│   ├── AuthSetup.tsx      # 認証情報設定
│   ├── Dashboard.tsx      # メインダッシュボード
│   └── LearningPathSelector.tsx
├── store/
│   ├── authStore.ts       # 認証状態管理
│   └── learningPathStore.ts
└── types/
    └── index.ts          # 型定義
```

## 3.3 状態管理設計
### 認証状態
- API認証情報の管理
- Base64エンコード処理
- 永続化ストレージ

### API状態
- エンドポイント選択
- リクエスト状態
- レスポンスデータ

### ラーニングパス状態
- 選択中のパスID
- パス一覧データ
- コース進捗データ
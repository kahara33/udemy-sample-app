# 4. 詳細設計書

## 4.1 コンポーネント仕様
### ApiTest
#### 機能
- API認証情報の表示・編集
- エンドポイント選択
- APIリクエスト実行
- レスポンス表示

#### UI要素
- 認証情報フォーム
- エンドポイントセレクター
- テスト実行ボタン
- レスポンス表示パネル

### AuthSetup
- API認証情報入力フォーム
- バリデーション処理
- 認証情報の永続化

### Dashboard
#### メトリクスカード
- アクティブコース数
- 全体進捗率
- 開発中スキル数

#### チャート
- コース進捗バー
- スキル開発棒グラフ

## 4.2 API統合
### エンドポイント定義
```typescript
const API_ENDPOINTS = [
  { 
    id: 'courses', 
    name: 'List Courses', 
    path: '/organizations/{account_id}/courses/list/'
  },
  { 
    id: 'reporting', 
    path: '/organizations/{account_id}/analytics/user-activity/'
  }
]
```

### 認証処理
```typescript
const getAuthHeader = (clientId: string, clientSecret: string): string => {
  const credentials = `${clientId}:${clientSecret}`;
  return `Basic ${btoa(credentials)}`;
};
```

## 4.3 状態管理
### AuthStore
```typescript
interface AuthState {
  credentials: Credentials | null
  setCredentials: (creds: Credentials) => void
  clearCredentials: () => void
}
```

### LearningPathStore
```typescript
interface LearningPathState {
  selectedPathId: string | null
  learningPaths: LearningPath[]
  setSelectedPathId: (id: string | null) => void
  setLearningPaths: (paths: LearningPath[]) => void
}
```
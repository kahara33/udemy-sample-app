# 2. データベース設計書

## 2.1 論理データモデル
### Credentials
```typescript
{
  clientId: string
  clientSecret: string
  organizationId: string
  accountId: string
}
```

### ApiEndpoint
```typescript
{
  id: string
  name: string
  baseUrl: string
  path: string
  description: string
}
```

### ApiResponse
```typescript
{
  status: 'success' | 'error'
  data?: any
  error?: string
}
```

### LearningPath
```typescript
{
  id: string
  title: string
  courses: Course[]
  completionPercentage: number
}
```

### Course
```typescript
{
  id: string
  title: string
  progress: number
  skills: string[]
}
```

### SkillProgress
```typescript
{
  name: string
  level: number
  coursesContributing: string[]
}
```

## 2.2 データ永続化
- Zustandによるステート管理
- ローカルストレージでの認証情報保存
- API応答のメモリ内キャッシュ
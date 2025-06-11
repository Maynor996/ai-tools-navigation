# AI 工具导航站 - GitHub Pages 自动化项目

一个基于 GitHub Pages 和 Jekyll 的 AI 工具导航网站，支持每日自动更新内容。

## 🚀 特性

- ✅ **自动更新**：每天自动检查AI平台状态并更新页面
- ✅ **真实链接**：集成真实可用的AI工具平台
- ✅ **状态监控**：实时检测平台可用性和响应时间
- ✅ **GitHub Pages**：完全免费托管，自定义域名支持
- ✅ **响应式设计**：移动端友好的现代化界面
- ✅ **Jekyll 静态生成**：快速加载，SEO 友好
- ✅ **API支持**：包含AI API中转服务

## 🔗 已集成的AI平台

| 平台名称 | 链接 | 特色功能 |
|---------|------|----------|
| AGI智能助手 | [agi.maynor1024.live](https://agi.maynor1024.live/list/#/) | 多模型集成、GPT-4、Claude、Gemini |
| ChatGPT Plus 站点 | [chatgpt-plus.top](https://chatgpt-plus.top/) | GPT-4支持、插件功能 |
| Claude Opus 平台 | [claude-opus.top](https://claude-opus.top/list) | Claude-3.5-Sonnet、长文本处理 |
| API中转服务 | [apipro.maynor1024.live](https://apipro.maynor1024.live/) | 稳定API代理、开发者友好 |

## 📁 项目结构

```
├── demo13.md                    # 主页面内容
├── _config.yml                  # Jekyll 配置
├── Gemfile                      # Ruby 依赖
├── .github/
│   └── workflows/
│       └── update-site.yml      # 自动更新工作流
├── scripts/
│   └── update-tools.js          # 更新脚本
├── _data/
│   └── site_data.json          # 自动生成的数据
└── README.md                    # 项目说明
```

## 🛠️ 部署步骤

### 1. 复制项目

1. 在 GitHub 创建新仓库
2. 将项目文件上传到仓库
3. 确保文件结构完整

### 2. 配置 GitHub Pages

1. 进入仓库 Settings
2. 找到 "Pages" 部分
3. Source 选择 "GitHub Actions"
4. 等待自动部署完成

### 3. 修改配置

编辑 `_config.yml` 文件：

```yaml
title: "你的网站标题"
description: "你的网站描述"
url: "https://yourusername.github.io"
baseurl: "/your-repo-name"
author: "你的名字"
```

### 4. 自定义内容

编辑 `demo13.md`：
- 修改标题和描述
- 更新AI工具列表
- 添加你的推荐平台
- 自定义使用指南

### 5. 配置自动更新

编辑 `scripts/update-tools.js`：
- 修改 `TOOLS_CONFIG` 中的工具配置
- 添加真实的检测URL
- 自定义检测逻辑

## ⚙️ 自动更新机制

### GitHub Actions 工作流

项目使用 GitHub Actions 实现自动更新：

```yaml
# 每天北京时间上午9点运行
schedule:
  - cron: '0 1 * * *'
```

### 更新内容

自动更新包括：
- ✅ 时间戳更新
- ✅ AI平台可用性检测
- ✅ 免费额度信息更新
- ✅ 访问统计生成
- ✅ AI新闻获取（可选）

### 监控脚本

`scripts/update-tools.js` 负责：
- 检查各AI平台的可用性
- 更新状态信息
- 生成统计数据
- 更新页面内容

## 🔧 本地开发

### 环境要求

- Ruby 3.1+
- Jekyll
- Node.js 18+

### 安装依赖

```bash
# 安装 Ruby 依赖
bundle install

# 安装 Node.js 依赖
npm install axios cheerio
```

### 本地运行

```bash
# 启动 Jekyll 服务器
bundle exec jekyll serve

# 测试更新脚本
node scripts/update-tools.js
```

访问 `http://localhost:4000` 查看效果。

## 📊 自定义功能

### 添加新的AI工具

在 `scripts/update-tools.js` 中的 `TOOLS_CONFIG` 添加：

```javascript
'新工具名称': {
  urls: ['https://example.com'],
  keywords: ['关键词1', '关键词2'],
  checkMethod: 'ping' // 或 'content', 'status', 'api'
}
```

### 修改检测频率

编辑 `.github/workflows/update-site.yml`：

```yaml
schedule:
  # 每6小时运行一次
  - cron: '0 */6 * * *'
```

### 自定义主题

编辑 `_config.yml` 修改主题：

```yaml
theme: minima  # 或其他 Jekyll 主题
```

创建 `_layouts/` 目录添加自定义布局。

## 🌟 高级配置

### 自定义域名

1. 在仓库根目录创建 `CNAME` 文件
2. 写入你的域名：`your-domain.com`
3. 在域名服务商配置 CNAME 记录

### 添加分析工具

在 `_config.yml` 中添加：

```yaml
google_analytics: UA-XXXXXXXXX-X
# 或
google_analytics: G-XXXXXXXXXX
```

### API 集成

修改 `scripts/update-tools.js` 集成真实API：

```javascript
// 集成真实的新闻API
async function fetchAINews() {
  const response = await axios.get('https://api.example.com/ai-news');
  return response.data;
}

// 集成真实的统计API
async function getRealStats() {
  const response = await axios.get('https://api.analytics.com/stats');
  return response.data;
}
```

## 🔍 故障排除

### 常见问题

1. **GitHub Actions 失败**
   - 检查权限设置：Settings → Actions → General
   - 确保启用 "Read and write permissions"

2. **页面不更新**
   - 检查 `_config.yml` 语法
   - 查看 Actions 日志排错

3. **样式问题**
   - 确保 CSS 路径正确
   - 检查主题配置

### 调试方法

```bash
# 检查 Jekyll 构建
bundle exec jekyll build --verbose

# 检查更新脚本
node scripts/update-tools.js

# 查看详细错误
bundle exec jekyll serve --trace
```

## 📝 贡献指南

1. Fork 本项目
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 支持

- 🐛 [提交 Bug](../../issues)
- 💡 [功能建议](../../issues)
- 📧 邮件：your-email@example.com

## 🎯 路线图

- [ ] 添加更多AI平台支持
- [ ] 实现用户评分系统
- [ ] 添加移动端 PWA 支持
- [ ] 集成真实API数据源
- [ ] 多语言支持

---

⭐ 如果这个项目对你有帮助，请给个星标支持！ 
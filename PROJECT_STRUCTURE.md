# 📁 项目结构说明

## 🏗️ 完整目录结构

```
ai-tools-navigation/
├── 📄 index.md                    # 主页面内容（原demo13.md）
├── ⚙️ _config.yml                 # Jekyll 配置文件
├── 💎 Gemfile                     # Ruby 依赖管理
├── 📦 package.json                # Node.js 依赖管理
├── 📖 README.md                   # 项目说明文档
├── 📝 CHANGELOG.md                # 更新日志
├── 📄 LICENSE                     # MIT 许可证
├── 🚫 .gitignore                  # Git 忽略规则
├── 📊 PROJECT_STRUCTURE.md        # 项目结构说明（本文件）
│
├── 🤖 .github/                    # GitHub 配置
│   └── workflows/
│       └── update-site.yml        # 自动更新工作流
│
├── 🔧 scripts/                    # 自动化脚本
│   └── update-tools.js            # 主要更新脚本
│
├── 📊 _data/                      # Jekyll 数据文件（自动生成）
│   ├── site_data.json            # 站点统计数据
│   └── last_update.json          # 最后更新信息
│
├── 🎨 _layouts/                   # Jekyll 布局模板
│   ├── default.html              # 默认布局
│   ├── page.html                 # 页面布局
│   └── post.html                 # 文章布局
│
└── 📁 assets/                     # 静态资源
    ├── css/                      # 样式文件
    │   └── main.scss             # 主样式
    ├── js/                       # JavaScript 文件
    │   └── main.js               # 主脚本
    └── images/                   # 图片资源
        └── logo.png              # 网站 Logo
```

## 📋 核心文件说明

### 🏠 主要页面
- **`index.md`** - 网站主页，包含AI工具导航表格、使用指南等内容
- **`_config.yml`** - Jekyll 站点配置，定义网站标题、URL、插件等

### 🔧 依赖管理
- **`Gemfile`** - Ruby 依赖，主要用于 Jekyll 和相关插件
- **`package.json`** - Node.js 依赖，用于自动化脚本（axios、cheerio等）

### 🤖 自动化系统
- **`.github/workflows/update-site.yml`** - GitHub Actions 工作流
  - 每天自动运行
  - 更新时间戳
  - 检查AI平台状态
  - 部署到 GitHub Pages

- **`scripts/update-tools.js`** - 核心更新脚本
  - AI平台可用性检测
  - 数据统计生成
  - 内容自动更新

### 📊 数据文件
- **`_data/`** - Jekyll 数据目录（自动生成）
  - `site_data.json` - 平台状态、访问统计等
  - `last_update.json` - 最后更新时间和日志

### 🎨 界面设计
- **`_layouts/`** - Jekyll 模板文件
- **`assets/`** - 静态资源（CSS、JS、图片）

## 🚀 快速开始

### 1. 本地开发
```bash
# 进入项目目录
cd ai-tools-navigation

# 安装 Ruby 依赖
bundle install

# 安装 Node.js 依赖
npm install

# 启动本地服务器
bundle exec jekyll serve

# 访问 http://localhost:4000
```

### 2. 测试更新脚本
```bash
# 运行更新脚本
npm run update
# 或
node scripts/update-tools.js
```

### 3. 部署到 GitHub Pages
```bash
# 1. 推送到 GitHub 仓库
git add .
git commit -m "Initial commit"
git push origin main

# 2. 在 GitHub 仓库设置中启用 Pages
# Settings → Pages → Source → GitHub Actions
```

## ⚙️ 自定义配置

### 修改网站信息
编辑 `_config.yml`：
```yaml
title: "你的网站标题"
description: "你的网站描述"
url: "https://yourusername.github.io"
baseurl: "/your-repo-name"
```

### 添加AI平台
编辑 `scripts/update-tools.js` 中的 `TOOLS_CONFIG`：
```javascript
'新平台名称': {
  urls: ['https://example.com'],
  keywords: ['关键词'],
  checkMethod: 'ping'
}
```

### 修改更新频率
编辑 `.github/workflows/update-site.yml`：
```yaml
schedule:
  - cron: '0 */6 * * *'  # 每6小时运行一次
```

## 🔍 文件权限

### 可编辑文件
- ✅ `index.md` - 主页内容
- ✅ `_config.yml` - 站点配置
- ✅ `scripts/update-tools.js` - 更新逻辑
- ✅ `README.md` - 说明文档

### 自动生成文件
- 🤖 `_data/site_data.json` - 自动生成，不要手动编辑
- 🤖 `_data/last_update.json` - 自动生成，不要手动编辑
- 🤖 `_site/` - Jekyll 构建输出，不要版本控制

## 📈 功能扩展

### 添加新页面
在根目录创建新的 `.md` 文件：
```markdown
---
layout: page
title: "新页面标题"
---

页面内容...
```

### 自定义样式
在 `assets/css/` 中添加样式文件：
```scss
// assets/css/custom.scss
.my-custom-style {
  color: #333;
}
```

### 添加新功能
1. 修改 `scripts/update-tools.js` 添加新的检测逻辑
2. 更新 `.github/workflows/update-site.yml` 添加新的自动化步骤
3. 在 `index.md` 中展示新功能的结果

## 🛠️ 故障排除

### 常见问题文件位置
- **构建失败** → 检查 `_config.yml` 语法
- **脚本错误** → 查看 `scripts/update-tools.js` 日志
- **自动化失败** → 检查 `.github/workflows/update-site.yml`
- **样式问题** → 检查 `assets/css/` 中的样式文件

### 日志位置
- GitHub Actions 日志：仓库 → Actions 标签页
- Jekyll 构建日志：运行 `bundle exec jekyll build --verbose`
- 更新脚本日志：运行 `node scripts/update-tools.js`

---

🎯 **提示**：这个项目结构遵循 Jekyll 和 GitHub Pages 的最佳实践，所有文件都有明确的用途和位置。 
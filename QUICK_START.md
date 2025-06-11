# 🚀 快速启动指南

欢迎使用 AI工具导航站！这是一个5分钟快速部署指南。

## 📋 前置要求

- Git
- Ruby (推荐 3.1+)
- Node.js (推荐 18+)
- GitHub 账号

## ⚡ 3分钟部署

### 1️⃣ 克隆到本地

```bash
# 下载项目文件夹到本地
cd /your/projects/directory
# 文件夹已经在 ai-tools-navigation/ 中
```

### 2️⃣ 一键部署

**在 Windows 上：**
```powershell
cd ai-tools-navigation
# 运行部署脚本（需要 Git Bash 或 WSL）
bash deploy.sh
```

**在 macOS/Linux 上：**
```bash
cd ai-tools-navigation
./deploy.sh
```

### 3️⃣ 推送到 GitHub

```bash
# 1. 在 GitHub 创建新仓库 "ai-tools-navigation"

# 2. 推送代码
git remote add origin https://github.com/yourusername/ai-tools-navigation.git
git branch -M main
git push -u origin main
```

### 4️⃣ 启用 GitHub Pages

1. 进入 GitHub 仓库 → **Settings**
2. 左侧菜单找到 **Pages**
3. Source 选择 **GitHub Actions**
4. 等待 2-3 分钟自动部署

### 5️⃣ 访问你的网站

```
https://yourusername.github.io/ai-tools-navigation
```

## 🔧 快速自定义

### 修改网站信息

编辑 `_config.yml`：
```yaml
title: "你的AI工具导航"
description: "最全面的AI工具中文指南"
url: "https://yourusername.github.io"
baseurl: "/ai-tools-navigation"
author: "你的名字"
```

### 添加AI平台

编辑 `scripts/update-tools.js`，在 `TOOLS_CONFIG` 中添加：
```javascript
'新AI平台': {
  urls: ['https://new-ai-platform.com'],
  keywords: ['ai', 'platform'],
  checkMethod: 'ping'  // 或 'content', 'status', 'api'
}
```

### 修改页面内容

编辑 `index.md`：
- 更新工具推荐表格
- 修改使用指南
- 添加新的FAQ
- 自定义页面样式

## ⏰ 自动更新设置

项目默认每天北京时间上午9点自动更新。修改更新频率：

编辑 `.github/workflows/update-site.yml`：
```yaml
schedule:
  - cron: '0 1 * * *'    # 每天1点 (北京时间9点)
  - cron: '0 13 * * *'   # 每天13点 (北京时间21点)
```

## 🧪 本地测试

```bash
# 安装依赖
bundle install
npm install

# 启动本地服务器
bundle exec jekyll serve

# 访问 http://localhost:4000
```

## 🎯 核心功能

✅ **自动更新时间戳** - 每天自动更新"最后更新时间"  
✅ **AI平台监控** - 自动检测各平台可用性  
✅ **使用统计** - 模拟访问量和使用数据  
✅ **响应式设计** - 完美支持手机端访问  
✅ **SEO优化** - 搜索引擎友好  

## 📱 手机端优化

网站自动适配手机屏幕，包括：
- 响应式表格
- 移动端友好的导航
- 触摸优化的按钮
- 快速加载优化

## 🔍 SEO 配置

自动包含：
- Meta 标签优化
- Open Graph 标签
- 结构化数据
- Sitemap 生成
- RSS 订阅源

## 💡 进阶技巧

### 1. 自定义域名
在仓库根目录创建 `CNAME` 文件：
```
your-domain.com
```

### 2. 添加 Google Analytics
在 `_config.yml` 中添加：
```yaml
google_analytics: G-XXXXXXXXXX
```

### 3. 自定义样式
创建 `assets/css/custom.scss`：
```scss
@import "minima";

.custom-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## ❓ 常见问题

**Q: 部署失败怎么办？**
A: 检查 GitHub Actions 日志，通常是权限或配置问题

**Q: 如何添加新功能？**
A: 修改 `scripts/update-tools.js` 添加新的检测逻辑

**Q: 可以商用吗？**
A: 可以，项目使用 MIT 许可证

**Q: 如何备份数据？**
A: GitHub 仓库就是最好的备份

## 📞 获取帮助

- 📖 详细文档：查看 `README.md`
- 🏗️ 项目结构：查看 `PROJECT_STRUCTURE.md`
- 🐛 报告问题：创建 GitHub Issue
- 💬 交流讨论：GitHub Discussions

---

🎉 **恭喜！你的AI工具导航站已经部署完成！**

记得定期检查更新，添加更多实用的AI工具推荐。 
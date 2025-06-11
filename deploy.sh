#!/bin/bash

# AI工具导航站 - 一键部署脚本
# 作者：AI工具导航团队
# 版本：1.0.0

echo "🚀 开始部署 AI工具导航站..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查依赖
check_dependencies() {
    echo -e "${BLUE}📋 检查系统依赖...${NC}"
    
    # 检查 Git
    if ! command -v git &> /dev/null; then
        echo -e "${RED}❌ Git 未安装，请先安装 Git${NC}"
        exit 1
    fi
    
    # 检查 Ruby
    if ! command -v ruby &> /dev/null; then
        echo -e "${YELLOW}⚠️  Ruby 未安装，将尝试安装...${NC}"
        # 这里可以添加自动安装 Ruby 的逻辑
    fi
    
    # 检查 Node.js
    if ! command -v node &> /dev/null; then
        echo -e "${YELLOW}⚠️  Node.js 未安装，将尝试安装...${NC}"
        # 这里可以添加自动安装 Node.js 的逻辑
    fi
    
    echo -e "${GREEN}✅ 依赖检查完成${NC}"
}

# 安装依赖包
install_dependencies() {
    echo -e "${BLUE}📦 安装项目依赖...${NC}"
    
    # 安装 Ruby 依赖
    if [ -f "Gemfile" ]; then
        echo "安装 Ruby 依赖..."
        if command -v bundle &> /dev/null; then
            bundle install
        else
            gem install bundler
            bundle install
        fi
    fi
    
    # 安装 Node.js 依赖
    if [ -f "package.json" ]; then
        echo "安装 Node.js 依赖..."
        if command -v npm &> /dev/null; then
            npm install
        elif command -v yarn &> /dev/null; then
            yarn install
        else
            echo -e "${RED}❌ 未找到 npm 或 yarn${NC}"
            exit 1
        fi
    fi
    
    echo -e "${GREEN}✅ 依赖安装完成${NC}"
}

# 初始化 Git 仓库
init_git() {
    echo -e "${BLUE}🔧 初始化 Git 仓库...${NC}"
    
    if [ ! -d ".git" ]; then
        git init
        git add .
        git commit -m "🎉 Initial commit: AI工具导航站项目初始化"
        echo -e "${GREEN}✅ Git 仓库初始化完成${NC}"
    else
        echo -e "${YELLOW}⚠️  Git 仓库已存在${NC}"
    fi
}

# 配置检查
check_config() {
    echo -e "${BLUE}⚙️  检查配置文件...${NC}"
    
    # 检查 _config.yml
    if [ -f "_config.yml" ]; then
        echo "✅ Jekyll 配置文件存在"
    else
        echo -e "${RED}❌ 缺少 _config.yml 文件${NC}"
        exit 1
    fi
    
    # 检查主页文件
    if [ -f "index.md" ]; then
        echo "✅ 主页文件存在"
    else
        echo -e "${RED}❌ 缺少 index.md 文件${NC}"
        exit 1
    fi
    
    # 检查更新脚本
    if [ -f "scripts/update-tools.js" ]; then
        echo "✅ 更新脚本存在"
    else
        echo -e "${YELLOW}⚠️  缺少更新脚本${NC}"
    fi
    
    echo -e "${GREEN}✅ 配置检查完成${NC}"
}

# 本地测试
local_test() {
    echo -e "${BLUE}🧪 启动本地测试服务器...${NC}"
    
    # 测试更新脚本
    if [ -f "scripts/update-tools.js" ]; then
        echo "测试更新脚本..."
        node scripts/update-tools.js
    fi
    
    # 构建 Jekyll 站点
    echo "构建 Jekyll 站点..."
    if command -v bundle &> /dev/null; then
        bundle exec jekyll build
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Jekyll 构建成功${NC}"
            echo -e "${BLUE}💡 运行 'bundle exec jekyll serve' 启动本地服务器${NC}"
        else
            echo -e "${RED}❌ Jekyll 构建失败${NC}"
            exit 1
        fi
    fi
}

# GitHub Pages 配置提示
github_pages_setup() {
    echo -e "${BLUE}🔗 GitHub Pages 部署说明...${NC}"
    
    cat << EOF

${YELLOW}📋 GitHub Pages 部署步骤：${NC}

1. 创建 GitHub 仓库：
   - 登录 GitHub
   - 点击 "New repository"
   - 输入仓库名称（如：ai-tools-navigation）

2. 推送代码到 GitHub：
   ${BLUE}git remote add origin https://github.com/yourusername/your-repo-name.git
   git branch -M main
   git push -u origin main${NC}

3. 配置 GitHub Pages：
   - 进入仓库 Settings
   - 找到 "Pages" 部分
   - Source 选择 "GitHub Actions"
   - 等待自动部署完成

4. 访问你的网站：
   ${GREEN}https://yourusername.github.io/your-repo-name${NC}

${YELLOW}🔧 自定义配置：${NC}
- 编辑 _config.yml 修改网站信息
- 编辑 index.md 自定义页面内容
- 编辑 scripts/update-tools.js 添加更多AI平台

EOF
}

# 主函数
main() {
    echo -e "${GREEN}"
    cat << "EOF"
     _    ___   _____           _     
    / \  |_ _| |_   _|___  ___ | |___ 
   / _ \  | |    | |/ _ \/ _ \| / __|
  / ___ \ | |    | | (_) | (_) | \__ \
 /_/   \_\___|   |_|\___/ \___/|_|___/
                                     
AI 工具导航站 - 自动化部署脚本
EOF
    echo -e "${NC}"
    
    check_dependencies
    check_config
    install_dependencies
    init_git
    local_test
    github_pages_setup
    
    echo -e "${GREEN}"
    echo "🎉 部署脚本执行完成！"
    echo "📖 查看 README.md 获取详细使用说明"
    echo "📊 查看 PROJECT_STRUCTURE.md 了解项目结构"
    echo -e "${NC}"
}

# 处理命令行参数
case "$1" in
    --check-only)
        check_dependencies
        check_config
        ;;
    --install-only)
        install_dependencies
        ;;
    --test-only)
        local_test
        ;;
    --help)
        echo "用法: $0 [选项]"
        echo "选项:"
        echo "  --check-only    仅检查依赖和配置"
        echo "  --install-only  仅安装依赖"
        echo "  --test-only     仅运行本地测试"
        echo "  --help          显示此帮助信息"
        ;;
    *)
        main
        ;;
esac 
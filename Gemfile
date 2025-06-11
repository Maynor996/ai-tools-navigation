source "https://rubygems.org"

# GitHub Pages 兼容 - 使用github-pages gem来确保版本一致
gem "github-pages", group: :jekyll_plugins

# 主题
gem "minima", "~> 2.5"

# 插件
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Windows 和 JRuby 支持
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# 安全补丁
gem "webrick", "~> 1.7" 
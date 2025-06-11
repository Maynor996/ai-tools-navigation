source "https://rubygems.org"

# Jekyll 核心
gem "jekyll", "~> 4.3.0"

# GitHub Pages 兼容
gem "github-pages", group: :jekyll_plugins

# 主题
gem "minima", "~> 2.5"

# 插件
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
  gem "jekyll-paginate"
  gem "jekyll-archives"
end

# Windows 和 JRuby 支持
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby] 
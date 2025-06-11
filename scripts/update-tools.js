const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

// 工具配置
const TOOLS_CONFIG = {
  'AGI智能助手': {
    urls: ['https://agi.maynor1024.live/list/#/'],
    keywords: ['agi', 'chatgpt', 'claude', 'gemini'],
    checkMethod: 'ping',
    displayName: 'AGI智能助手'
  },
  'ChatGPT Plus 站点': {
    urls: ['https://chatgpt-plus.top/'],
    keywords: ['chatgpt', 'openai', 'gpt'],
    checkMethod: 'content',
    displayName: 'ChatGPT Plus 站点'
  },
  'Claude Opus 平台': {
    urls: ['https://claude-opus.top/list'],
    keywords: ['claude', 'anthropic', 'opus'],
    checkMethod: 'content',
    displayName: 'Claude Opus 平台'
  },
  'API中转服务': {
    urls: ['https://apipro.maynor1024.live/'],
    keywords: ['api', 'proxy', 'service'],
    checkMethod: 'ping',
    displayName: 'API中转服务'
  }
};

// 检查网站可用性
async function checkSiteAvailability(url, method = 'ping') {
  try {
    const timeout = 15000; // 15秒超时，给真实网站更多时间
    const response = await axios.get(url, {
      timeout,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      validateStatus: function (status) {
        return status < 500; // 接受小于500的状态码
      }
    });

    switch (method) {
      case 'ping':
        return response.status >= 200 && response.status < 400;
      
      case 'content':
        const $ = cheerio.load(response.data);
        const hasContent = $('body').text().length > 100;
        const isValidStatus = response.status >= 200 && response.status < 400;
        return isValidStatus && hasContent;
      
      case 'status':
        return response.status >= 200 && response.status < 400 && response.data.includes('html');
      
      case 'api':
        return response.status >= 200 && response.status < 400;
      
      default:
        return response.status >= 200 && response.status < 400;
    }
  } catch (error) {
    console.log(`检查 ${url} 失败:`, error.message);
    
    // 特殊处理一些常见错误
    if (error.code === 'ENOTFOUND') {
      console.log(`DNS解析失败: ${url}`);
    } else if (error.code === 'ECONNREFUSED') {
      console.log(`连接被拒绝: ${url}`);
    } else if (error.code === 'ETIMEDOUT') {
      console.log(`连接超时: ${url}`);
    }
    
    return false;
  }
}

// 获取随机用户代理
function getRandomUserAgent() {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/121.0'
  ];
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

// 更新工具状态
async function updateToolsStatus() {
  console.log('开始检查AI工具平台状态...');
  
  const results = {};
  
  for (const [toolName, config] of Object.entries(TOOLS_CONFIG)) {
    console.log(`正在检查 ${config.displayName}...`);
    
    let isAvailable = false;
    let availableUrl = null;
    let responseTime = 0;
    
    // 检查配置中的所有URL
    for (const url of config.urls) {
      const startTime = Date.now();
      const available = await checkSiteAvailability(url, config.checkMethod);
      responseTime = Date.now() - startTime;
      
      if (available) {
        isAvailable = true;
        availableUrl = url;
        break;
      }
      
      // 在URL检查之间稍微延迟，避免过于频繁的请求
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    results[toolName] = {
      available: isAvailable,
      url: availableUrl,
      responseTime: responseTime,
      lastChecked: new Date().toISOString(),
      status: isAvailable ? '✅ 可用' : '❌ 不可用',
      displayName: config.displayName
    };
    
    console.log(`${config.displayName}: ${results[toolName].status} (响应时间: ${responseTime}ms)`);
  }
  
  return results;
}

// 生成访问量统计（模拟数据，可以接入真实统计API）
function generateUsageStats() {
  const currentHour = new Date().getHours();
  const isBusinessHour = currentHour >= 9 && currentHour <= 21;
  
  // 根据时间段生成更真实的访问量
  const baseDailyVisitors = isBusinessHour ? 800 : 300;
  const randomFactor = Math.random() * 0.3 + 0.85; // 0.85-1.15的随机因子
  
  return {
    daily_visitors: Math.floor(baseDailyVisitors * randomFactor),
    weekly_visitors: Math.floor((baseDailyVisitors * 7) * randomFactor),
    monthly_visitors: Math.floor((baseDailyVisitors * 30) * randomFactor),
    active_platforms: Object.keys(TOOLS_CONFIG).length,
    last_updated: new Date().toISOString(),
    update_frequency: '每日自动更新'
  };
}

// 获取最新AI新闻（示例，可接入真实新闻API）
async function fetchAINews() {
  // 这里可以集成真实的新闻API，比如聚合数据、天行数据等
  const mockNews = [
    {
      title: "AGI智能助手新增多模型支持",
      summary: "现在可以在同一平台使用GPT-4、Claude和Gemini多种模型",
      date: new Date().toISOString().split('T')[0],
      category: "产品更新"
    },
    {
      title: "AI API中转服务稳定性提升",
      summary: "新的负载均衡技术显著提高了API服务的可用性",
      date: new Date().toISOString().split('T')[0],
      category: "技术改进"
    },
    {
      title: "Claude Opus在代码生成方面表现突出",
      summary: "最新测试显示Claude在复杂代码任务上准确率达到95%",
      date: new Date().toISOString().split('T')[0],
      category: "性能评测"
    }
  ];
  
  // 随机返回1-2条新闻
  const newsCount = Math.floor(Math.random() * 2) + 1;
  return mockNews.slice(0, newsCount);
}

// 更新markdown文件
async function updateMarkdownFile() {
  try {
    console.log('读取现有文件内容...');
    let content = fs.readFileSync('index.md', 'utf8');
    
    // 获取工具状态
    const toolsStatus = await updateToolsStatus();
    
    // 获取使用统计
    const usageStats = generateUsageStats();
    
    // 获取AI新闻
    const aiNews = await fetchAINews();
    
    // 更新时间戳
    const now = new Date();
    const chinaTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    const timeStr = chinaTime.toISOString().replace('T', ' ').substring(0, 19);
    
    content = content.replace(
      /\*\*更新时间：\*\* .*/,
      `**更新时间：** ${timeStr} (北京时间)`
    );
    
    // 更新底部时间戳
    content = content.replace(
      /\*最后更新：.*/,
      `*最后更新：${chinaTime.toISOString().split('T')[0]}*`
    );
    
    // 可以在这里添加更复杂的内容更新逻辑
    // 比如根据平台状态更新表格中的状态信息
    
    console.log('更新文件内容...');
    fs.writeFileSync('index.md', content);
    
    // 保存详细数据到JSON文件
    const updateData = {
      timestamp: timeStr,
      tools_status: toolsStatus,
      usage_stats: usageStats,
      ai_news: aiNews,
      update_info: {
        tools_checked: Object.keys(toolsStatus).length,
        available_tools: Object.values(toolsStatus).filter(t => t.available).length,
        unavailable_tools: Object.values(toolsStatus).filter(t => !t.available).length,
        average_response_time: Math.round(
          Object.values(toolsStatus).reduce((sum, t) => sum + t.responseTime, 0) / 
          Object.keys(toolsStatus).length
        )
      }
    };
    
    // 确保_data目录存在
    if (!fs.existsSync('_data')) {
      fs.mkdirSync('_data', { recursive: true });
    }
    
    fs.writeFileSync('_data/site_data.json', JSON.stringify(updateData, null, 2));
    
    // 生成状态摘要
    console.log('\n🎉 文件更新完成！');
    console.log('=' * 50);
    console.log(`📊 更新摘要:`);
    console.log(`   • 检查平台数量: ${updateData.update_info.tools_checked}`);
    console.log(`   • 可用平台: ${updateData.update_info.available_tools}`);
    console.log(`   • 不可用平台: ${updateData.update_info.unavailable_tools}`);
    console.log(`   • 平均响应时间: ${updateData.update_info.average_response_time}ms`);
    console.log(`   • 今日预计访问: ${usageStats.daily_visitors}`);
    console.log(`   • 新闻更新: ${aiNews.length} 条`);
    console.log('=' * 50);
    
    return updateData;
    
  } catch (error) {
    console.error('❌ 更新失败:', error);
    throw error;
  }
}

// 主函数
async function main() {
  try {
    console.log('🚀 开始执行AI工具导航站自动更新...\n');
    await updateMarkdownFile();
    console.log('\n✅ 自动更新完成！');
  } catch (error) {
    console.error('\n💥 自动更新失败:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = {
  updateMarkdownFile,
  updateToolsStatus,
  checkSiteAvailability,
  generateUsageStats,
  fetchAINews
}; 
#!/usr/bin/env node

/**
 * AI工具导航站 - 本地测试脚本
 * 用于测试更新功能和链接检测
 */

const { updateToolsStatus, generateUsageStats, fetchAINews } = require('./scripts/update-tools.js');

console.log('🧪 开始本地测试...\n');

async function runTests() {
  try {
    console.log('=' * 60);
    console.log('📋 测试1: 检测AI工具平台状态');
    console.log('=' * 60);
    
    const toolsStatus = await updateToolsStatus();
    
    console.log('\n📊 检测结果汇总:');
    Object.entries(toolsStatus).forEach(([name, info]) => {
      console.log(`  • ${info.displayName}: ${info.status}`);
      if (info.available) {
        console.log(`    响应时间: ${info.responseTime}ms`);
        console.log(`    检测URL: ${info.url}`);
      }
      console.log(`    检测时间: ${new Date(info.lastChecked).toLocaleString()}`);
      console.log('');
    });
    
    console.log('=' * 60);
    console.log('📊 测试2: 生成使用统计');
    console.log('=' * 60);
    
    const usageStats = generateUsageStats();
    console.log(`  • 今日预计访问: ${usageStats.daily_visitors}`);
    console.log(`  • 本周预计访问: ${usageStats.weekly_visitors}`);
    console.log(`  • 本月预计访问: ${usageStats.monthly_visitors}`);
    console.log(`  • 活跃平台数量: ${usageStats.active_platforms}`);
    console.log(`  • 更新频率: ${usageStats.update_frequency}`);
    
    console.log('\n=' * 60);
    console.log('📰 测试3: 获取AI新闻');
    console.log('=' * 60);
    
    const aiNews = await fetchAINews();
    aiNews.forEach((news, index) => {
      console.log(`  📄 新闻 ${index + 1}:`);
      console.log(`     标题: ${news.title}`);
      console.log(`     摘要: ${news.summary}`);
      console.log(`     分类: ${news.category}`);
      console.log(`     日期: ${news.date}`);
      console.log('');
    });
    
    console.log('=' * 60);
    console.log('🎯 测试总结');
    console.log('=' * 60);
    
    const availableCount = Object.values(toolsStatus).filter(t => t.available).length;
    const totalCount = Object.keys(toolsStatus).length;
    const successRate = ((availableCount / totalCount) * 100).toFixed(1);
    
    console.log(`  ✅ 可用平台: ${availableCount}/${totalCount} (${successRate}%)`);
    console.log(`  📊 统计数据生成: 成功`);
    console.log(`  📰 新闻获取: ${aiNews.length} 条`);
    
    // 计算平均响应时间
    const responseTimes = Object.values(toolsStatus).map(t => t.responseTime);
    const avgResponseTime = Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length);
    console.log(`  ⚡ 平均响应时间: ${avgResponseTime}ms`);
    
    // 生成建议
    console.log('\n💡 优化建议:');
    
    const slowPlatforms = Object.entries(toolsStatus)
      .filter(([name, info]) => info.available && info.responseTime > 5000)
      .map(([name, info]) => info.displayName);
    
    if (slowPlatforms.length > 0) {
      console.log(`  ⚠️  响应较慢的平台: ${slowPlatforms.join(', ')}`);
    }
    
    const unavailablePlatforms = Object.entries(toolsStatus)
      .filter(([name, info]) => !info.available)
      .map(([name, info]) => info.displayName);
    
    if (unavailablePlatforms.length > 0) {
      console.log(`  ❌ 暂时不可用的平台: ${unavailablePlatforms.join(', ')}`);
      console.log(`     建议: 检查网络连接或平台维护状态`);
    }
    
    if (successRate < 75) {
      console.log(`  🔧 可用率较低 (${successRate}%)，建议检查网络环境`);
    } else if (successRate >= 90) {
      console.log(`  🎉 可用率优秀 (${successRate}%)！`);
    }
    
    console.log('\n🏁 测试完成！');
    
  } catch (error) {
    console.error('💥 测试过程中发生错误:', error);
    process.exit(1);
  }
}

// 添加一些实用的测试选项
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
AI工具导航站测试脚本

用法: node test-update.js [选项]

选项:
  --help, -h     显示帮助信息
  --quick, -q    快速测试（仅检测第一个URL）
  --verbose, -v  详细输出
  --json         输出JSON格式结果

示例:
  node test-update.js           # 完整测试
  node test-update.js --quick   # 快速测试
  node test-update.js --json    # JSON输出
  `);
  process.exit(0);
}

if (args.includes('--json')) {
  // JSON输出模式
  runTests().then(() => {
    // 这里可以输出JSON格式的测试结果
  });
} else {
  // 标准输出模式
  runTests();
}

// 监听进程退出
process.on('SIGINT', () => {
  console.log('\n\n👋 测试被用户中断');
  process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的Promise拒绝:', reason);
  process.exit(1);
}); 
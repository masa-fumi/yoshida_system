const { environment } = require('@rails/webpacker')

// 修正: 無効な node プロパティを削除または設定
environment.config.set('node', false)


module.exports = environment

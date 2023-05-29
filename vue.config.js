module.exports = {
    publicPath: process.env.RUN_ON === 'development'
        ? '/store/'
        : '/',
    devServer: {
        disableHostCheck: true
    }
}
module.exports = {
    entry: './app/main.js',
    output: {
        path: 'public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: __dirname + '/app'
            },
            {
                test: /\.css/,
                loaders: ['style', 'css']
            },
            {
                test: /\.scss/,
                loader: 'style!css!sass'
            },
            {
                test:   /\.html/,
                loader: 'html',
            }
        ]
    },
    plugins: []
}

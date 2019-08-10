import * as path from 'path';
import * as StartServerPlugin from "start-server-webpack-plugin";
import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals'

const config: webpack.Configuration = {
    mode: 'development',
    entry: [
        'webpack/hot/poll?1000',
        path.resolve(__dirname, '../server/server.ts')
    ],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "server.js"
    },
    externals: [nodeExternals({
        whitelist: ['webpack/hot/poll?1000']
    })],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            configFile: path.resolve(__dirname, './tsconfig.json')
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    target: "node",
    resolve: {
        extensions: [".ts", ".js", ".json"],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new StartServerPlugin({
            name: 'server.js',
            signal: true,
            nodeArgs: ['--inspect']
        }),
    ]
}

export default config 
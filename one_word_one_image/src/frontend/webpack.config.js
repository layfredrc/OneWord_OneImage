const webpack = require("webpack");
const path = require("path");
module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, "src")],
                use: {
                    loader: "buffer-loader",
                },
            },
        ],
    },
};

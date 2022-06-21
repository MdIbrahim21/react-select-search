module.exports = {
    stories: [
        '../stories/**/*.stories.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    'addons': [
        '@storybook/addon-essentials'
    ],
    features: {
        postcss: false,
    },
    webpackFinal: async config => {
        const devMode = process.env.NODE_ENV !== 'production';

        // get index of css rule
        config.module.rules.find(
            rule => rule.test.toString() === '/\\.css$/',
        ).exclude = /\.module\.css$/;

        config.module.rules.push({
            test: /\.module\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: (devMode) ? 'mm-[name]__[local]--[hash:base64:5]' : '[hash:base64:5]',
                        },
                    }
                },
            ]
        });

        // Return the altered config
        return config;
    },
};

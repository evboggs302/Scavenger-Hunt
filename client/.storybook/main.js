module.exports = {
    stories: ['../src/**/*/.stories.@(js|jsx|ts|tsx)'],
    addons: [
        'storycap',
        '@storybook/addon-links',
        '@storybook/addon-actions',
    ],
    typescript: {
        reactDogen: false,
    }
};
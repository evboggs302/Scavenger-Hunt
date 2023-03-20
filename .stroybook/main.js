module.exports = {
    stories: ['../src/ui/**/*/.stories.@(js|jsx|ts|tsx)'],
    addons: [
        'storycap',
        '@storybook/addon-links',
        '@storybook/addon-actions',
    ],
    typescript: {
        reactDogen: false,
    }
};
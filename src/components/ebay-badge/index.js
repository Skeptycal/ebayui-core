const markoWidgets = require('marko-widgets');
const processHtmlAttributes = require('../../common/html-attributes');
const template = require('./template.marko');

function getTemplateData(state, input) {
    const classes = [];
    let renderBody = input.renderBody;

    switch (input.type) {
        case 'icon':
            classes.push('icon-badge');
            break;
        case 'menu':
            classes.push('menu-badge');
            break;
        default:
            classes.push('badge');
    }

    // TODO remove if needed, for changing badge to having 9+
    if (input.count) {
        renderBody = (stream) => {
            stream.write(getInput(input.count, input.limit));
        };
    }

    classes.push(input.class);

    return {
        htmlAttributes: processHtmlAttributes(input),
        classes,
        renderBody,
        style: input.style
    };
}

function getInput(count, limit) {
    if (limit) {
        const parsed = parseInt(count, 10);
        const digits = Math.pow(10, limit);
        if (parsed >= digits) {
            return `${digits - 1}+`;
        }
    }
    return count;
}

module.exports = markoWidgets.defineComponent({
    template,
    getTemplateData
});

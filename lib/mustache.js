const mustache = require('mustache')

const renderString = (string, templates) => {
    return mustache.render(string, templates)
}

module.exports = {
    renderString
}
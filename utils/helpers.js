const datetime = require('date-and-time');

module.exports = {
    formatDate: date => datetime.format(date, 'ddd, MMM DD YYYY')
}
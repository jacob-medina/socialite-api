const { format } = require('date-fns');

module.exports = {
    formatDate: date => format(date, 'EEEE, LLL Mo y')
}
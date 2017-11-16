import date from 'helper-dateformat';

module.exports.register = function (Handlebars) {
  Handlebars.registerHelper("date", date);
};

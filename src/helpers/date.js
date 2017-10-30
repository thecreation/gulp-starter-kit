import date from 'helper-date';

module.exports.register = function (Handlebars) {
  Handlebars.registerHelper("date", date);
};

/**
 * Parse and format a date value using Moment.js.
 *
 * @api public
 */
module.exports = function(obj, indent) {
  return JSON.stringify(obj, null, indent);
};

_.mixin({groupByMulti: function (obj, values, context) {
  if (!values.length)
    return obj;
  var byFirst = _.groupBy(obj, values[0], context),
    rest = values.slice(1);
  for (var prop in byFirst) {
    if (byFirst.hasOwnProperty(prop)) {
      byFirst[prop] = _.groupByMulti(byFirst[prop], rest, context);
    }
  }
  return byFirst;
}});
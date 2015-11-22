_.mixin({nest: function (obj, values, context) {
  if (!values.length)
    return obj;

  var partitioned = _.partition(obj, values[0], context),
    rest = values.slice(1);

  for (var i = 0; i < partitioned.length; i++) {
    partitioned[i] = _.nest(partitioned[i], rest, context);
  }

  return partitioned;
}});
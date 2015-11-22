_.mixin({partitionWithLabel: function (array, key) {
  var bucket = [];
  var current = null;

  // persist labels
  if (array.label) {
    bucket.label = array.label;
  }

  // fencepost
  bucket[0] = [array[0]];
  current = array[0][key];
  bucket[0].label = current;

  for (var i = 1; i < array.length; i++) {
    if (current !== array[i][key]) {
      bucket[bucket.length] = [array[i]];
      current = array[i][key];
      bucket[bucket.length - 1].label = current;
    } else {
      bucket[bucket.length - 1].push(array[i]);
    }
  }

  return bucket;
}});
function run(it, res, err) {
  const { value, done } = err ? it.throw(err) : it.next(res);

  if (done) {
    return Promise.resolve(value);
  }

  return Promise.resolve(value)
    .then(res => {
      return next(it, res);
    })
    .catch(err => {
      return next(it, null, err);
    });
}

module.exports = function run(gen) {
  return next(gen());
}

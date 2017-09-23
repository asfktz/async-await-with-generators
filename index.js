const next = (it, res, err) => {
  const { value, done } = err ? it.throw(err) : it.next(res);

  if (done) {
    return Promise.resolve(value);
  }

  return Promise.resolve(value)
    .then(res => next(it, res))
    .catch(err => next(it, null, err));
};

const run = gen => next(gen());

run.wrap = gen => (...args) => next(gen(...args));

module.exports = run;

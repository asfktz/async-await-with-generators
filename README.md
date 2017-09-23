# async-wait-with-generators
Simple implementation of async/await using generators


### Usage:
```js
const getStars = (username, repo) => {
  return run(function*() {
    try {
      const res  = yield fetch(`https://api.github.com/repos/${username}/${repo}`);
      const data = yield res.json();
      return data.stargazers_count;
    } catch (err) {
      return `Couldn't get the stars number`;
    }
  });
};
```

```js
const getStars = run.wrap(function*(username, repo) {
  try {
    const res  = yield fetch(`https://api.github.com/repos/${username}/${repo}`);
    const data = yield res.json();
    return data.stargazers_count;
  } catch (err) {
    return `Couldn't get the stars number`;
  }
});
```

```js
getStars('facebook', 'react').then(console.log);
```


### Implementation:

```js
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
```

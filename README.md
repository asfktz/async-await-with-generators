# async-wait-with-generators
Simple implementation of async/await using generators


### Usage:
```js
async(function*() {
  try {
    const user = yield api.get('/api/users/1');
  } catch (err) {
    console.error('user not found!')
  }
}).then(() => {
  console.log('done!')
});
```


### Implementation:

```js
function next(it, res, err) {
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

module.exports = function async(gen) {
  return next(gen());
}
```

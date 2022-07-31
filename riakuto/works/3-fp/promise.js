const isSucceeded = true;

const promise = new Promise((resolve, reject) => {
  if (isSucceeded) {
    resolve('Success');
  } else {
    reject(new Error("Failure!"));
  }
});

promise.then((v) => {
  console.log("1", v);

  return 'Success again';
})
.then((v) => { console.log("2", v); })
.catch((e) => { console.error("3", e); })
.finally(() => { console.log("4", "Completed"); });

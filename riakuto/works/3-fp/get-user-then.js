import fetch from 'node-fetch'

const getUser = (userId) => fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  .then(
    (res) => {
      if (!res.ok) {
        throw new Error(`${res.status} Error`);
      } else {
        return res.json();
      }
    },
  );


console.log("--start--")

getUser(2)
  .then((user) => { console.log(user); })
  .catch((e) => { console.error(e); })
  .finally(() => { console.log("--Completed--") })

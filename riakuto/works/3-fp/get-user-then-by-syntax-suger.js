import fetch from 'node-fetch';

const getUser = async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );

  if (!response.ok) {
    throw new Error(`${response.status} error`);
  }

  return response.json();
}

console.log("-start-")

const main = async () => {
  try {
    const user = await getUser(2);
    console.log(user)
  } catch (error) {
    console.log(error);
  } finally {
    console.log("-completed-");
  }
};

main();

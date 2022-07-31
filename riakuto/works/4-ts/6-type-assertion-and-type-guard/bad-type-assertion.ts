{
  type User = { username: string; address: { zipcode: string, town: string } }
  const str = `{'username': 'patty', 'town': 'Maple'}`;
  const data: unknown = JSON.parse(str);
  const user = data as User;

  user.address.town // TypeError: Cannot read property 'town' of undefined
}

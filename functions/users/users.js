const users = [
  {
    name: "Andrea",
    surname: "felappi",
  },
  {
    name: "AiutoPcAmico",
    Surname: "Developer",
  },
];

async function getUsers(req, res) {
  return users;
}

export { getUsers };

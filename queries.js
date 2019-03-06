
// Joining the users table to itself to find all collisions via usernames
const usersSelfJoinQuery = `
SELECT u1.id, u1.username
FROM users u1
INNER JOIN users u2 ON u2.username = u1.username AND (u2.id <> u1.id)
ORDER BY u1.username, u1.id;
`

// Joining disallowed_usernames and users table to find any users with forbidden names
const invalidUsernameJoinQuery = `
SELECT users.id, users.username
FROM users
INNER JOIN disallowed_usernames du ON du.invalid_username = users.username;
`

module.exports = {
  usersSelfJoinQuery: usersSelfJoinQuery,
  invalidUsernameJoinQuery: invalidUsernameJoinQuery
}

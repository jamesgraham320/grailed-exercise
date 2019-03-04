const Sequelize = require('sequelize')
const sqlz = new Sequelize('sqlite:./grailed-exercise.sqlite3')

const DisallowedUsername = sqlz.define('disallowed_username', {
  invalid_username: Sequelize.STRING
} , { 
  createdAt: 'created_at', 
  updatedAt: 'updated_at',
})

const User = sqlz.define('user', { 
  username: Sequelize.STRING 
}, { 
  timestamps: false
})

DisallowedUsername.findAll().then((usernames) => {
  const badNames = {}
  usernames.forEach( username => {
    badNames[username.invalid_username] = [
      username.id, 
      username.invalid_username
    ]
  })
})

let usersSelfJoinQuery = `
SELECT u1.id, u1.username
FROM users u1
INNER JOIN users u2 ON u2.username = u1.username AND (u2.id <> u1.id)
ORDER BY u1.username, u1.id;
`

let invalidUsernameJoinQuery = `
SELECT users.id, users.username
FROM users
INNER JOIN disallowed_usernames du ON du.invalid_username = users.username;
`
  

  /*
User.findAll().then((users) => {
  allNames = {}
  collisions = {}
  
  users.forEach(user => {
    if (!allNames[user.username]) {
      allNames[user.username] = []
    }
  })
})
*/

/*
 * connecting to database with sqlite3 package
 *const sqlite3 = require('sqlite3').verbose()
 *let db =  new sqlite3.Database('./grailed-exercise.sqlite3', 
 *  err => {
 *    if (err) {
 *      return console.error(err.message)
 *    }
 *    console.log("Connected to database")
 *})
 *
 * Creating disallowed usernames object for fast and easy reference
 *db.serialize( () => {
 *
 *  db.all(`
 *    SELECT * FROM disallowed_usernames;
 *  `, (err, rows) => {
 *    const badNames = {}
 *    rows.forEach ( row => {
 *      badNames[row.invalid_username] = row
 *    })
 *  })
 *})
 *
 *db.close()
 */

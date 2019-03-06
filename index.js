const Sequelize = require('sequelize')
const sqlz = new Sequelize('sqlite:./grailed-exercise.sqlite3')
const queries = require('./queries.js')

// Defining models for Sequelize
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

function findUsernameCollisions(option) {

  sqlz.query(queries.usersSelfJoinQuery).then(queryResult => {
    let users = queryResult[0]

    let previous = users[0]
    let count = 0
    const fixedUsers = users.map( (user, index) => {
      if (index === 0) {return user}

      // check if last user has the same username, if so, adjust the username
      if (previous && user.username === previous) {
        previous = user.username
        count++
        user.username += count
        user.updated = true
        return user

      } else {
        count = 0
        previous = user.username
        user.updated = false
        return user
      }
    })
    let filteredData = fixedUsers.filter( row => row.updated)
    return filteredData
  }).then(users => {
    if (option) {
      printAffectedRows(users)
    } else {
      commitChanges(users)
    }
      
  })

}

findUsernameCollisions(true)

function commitChanges(data) {
  sqlz.transaction( t => {
    let promises = []
    data.forEach( row => {
      let current = User.build({id: row.id, username: row.username})
      current.isNewRecord = false
      promises.push(current.save({transaction: t}))
    })
    return Promise.all(promises)
  }).then( result => {
    console.log("Bulk update completed succesfully")
  }).catch( err => {
    console.log("Bulk update failed")
    console.log(err)
  })
}

function printAffectedRows(data) {
  if(data.length > 1) {
    console.log("These following Users need to be updated:")
    console.log('| ID  |  Username  |')
    data.forEach( (row, index) => {
      console.log(`| ${row.id}  | ${row.username}`)
    })
  } else {
    console.log("There are no rows that need updating!")
  }
}



  /*
initial attempts with sequelize
User.findAll().then((users) => {
  allNames = {}
  collisions = {}
  
  users.forEach(user => {
    if (!allNames[user.username]) {
      allNames[user.username] = []
    }
  })
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
*/

/* messing around with node sqlite3
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

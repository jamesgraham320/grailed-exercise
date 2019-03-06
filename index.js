const Sequelize = require('sequelize')
const sqlz = new Sequelize('sqlite:./grailed-exercise.sqlite3')
const queries = require('./queries.js')

// Defining models for Sequelize use
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


function resolveCollisions(query, options) {

  sqlz.query(query).then(queryResult => {
    let users = queryResult[0]

    let previous = users[0]
    let count = 0
    const fixedUsers = users.map( (user, index) => {
      if (index === 0) {return user}

      // Iterate through all users and update their usernames to get rid of collisions
      if (previous && user.username === previous) {
        previous = user.username
        count++
        user.username += count
        user.updated = true
        return user

      } else {
        count = 0
        previous = user.username
        if (options.checkDisallowed) {
          previous = user.username
          count++
          user.username += count
          user.updated = true
        } else {
          user.updated = false
        }
        return user
      }
    })

    // Filter out only updated rows
    let filteredData = fixedUsers.filter( row => row.updated)
    return filteredData
  }).then(users => {
    if (options.dryRun) {
      printAffectedRows(users)
    } else {
      commitChanges(users)
    }
      
  })

}

// Methods below are final run methods, 
// Query parameter - input which SQL query you wish to check for collisions
// Options include:
//    dryRun - true to print affected rows, false to find, update and change all affected rows
//    checkDisallowed - toggle between checking for disallowed usernames (true)  and  checking for non-unique username collisions (false)

 //resolveCollisions(queries.usersSelfJoinQuery, {dryRun: true, checkDisallowed: false})
 //resolveCollisions(queries.invalidUsernameJoinQuery, {dryRun: true, checkDisallowed: true})

// Iterate through array of users and update each affected username in one transaction
function commitChanges(users) {
  sqlz.transaction( t => {
    let promises = []
    users.forEach( user => {
      let current = User.build({id: user.id, username: user.username})
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

// If dry run option is selected, print all affected rows to be changed rather than update
function printAffectedRows(users) {
  if(users.length > 1) {
    console.log("These following Users need to be updated:")
    console.log('| ID  |  Username  |')
    users.forEach( (user, index) => {
      console.log(`| ${user.id}  | ${user.username}`)
    })
  } else {
    console.log("There are no rows that need updating!")
  }
}



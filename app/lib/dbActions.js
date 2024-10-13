'use server'

import { sqlDatabase, sqlPassword, sqlServer, sqlUser } from './const';

// prepare
var mysql = require('mysql2');

var con = mysql.createConnection({
  host: sqlServer,
  user: sqlUser,
  password: sqlPassword,
  database: sqlDatabase
});



// user actions

export async function newUser(id, username, email, avatarURL) {
  return new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) {
        console.error("Error connecting to the database:", err);
        return reject(new Error("Error connecting to the database"));
      }
      var sql = `INSERT INTO user (id, username, email, avatarURL) VALUES ('${id}', '${username}', '${email}', '${avatarURL}')`;
      con.query(sql, function (err, result) {
        if (err) {
          console.error("Error inserting new user:", err);
          return reject(new Error("Error inserting new user"));
        }
        console.log("New user created: " + username);
        resolve("New user created successfully");
      });
    });
  });
}

export async function updateUsername(id, newUsername) {

}

export async function updateAvatarURL(id, newAvatarURL) {

}

export async function deleteUser(id) {

}

export async function getUser(id) {

}

export async function checkUsername(username) {
  return new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) {
        console.error("Error connecting to the database:", err);
        return reject(new Error("Error connecting to the database"));
      }
      var sql = `SELECT * FROM user WHERE username = '${username}'`;
      con.query(sql, function (err, result) {
        if (err) {
          console.error("Error searching username: ", err);
          return reject(new Error("Error searching username"));
        }
        if (result.length > 0) {
          resolve(true); // Username is taken
        } else {
          resolve(false); // Username is not taken
        }
      });
    });
  });
}


// blog actions

export async function newBlog(userId, title, username, created, content, tags, topic, isPublic, disableComments) {

}

export async function updateBlog(id, userId, title, username, created, modified, content, tags, topic, isPublic, disableComments) {

}

export async function deleteBlog(id) {

}

export async function getBlogList() {

}

export async function getAuthenticatedBlogList(userId) {

}

export async function getBlog(id) {

}


// comment actions

export async function newComment(blogId, userId, text, created) {

}

export async function getComments(blogId) {

}




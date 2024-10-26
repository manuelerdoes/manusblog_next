'use server'

import { sqlDatabase, sqlPassword, sqlServer, sqlUser } from './const';

// prepare
var mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: sqlServer,
  user: sqlUser,
  password: sqlPassword,
  database: sqlDatabase,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
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

  return new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) {
        console.error("Error connecting to the database:", err);
        return reject(new Error("Error connecting to the database"));
      }
      var sql = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`;
      con.query(sql, function (err, result) {
        if (err) {
          console.error("Error updating username: ", err);
          return reject(new Error("Error updating username"));
        }
        console.log("Username of " + id + " updated to: " + newUsername);
        resolve(newUsername);
      });
    });
  });
}

export async function updateAvatarURL(id, newAvatarURL) {

}


export async function deleteUser(id) {
  return new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) {
        console.error("Error connecting to the database:", err);
        return reject(new Error("Error connecting to the database"));
      }
      var sql = `DELETE FROM user WHERE id = '${id}'`;
      con.query(sql, function (err, result) {
        if (err) {
          console.error("Error deleting user: ", err);
          return reject(new Error("Error deleting user"));
        }
        console.log("User deleted with id: " + id);
        resolve("User deleted successfully");
      });
    });
  });
}


export async function getUser(id) {
  return new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) {
        console.error("Error connecting to the database:", err);
        return reject(new Error("Error connecting to the database"));
      }
      var sql = `SELECT * FROM user WHERE id = '${id}'`;
      con.query(sql, function (err, result) {
        if (err) {
          console.error("Error searching user: ", err);
          return reject(new Error("Error searching user"));
        }
        if (result.length > 0) {
          resolve(result[0]);
        } else {
          resolve(null);
        }
      });
    });
  });
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

export async function getUserAndHash(email) {
  return new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) {
        console.error("Error connecting to the database:", err);
        return reject(new Error("Error connecting to the database"));
      }
      var sql = `SELECT password, salt FROM user WHERE email = '${email}'`;
      con.query(sql, function (err, result) {
        if (err) {
          console.error("Error searching user: ", err);
          return reject(new Error("Error searching user"));
        }
        if (result.length > 0) {
          resolve(result[0]);
        } else {
          resolve(null);
        }
      });
    });
  }
  );
}


// blog actions

export async function newBlog(userId, title, created, content, tags, topic, isPublic, disableComments) {
  let isPublicInt = null;
  let disableCommentsInt = null;
  if (isPublic === "true") {
    isPublicInt = 1;
  } else {
    isPublicInt = 0;
  }
  if (disableComments === "true") {
    disableCommentsInt = 1;
  } else {
    disableCommentsInt = 0;
  }

  try {
    const [rows] = await pool.query(`INSERT INTO blog (userId, title, created, modified, content, tags, topic, isPublic, disableComments) 
        VALUES ('${userId}', '${title}', '${created}', '${created}', '${content}', '${tags}', '${topic}', '${isPublicInt}', '${disableCommentsInt}')`);
    return rows.insertId;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}

export async function updateBlog(id, userId, title, username, created, modified, content, tags, topic, isPublic, disableComments) {

}

export async function deleteBlog(id) {

}

export async function getBlogList() {
  try {
    const [rows] = await pool.query(`SELECT * FROM blogs_with_usernames`);
    return rows;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}

export async function getAuthenticatedBlogList(userId) {

}


export async function getBlog(id) { 
  try {
    const [rows] = await pool.query(`SELECT * FROM blog WHERE id = '${id}'`);
    return rows[0];
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}


export async function getLatestBlogId() { 
  try {
    const [rows] = await pool.query(`SELECT id FROM blog ORDER BY created LIMIT 1`);
    return rows[0].id;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}


// comment actions

export async function newComment(blogId, userId, text, created) {
  try {
    const [rows] = await pool.query(`INSERT INTO Comment (blogId, userId, text, created) VALUES ('${blogId}', '${userId}', '${text}', '${created}')`);
    return rows.insertId;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}

export async function getComments(blogId) {
  try {
    const [rows] = await pool.query(`SELECT * FROM comments_with_usernames WHERE blogId = '${blogId}';`);
    return rows;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}




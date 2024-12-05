#!/bin/bash

# Bash script to prepare the mysql db for Manusblog.
#
# 1.0.0     M. Erdös    13.10.2024      Initial Version
#

version="1.0.0"


usage() {
    echo "Usage: $0 [db_name username user_password elevated_user elevated_password]"
    echo "If no arguments are provided, you will be prompted for the information."
    exit 1
}
echo "###############################################################################"
echo "##  This script will create a new database, user, and tables for Manusblog.   #"
echo "##  Version: $version                                                            #"
echo "###############################################################################"

# Check if arguments are passed
if [ "$#" -ge 3 ]; then
    db_name=$1
    username=$2
    user_password=$3
    elevated_user=${4:-root}
    elevated_password=${5:-""}
else
    # Interactive input
    read -p "Enter the database name: " db_name
    read -p "Enter the username: " username
    read -sp "Enter the user password: " user_password
    echo
    read -p "Enter the elevated user (default is 'root'): " elevated_user
    elevated_user=${elevated_user:-root}
    if [ "$elevated_user" == "root" ]; then
        read -sp "Enter the elevated user password: " elevated_password
        echo
    else
        elevated_password=""
    fi
fi

# Create the SQL script to run
sql_script=$(cat <<EOF
-- Create database if it does not exist
CREATE DATABASE IF NOT EXISTS \`$db_name\`;

-- Create user if it does not exist
CREATE USER IF NOT EXISTS '$username'@'localhost' IDENTIFIED BY '$user_password';

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON \`$db_name\`.* TO '$username'@'localhost';

-- Use the newly created database
USE \`$db_name\`;

-- Create tables if they do not exist

CREATE TABLE IF NOT EXISTS Blog (
    id INT AUTO_INCREMENT NOT NULL,
    userId VARCHAR(191),
    title VARCHAR(255) NOT NULL,
    created TEXT NOT NULL,
    modified TEXT NOT NULL,
    content TEXT NOT NULL,
    tags VARCHAR(255),
    topic VARCHAR(255) NOT NULL,
    isPublic BOOLEAN NOT NULL,
    disableComments BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Comment (
    id INT AUTO_INCREMENT NOT NULL,
    blogId INT NOT NULL,
    userName VARCHAR(191),
    text TEXT NOT NULL,
    created TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (blogId) REFERENCES Blog(id) ON DELETE CASCADE
);  
EOF
)

# Execute the SQL commands
if [ -z "$elevated_password" ]; then
    mysql -u "$elevated_user" -e "$sql_script"
else
    mysql -u "$elevated_user" -p"$elevated_password" -e "$sql_script"
fi

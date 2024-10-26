#!/bin/bash

# Database credentials
db_name="manusblog"
username="manusblog"
password="abcd1234"

# Connect to MySQL and execute the following commands
mysql -u $username -p$password $db_name <<EOF

-- Insert test user
INSERT INTO User (email, username, password, avatarURL) VALUES ('test@test.test', 'test', '', '');

-- Insert admin user
INSERT INTO User (email, username, password, avatarURL) VALUES ('', 'admin', '', '');

-- Get the ID of the test user
SET @test_user_id = (SELECT id FROM User WHERE username='test');

-- Insert blog entry connected to the test user
INSERT INTO Blog (userId, title, created, modified, content, tags, topic, isPublic, disableComments) 
VALUES (@test_user_id, 'test', NOW(), NOW(), 'lorem ipsum dolor sit amet', 'test', 'other', TRUE, FALSE);

EOF
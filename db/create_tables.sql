
CREATE TABLE users (
id BIGINT unsigned auto_increment primary key,
userName VARCHAR (25) NOT NULL,
firstName VARCHAR (25) NOT NULL,
lastName VARCHAR (25) NOT NULL,
email VARCHAR(100) NOT NULL,
passcode VARCHAR(41) NOT NULL COLLATE utf8_bin,
image VARCHAR(32) null, 
createTs TIMESTAMP NOT NULL default current_timestamp,
updateTs TIMESTAMP NOT NULL default current_timestamp
);
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

CREATE TABLE products (
   id bigint unsigned primary key,
   prodName varchar(255) not null,
   description varchar(255),
   startingPrice decimal(20, 5) not null,
   location varchar(255),
   endTimestamp timestamp not null,
   sellerId bigint unsigned not null,
   createTs TIMESTAMP NOT NULL default current_timestamp,
   updateTs TIMESTAMP NOT NULL default current_timestamp,
   foreign key prod_user_id_fk (sellerId) references users(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE bids (
   id BIGINT UNSIGNED AUTO_INCREMENT primary key,
   amount decimal(20, 2) NOT NULL,
   userId BIGINT UNSIGNED NOT NULL,
   prodId BIGINT UNSIGNED NOT NULL,
   createTs TIMESTAMP not null default current_timestamp,
   foreign key bid_user_id_fk (userId) references users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
   foreign key bid_prod_id_fk (prodId) references products(id) ON UPDATE CASCADE ON DELETE RESTRICT
);
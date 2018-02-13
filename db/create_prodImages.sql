CREATE TABLE prodImages ( 
id BIGINT unsigned auto_increment primary key,
productId BIGINT unsigned NOT NULL,
img VARCHAR (32) NOT NULL,
createTs TIMESTAMP NOT NULL default current_timestamp,
FOREIGN KEY pimg_prod_id_fk(productId) REFERENCES products (id)ON DELETE RESTRICT ON UPDATE CASCADE
) 

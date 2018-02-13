CREATE TABLE questions (
    id BIGINT unsigned auto_increment primary key,
    userId BIGINT UNSIGNED NOT NULL,
    productId BIGINT UNSIGNED NOT NULL,
    note TEXT NOT NULL,
    createTs TIMESTAMP NOT NULL default current_timestamp,
    foreign key quest_user_id_fk (userId) references users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    foreign key quest_prod_id_fk (productId) references products(id) ON UPDATE CASCADE ON DELETE RESTRICT
);


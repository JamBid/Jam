CREATE TABLE answers (
    id BIGINT unsigned auto_increment primary key,
    questionId BIGINT UNSIGNED NOT NULL,
    userId BIGINT UNSIGNED NOT NULL,
    note TEXT NOT NULL,
    createTs TIMESTAMP NOT NULL default current_timestamp,
    foreign key ans_ques_id_fk (questionId) references questions(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    foreign key ans_user_id_fk (userId) references users(id) ON UPDATE CASCADE ON DELETE RESTRICT
);
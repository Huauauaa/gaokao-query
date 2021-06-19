DROP TABLE IF EXISTS `user`;

CREATE TABLE user (
  id int auto_increment primary key,
  firstName varchar(255) not null,
  lastName varchar(255) not null,
  age int not null
);
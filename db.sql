DROP TABLE IF EXISTS `user`;

CREATE TABLE user (
  id int auto_increment,
  firstName varchar(255) not null,
  lastName varchar(255) not null,
  age int not null,
  primary key (id)
);

-- application table
DROP TABLE IF EXISTS `application`;

create table application (
  id int auto_increment primary key,
  name varchar(255) not null,
  creator varchar(255) default '' not null,
  description varchar(255) default '' not null,
  status int default 0 not null
);

create unique index application_id_uindex on application (id);
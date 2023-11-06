\c myquiz_database;

CREATE USER myquiz_user WITH PASSWORD 'password';

GRANT ALL PRIVILEGES ON DATABASE myquiz_database TO myquiz_user;

\c myquiz_database myquiz_user;

CREATE TABLE users (
    id serial primary key,
    nameid varchar(50) NOT NULL UNIQUE,
    namestr varchar(50) NOT NULL,
    hashpass varchar(255), 
    account_type int NOT NULL
);

insert into users(nameid, namestr, hashpass, account_type) values('Guest', 'Guest', '', 1);

CREATE TABLE quiztype (
    id serial primary key,
    type_name VARCHAR(128) NOT NULL UNIQUE
);

insert into quiztype(type_name) values ('一問一答');
insert into quiztype(type_name) values ('四択問題');
insert into quiztype(type_name) values ('画像付き一問一答');
insert into quiztype(type_name) values ('画像付き四択問題');

create table quizgenre (
    id serial primary key,
    genre_name VARCHAR(128) NOT NULL UNIQUE
);

insert into quizgenre(genre_name) values ('自然科学');
insert into quizgenre(genre_name) values ('文学・語学・哲学');
insert into quizgenre(genre_name) values ('歴史・地理・社会');
insert into quizgenre(genre_name) values ('音楽');
insert into quizgenre(genre_name) values ('スポーツ');
insert into quizgenre(genre_name) values ('芸能');
insert into quizgenre(genre_name) values ('サブカルチャー');
insert into quizgenre(genre_name) values ('ライフスタイル');
insert into quizgenre(genre_name) values ('ノンジャンル');

create table simplequiz (
    id serial primary key,
    author_id serial REFERENCES users(id),
    problem TEXT NOT NULL,
    answer varchar(255) NOT NULL,
    commentary TEXT,
    created TIMESTAMP,
    type_id INT REFERENCES quiztype(id),
    genre_id INT REFERENCES quizgenre(id)
);
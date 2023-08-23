\c myquiz_database;

CREATE USER myquiz_user WITH PASSWORD 'password';

GRANT ALL PRIVILEGES ON DATABASE myquiz_database TO myquiz_user;

\c myquiz_database myquiz_user;

CREATE TABLE "user" (
    id integer,
    name varchar(30)
);
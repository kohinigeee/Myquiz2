package dbsimplequiz

import (
	"app-plate/data"
	"fmt"
	"time"

	"github.com/jmoiron/sqlx"
)

var db *sqlx.DB

type SimpleQuiz struct {
	Id         int       `db:"id" json:"id"`
	Author_id  int       `db:"author_id" json:"authorId"`
	Problem    string    `db:"problem" json:"problem"`
	Answer     string    `db:"answer" json:"answer"`
	Commentary string    `db:"commentary" json:"commentary"`
	Created    time.Time `db:"created" json:"created"`
	TypeId     int       `db:"type_id" json:"typeId"`
	GenreId    int       `db:"genre_id" json:"genreId"`
	TypeStr    string    `db:"type_name" json:"typeName"`
	GenreStr   string    `db:"genre_name" json:"genreName"`
}

func (quiz *SimpleQuiz) Create() (err error) {
	err = nil

	var newId int
	insertQuery := "INSERT INTO simplequiz (author_id, problem, answer, commentary, created, type_id, genre_id) VALUES (:author_id, :problem, :answer, :commentary, :created, :type_id, :genre_id) RETURNING id"

	namesStmt, err := db.PrepareNamed(insertQuery)
	if err != nil {
		fmt.Println("[SimpleQuiz Create()] クエリのPrepareに失敗しました")
		return
	}

	err = namesStmt.Get(&newId, quiz)
	if err != nil {
		fmt.Println("[SimpleQuiz Create()] クエリの実行に失敗しました")
		return
	}

	quiz.Id = newId

	err = nil
	return
}

func (quiz *SimpleQuiz) Delete() (err error) {
	err = nil

	deleteQuery := "DELETE FROM simplequiz WHERE author_id = :author_id"

	_, err = db.NamedExec(deleteQuery, quiz)

	if err != nil {
		return
	}

	err = nil
	return
}

func GetById(quizid int) (quiz SimpleQuiz, err error) {
	quiz = SimpleQuiz{}
	err = nil

	selectQuery := "SELECT sq.id, sq.author_id, sq.problem, sq.answer, sq.commentary, sq.created, sq.type_id, sq.genre_id, qt.type_name, qg.genre_name FROM simplequiz sq JOIN quiztype qt ON sq.type_id = qt.id JOIN quizgenre qg ON sq.genre_id = qg.id WHERE sq.id = $1"

	err = db.Get(&quiz, selectQuery, quizid)

	if err != nil {
		return
	}

	err = nil
	return
}

func getRowsQuery(colname string, value int, limit int, offset int) (result []SimpleQuiz, err error) {
	err = nil

	selectQuery := fmt.Sprintf(
		"SELECT sq.id, sq.author_id, sq.problem, sq.answer, sq.commentary, sq.created, sq.type_id, sq.genre_id, qt.type_name, qg.genre_name FROM simplequiz sq JOIN quiztype qt ON sq.type_id = qt.id JOIN quizgenre qg ON sq.genre_id = qg.id WHERE %s = $1 LIMIT %d OFFSET %d", colname, limit, offset)

	err = db.Select(&result, selectQuery, value)

	if err != nil {
		return
	}

	err = nil
	return
}

func GetRowsByAuthorId(authorId int, limit int, offset int) (result []SimpleQuiz, err error) {
	err = nil
	result, err = getRowsQuery("sq.author_id", authorId, limit, offset)

	if err != nil {
		return
	}
	err = nil
	return
}

func GetRowsByGenreId(genreId int, limit int, offset int) (result []SimpleQuiz, err error) {
	err = nil
	result, err = getRowsQuery("sq.genre_id", genreId, limit, offset)

	if err != nil {
		return
	}
	err = nil
	return
}

func GetCountQuery(colname string, value int) (result int, err error) {
	err = nil

	selectQuery := fmt.Sprintf(
		"SELECT COUNT(*) FROM simplequiz sq JOIN quiztype qt ON sq.type_id = qt.id JOIN quizgenre qg ON sq.genre_id = qg.id WHERE %s = $1", colname)

	err = db.QueryRow(selectQuery, value).Scan(&result)

	if err != nil {
		return 0, err
	}

	err = nil
	return
}

func GetCountByAuthorId(authorId int) (result int, err error) {
	err = nil
	result, err = GetCountQuery("sq.author_id", authorId)

	if err != nil {
		return
	}
	err = nil
	return
}

func init() {
	db = data.GetMydb()
}

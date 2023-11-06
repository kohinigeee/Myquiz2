package gotest

import (
	"app-plate/data"
	"app-plate/data/dbsimplequiz"
	"app-plate/data/dbuser"
	"fmt"
	"log"
	"time"
)

func TestSimpleQuiz() {
	user := dbuser.User{
		NameId:      "testuser",
		NameStr:     "testuser",
		Hashpass:    "111",
		AccountType: dbuser.NORMAL_ACCOUNT,
	}

	err := user.Create()

	user, err = dbuser.GetByNameId("testuser")

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("[Test] Userの取得に成功しました")
	fmt.Println("User: ", user)

	quiz := dbsimplequiz.SimpleQuiz{
		Author_id:  user.Id,
		Problem:    "日本で一番高い山は？",
		Answer:     "富士山",
		Commentary: "ちなみに二番目に高いのは北岳",
		Created:    time.Now(),
		TypeId:     data.QUIZ_TYPE_SIMPLE,
		GenreId:    data.QUIZ_GENRE_SCIENCE,
	}
	fmt.Println("Quiz: ", quiz)

	quiz.Id = 5

	err = quiz.Create()

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("[Test] Quizの作成に成功しました")

	quiz2, err := dbsimplequiz.GetById(quiz.Id)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("[Test] Quizの取得に成功しました")
	fmt.Println(quiz2)

	quizz, err := dbsimplequiz.GetRowsByAuthorId(user.Id, 10, 0)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("[Test] AuthorIdによるQuizの取得に成功しました")
	fmt.Println("[Quizz]:", quizz)

	quizz, err = dbsimplequiz.GetRowsByGenreId(data.QUIZ_GENRE_SCIENCE, 10, 0)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("[Test] GenreIdによるQuizの取得に成功しました")
	fmt.Println("[Quizz]:", quizz)

	err = quiz.Delete()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("[Test] Quizの削除に成功しました")
	fmt.Println("[Quiz]:", quiz)

}

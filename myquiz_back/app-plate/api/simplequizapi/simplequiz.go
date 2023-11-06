package simplequizapi

import (
	"app-plate/api"
	"app-plate/data"
	"app-plate/data/dbsimplequiz"
	"app-plate/lib"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type SimpleQuizAPIParams struct {
	UserNameId string
	Problem    string
	Answer     string
	Commentary string
	GenreId    int
}

func parseSimpleQuizParams(c *gin.Context) (params SimpleQuizAPIParams, isCorrectParams bool) {
	isCorrectParams = true
	params = SimpleQuizAPIParams{}

	makeMsg := func(paramName string) string {
		fmtStr := "`%s`パラメータに不正な値です"
		return fmt.Sprintf(fmtStr, paramName)
	}

	userNameId := api.QueryAndPostForm("usernameid", c)
	if userNameId == "" {
		result := api.MakeBadAPIResult(makeMsg("usernameid"), nil)
		c.JSON(http.StatusBadRequest, result)
		isCorrectParams = false
		return
	}

	problem := api.QueryAndPostForm("problem", c)
	if problem == "" {
		result := api.MakeBadAPIResult(makeMsg("problem"), nil)
		c.JSON(http.StatusBadRequest, result)
		isCorrectParams = false
		return
	}

	answer := api.QueryAndPostForm("answer", c)
	if answer == "" {
		result := api.MakeBadAPIResult(makeMsg("answer"), nil)
		c.JSON(http.StatusBadRequest, result)
		isCorrectParams = false
		return
	}

	commentary := api.QueryAndPostForm("commentary", c)

	genreIdStr := api.QueryAndPostForm("genreid", c)
	genreId, err := strconv.Atoi(genreIdStr)
	if err != nil {
		result := api.MakeBadAPIResult(makeMsg("genreid"), nil)
		c.JSON(http.StatusBadRequest, result)
		isCorrectParams = false
		return
	}

	params.UserNameId = userNameId
	params.Problem = problem
	params.Answer = answer
	params.Commentary = commentary
	params.GenreId = genreId

	isCorrectParams = true
	return
}

func SimpleQuizGet(c *gin.Context) {
	type Params struct {
		Id int `pname:"id"`
	}

	params := Params{}
	err := api.Myparser(c, &params)

	if err != nil {
		return
	}

	quiz, err := dbsimplequiz.GetById(params.Id)

	if err != nil {
		result := api.MakeBadAPIResult("クイズの取得に失敗しました", params)
		c.JSON(http.StatusBadRequest, result)
		return
	}

	result := api.MakeSuccessAPIResult("クイズの取得に成功しました", quiz)
	c.JSON(http.StatusOK, result)
	return
}

func SimpleQuizCreateHandler(c *gin.Context) {
	type Params struct {
		Id         int    `pname:"userId"`
		Problem    string `pname:"problem"`
		Answer     string `pname:"answer"`
		Commentary string `pname:"commentary" prequire:"no"`
		GenreId    int    `pname:"genreId"`
	}

	params := Params{}
	err := api.Myparser(c, &params)

	if err != nil {
		return
	}

	var isExist bool
	_, isExist = lib.ConGenreIdtoName(params.GenreId)
	if !isExist {
		result := api.MakeBadAPIResult("不正な`genre Id`です", nil)
		c.JSON(http.StatusBadRequest, result)
		return
	}

	globalsess := lib.GetGlobalSessions()
	sess := globalsess.SessionStart(c.Writer, c.Request)

	loginUser := lib.GetSessionUser(&sess)

	if loginUser.IsGuest() {
		result := api.MakeBadAPIResult("Guestアカウントには許可されていない操作です", nil)
		c.JSON(http.StatusBadRequest, result)
		return
	}

	if loginUser.Id != params.Id {
		result := api.MakeBadAPIResult("不正な操作です", nil)
		c.JSON(http.StatusBadRequest, result)
		return
	}

	quiz := dbsimplequiz.SimpleQuiz{
		Author_id:  loginUser.Id,
		Problem:    params.Problem,
		Answer:     params.Answer,
		Commentary: params.Commentary,
		Created:    time.Now(),
		TypeId:     data.QUIZ_TYPE_SIMPLE,
		GenreId:    params.GenreId,
	}

	err = quiz.Create()

	if err != nil {
		result := api.MakeBadAPIResult("クイズの作成に失敗しました", nil)
		c.JSON(http.StatusInternalServerError, result)
		return
	}

	result := api.MakeSuccessAPIResult("クイズの作成に成功しました", quiz)
	c.JSON(http.StatusOK, result)
	return
}

func simplequizDeleteHandle(c *gin.Context) {
	type Params struct {
		Id int `pname:"id"`
	}

	params := Params{}
	err := api.Myparser(c, &params)

	if err != nil {
		return
	}

	globalsees := lib.GetGlobalSessions()
	sess := globalsees.SessionStart(c.Writer, c.Request)

	loginUser := lib.GetSessionUser(&sess)

	if loginUser.IsGuest() {
		result := api.MakeBadAPIResult("Guestアカウントには許可されていない操作です", nil)
		c.JSON(http.StatusBadRequest, result)
		return
	}

	quiz, err := dbsimplequiz.GetById(params.Id)

	if err != nil {
		result := api.MakeBadAPIResult("クイズの取得に失敗しました", nil)
		c.JSON(http.StatusInternalServerError, result)
		return
	}

	if quiz.Author_id != loginUser.Id {
		result := api.MakeBadAPIResult("この操作は許可されていません", nil)
		c.JSON(http.StatusBadRequest, result)
		return
	}

	err = quiz.Delete()

	if err != nil {
		result := api.MakeBadAPIResult("クイズの削除に失敗しました", nil)
		c.JSON(http.StatusInternalServerError, result)
		return
	}

	result := api.MakeSuccessAPIResult("クイズの削除に成功しました", quiz)
	c.JSON(http.StatusOK, result)
	return
}

func SimpleQuizHandle(entryPoint string, engin *gin.Engine) {
	engin.GET(entryPoint, SimpleQuizGet)
	engin.POST(entryPoint, SimpleQuizCreateHandler)
	engin.DELETE(entryPoint, simplequizDeleteHandle)
	return
}

package quizsearchapi

import (
	"app-plate/api"
	"app-plate/data/dbsimplequiz"
	"app-plate/lib"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func quizSearchHandle(c *gin.Context) {
	type Params struct {
		Mode   string `pname:"mode" prequire:"no"`
		Offset int    `pname:"offset" prequire:"no"`
		Limit  int    `pname:"limit" prequire:"no"`
	}

	const maxLimit = 1000

	params := Params{}
	err := api.Myparser(c, &params)

	if err != nil {
		return
	}

	fmt.Println("Mode :=", params.Mode)

	if params.Limit > maxLimit {
		params.Limit = maxLimit
	}

	gbsess := lib.GetGlobalSessions()
	sess := gbsess.SessionStart(c.Writer, c.Request)
	user := lib.GetSessionUser(&sess)

	if user.IsGuest() {
		result := api.MakeBadAPIResult("Guestアカウントのためデータが存在しません", nil)
		c.JSON(http.StatusBadRequest, result)
		return
	}

	if params.Mode == "count" {
		count, err := dbsimplequiz.GetCountByAuthorId(user.Id)
		if err != nil {
			result := api.MakeBadAPIResult("クイズ数の取得に失敗しました", nil)
			c.JSON(http.StatusInternalServerError, result)
			return
		}

		type ReusultCountData struct {
			Count int `json:"count"`
		}

		resultData := ReusultCountData{Count: count}
		result := api.MakeSuccessAPIResult("クイズ数の取得に成功しました", resultData)
		c.JSON(http.StatusOK, result)
		return
	}

	quizz, err := dbsimplequiz.GetRowsByAuthorId(user.Id, params.Limit, params.Offset)

	if err != nil {
		result := api.MakeBadAPIResult("クイズの取得に失敗しました", nil)
		c.JSON(http.StatusInternalServerError, result)
		return
	}

	type ResultData struct {
		Number int                       `json:"size"`
		Data   []dbsimplequiz.SimpleQuiz `json:"data"`
	}

	resultData := ResultData{}
	resultData.Number = len(quizz)
	resultData.Data = quizz

	result := api.MakeSuccessAPIResult("クイズの取得に成功しました", resultData)
	c.JSON(http.StatusOK, result)

	return
}

func QuizSearchHandle(entryPoint string, engine *gin.Engine) {
	engine.GET(entryPoint, quizSearchHandle)
}

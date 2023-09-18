package loginapi

import (
	"app-plate/api"
	"app-plate/data/dbuser"
	"app-plate/lib"
	"net/http"

	"github.com/gin-gonic/gin"
)

type LoginAPIParmas struct {
	UserNameId string
	Password   string
}

func parseLoginParams(c *gin.Context) (params LoginAPIParmas, isCorrectParams bool) {
	params = LoginAPIParmas{}
	isCorrectParams = true

	username := api.QueryAndPostForm("username", c)
	password := api.QueryAndPostForm("password", c)

	if username == "" {
		result := api.MakeBadAPIResult("`username`パラメータに不正な値です", nil)
		c.JSON(http.StatusBadRequest, result)
		isCorrectParams = false
		return
	}

	if password == "" {
		result := api.MakeBadAPIResult("`password`パラメータに不正な値です", nil)
		c.JSON(http.StatusBadRequest, result)
		isCorrectParams = false
		return
	}

	params.UserNameId = username
	params.Password = password
	return
}

func loginGetHandle(c *gin.Context) {
	gbsession := lib.GetGlobalSessions()
	sess := gbsession.SessionStart(c.Writer, c.Request)

	user_p := lib.GetSessionUser(&sess)
	var user dbuser.User
	var result api.APIResult

	if user_p == nil {
		user = dbuser.GetGuestUser()
		message := "現在はログインしていないため、ゲストアカウントの情報を取得しました"
		result = api.MakeSuccessAPIResult(message, user)
	} else {
		user = *user_p
		message := "ログインアカウントの取得に成功しました"
		result = api.MakeSuccessAPIResult(message, user)
	}

	c.JSON(http.StatusOK, result)
	return
}

func loginCreateAccountHandle(c *gin.Context) {
	params, isCorrectParmas := parseLoginParams(c)

	if !isCorrectParmas {
		return
	}

	hash, err := lib.PasswordEncrypt(params.Password)

	if err != nil {
		result := api.MakeBadAPIResult("PasswordのHash化に失敗しました", nil)
		c.JSON(http.StatusInternalServerError, result)
		return
	}

	userData := dbuser.User{
		NameId:      params.UserNameId,
		NameStr:     params.UserNameId,
		Hashpass:    hash,
		AccountType: dbuser.NORMAL_ACCOUNT,
	}

	err = userData.Create()

	if err != nil {
		result := api.MakeBadAPIResult("Userの作成に失敗しました", nil)
		c.JSON(http.StatusInternalServerError, result)
		return
	}

	result := api.MakeSuccessAPIResult("Userの作成に成功しました", userData)
	c.JSON(http.StatusOK, result)
	return
}

func loginLoginHandle(c *gin.Context) {
	params, isCorrectParams := parseLoginParams(c)

	if !isCorrectParams {
		return
	}

	userData, err := dbuser.GetByNameId(params.UserNameId)
	if err != nil {
		result := api.MakeBadAPIResult("ログインに失敗しました", nil)
		c.JSON(http.StatusBadRequest, result)
		return
	}

	if !lib.IsCorrectPasswordByHash(params.Password, userData.Hashpass) {
		result := api.MakeBadAPIResult("ログインに失敗しました", nil)
		c.JSON(http.StatusBadRequest, result)
		return
	}

	gbsession := lib.GetGlobalSessions()
	sess := gbsession.SessionStart(c.Writer, c.Request)

	lib.SetSessionUser(&sess, &userData)

	result := api.MakeSuccessAPIResult("ログイン処理に成功しました", userData)
	c.JSON(http.StatusOK, result)
	return
}

func LoginHandler(entryPoint string, engin *gin.Engine) {
	engin.GET(entryPoint, loginGetHandle)
	engin.PUT(entryPoint, loginLoginHandle)
	engin.POST(entryPoint, loginCreateAccountHandle)
}

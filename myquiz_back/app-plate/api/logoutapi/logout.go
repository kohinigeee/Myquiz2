package logoutapi

import (
	"app-plate/api"
	"app-plate/lib"
	"net/http"

	"github.com/gin-gonic/gin"
)

func logoutHandle(c *gin.Context) {
	gbsession := lib.GetGlobalSessions()
	gbsession.SessionDestroy(c.Writer, c.Request)

	result := api.MakeSuccessAPIResult("ログアウトに成功しました", nil)

	c.JSON(http.StatusOK, result)
	return
}

func LogOutHandler(entoryPoint string, engin *gin.Engine) {
	engin.DELETE(entoryPoint, logoutHandle)
}

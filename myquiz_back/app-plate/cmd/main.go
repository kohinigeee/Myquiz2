package main

import (
	"app-plate/api/loginapi"
	"app-plate/data"
	_ "app-plate/data"
	_ "app-plate/lib"

	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func setHandler(engin *gin.Engine) {
	loginapi.LoginHandler("/api/login", engin)
}

func makeCorsConfig() cors.Config {
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:9000"}
	config.AllowMethods = []string{http.MethodGet, http.MethodDelete, http.MethodPost, http.MethodPut, http.MethodOptions}
	config.AllowCredentials = true
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"} // 必要なヘッダーを指定
	return config
}

func main() {

	db := data.GetMydb()
	defer db.Close()

	engin := gin.Default()
	config := makeCorsConfig()

	engin.Use(cors.New(config))

	setHandler(engin)
	engin.Run(":5000")
}

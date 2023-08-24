package api

import "github.com/gin-gonic/gin"

func QueryAndPostForm(key string, c *gin.Context) string {
	param := c.Query(key)
	if param != "" {
		return param
	}
	return c.PostForm(key)
}

func QueryAndPostFormArray(key string, c *gin.Context) []string {
	queryArray := c.QueryArray(key)
	postFormArray := c.PostFormArray(key)

	ans := append(queryArray, postFormArray...)
	return ans
}

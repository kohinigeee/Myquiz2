package lib

import (
	"app-plate/data/dbuser"
	"fmt"

	"github.com/astaxie/session"
	_ "github.com/astaxie/session/providers/memory"
)

var globalSessions *session.Manager

func init() {
	const sessionLimitTime = 1200
	var err error

	globalSessions, err = session.NewManager("memory", "gosessionid", sessionLimitTime)

	if err != nil {
		panic(err)
	}

	go globalSessions.GC()
	fmt.Println("Ready for session manager")
}

func GetGlobalSessions() *session.Manager {
	return globalSessions
}

// セッションに登録されているユーザーの取得関数
func GetSessionUser(sess *session.Session) *dbuser.User {
	user_i := (*sess).Get("user")

	if user_i == nil {
		guestUser := dbuser.GetGuestUser()
		return &guestUser
	}

	user := user_i.(dbuser.User)
	return &user
}

func SetSessionUser(sess *session.Session, user *dbuser.User) {
	(*sess).Set("user", *user)
}

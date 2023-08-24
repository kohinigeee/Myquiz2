package dbuser

import (
	"app-plate/data"
	"errors"
	"log"

	"github.com/jmoiron/sqlx"
)

var db *sqlx.DB
var guestUser User

// アカウントのタイプの定義
// 変更厳禁(データベースとの整合性が壊れる)
const (
	NORMAL_ACCOUNT = 0
	GUEST_ACCOUNT  = 1
	ADMIN_ACCOUNT  = 2
)

var accountMap = make(map[int]bool)

type User struct {
	Id          int    `db:"id" json:"id"`
	NameId      string `db:"nameid" json:"nameid"`
	NameStr     string `db:"namestr" json:"namestr"`
	Hashpass    string `db:"hashpass" json:"-"`
	AccountType int    `db:"account_type" json:"accountType"`
}

func (user *User) IsGuest() bool {
	return user.AccountType == GUEST_ACCOUNT
}

func (user *User) Create() (err error) {

	_, existsAccounType := accountMap[user.AccountType]
	if !existsAccounType {
		return errors.New("[User:Create] AccountType is invalid value")
	}

	if user.Id != 0 {
		return errors.New("[User:Createa] user.Id is not default No")
	}

	var newID int
	insertQuery := "INSERT INTO users (nameid, namestr, hashpass, account_type) VALUES (:nameid, :namestr, :hashpass, :account_type) RETURNING id"

	namesStmt, err := db.PrepareNamed(insertQuery)
	if err != nil {
		return
	}

	err = namesStmt.Get(&newID, user)

	if err != nil {
		return
	}

	user.Id = newID

	err = nil
	return
}

func GetById(id int) (user User, err error) {
	user = User{}
	err = nil

	selectQuery := "SELECT * FROM users WHERE id = $1"

	err = db.Get(&user, selectQuery, id)

	if err != nil {
		return
	}

	err = nil
	return
}

func GetByNameId(nameid string) (user User, err error) {
	user = User{}
	err = nil

	selectQuery := "SELECT * FROM users WHERE nameid = $1"

	err = db.Get(&user, selectQuery, nameid)

	if err != nil {
		return
	}

	err = nil
	return
}

func GetGuestUser() User {
	return guestUser
}

func init() {
	var err error

	db = data.GetMydb()

	accountMap[GUEST_ACCOUNT] = true
	accountMap[NORMAL_ACCOUNT] = true
	accountMap[ADMIN_ACCOUNT] = true

	guestUser, err = GetByNameId("Guest")

	if err != nil {
		log.Fatal(err)
	}
}

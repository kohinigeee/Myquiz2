package data

//データベース接続関係の関数ファイル
import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func open(path string, count uint) *sqlx.DB {

	if count == 0 {
		return nil
	}

	db, err := sqlx.Open("postgres", path)
	if err != nil {
		log.Fatal("open error:", err)
	}

	if err = db.Ping(); err != nil {
		time.Sleep(time.Second * 2)
		count--
		fmt.Printf("retry... count:%v\n", count)
		return open(path, count)
	}

	fmt.Println("db connected!")
	return db
}

// Mysqlの起動が遅いため、再帰的に接続処理を行う
func connectDB() *sqlx.DB {

	var path string = fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable host=db port=5432", os.Getenv("POSTGRES_MYQUIZ_USER"), os.Getenv("POSTGRES_MYQUIZ_PASSWORD"), os.Getenv("POSTGRES_DB"))

	return open(path, 100)
}

var mydb *sqlx.DB

func init() {
	fmt.Println("Connecting Database ...")
	mydb = connectDB()
	if mydb == nil {
		panic("Can't connect Database")
	} else {
		fmt.Println("Finished DB Initilized!")
	}
}

// グローバルなデータベースの取得関数
func GetMydb() *sqlx.DB {
	return mydb
}

package main

import (
	"app-plate/data"
	_ "app-plate/data"
	"fmt"
)

func main() {

	db := data.GetMydb()
	defer db.Close()

	fmt.Println("Run Go")
}

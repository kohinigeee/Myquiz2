package lib

import "app-plate/data"

var genreNameToId = make(map[string]int)
var genreIdToName = make(map[int]string)

type pair struct {
	Name string
	Id   int
}

func ConGenreNametToId(name string) (id int, isExist bool) {
	id, isExist = genreNameToId[name]
	return
}

func ConGenreIdtoName(id int) (name string, isExist bool) {
	name, isExist = genreIdToName[id]
	return
}

func init() {

	var pairs []pair

	pairs = append(pairs, pair{Name: "science", Id: data.QUIZ_GENRE_SCIENCE})
	pairs = append(pairs, pair{Name: "literature", Id: data.QUIZ_GENRE_LITERATURE})
	pairs = append(pairs, pair{Name: "social", Id: data.QUIZ_GENRE_SOCIAL})
	pairs = append(pairs, pair{Name: "music", Id: data.QUIZ_GENRE_MUSIC})
	pairs = append(pairs, pair{Name: "sports", Id: data.QUIZ_GENRE_SPORTS})
	pairs = append(pairs, pair{Name: "entertainment", Id: data.QUIZ_GENRE_ENTERTAINMENT})
	pairs = append(pairs, pair{Name: "subculture", Id: data.QUIZ_GENRE_SUBCULTURE})
	pairs = append(pairs, pair{Name: "lifestyle", Id: data.QUIZ_GENRE_LIFESTYLE})
	pairs = append(pairs, pair{Name: "nongenre", Id: data.QUIZ_GENRE_NONGENRE})

	for _, p := range pairs {
		genreIdToName[p.Id] = p.Name
		genreNameToId[p.Name] = p.Id
	}

}

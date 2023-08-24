package api

type APIResult struct {
	Status  string      `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func MakeBadAPIResult(message string, data interface{}) APIResult {
	result := APIResult{}
	result.Status = "fail"
	result.Message = message

	return result
}

func MakeSuccessAPIResult(message string, data interface{}) APIResult {
	result := APIResult{}
	result.Status = "success"
	result.Message = message
	result.Data = data

	return result
}

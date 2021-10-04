package handlers

import "strings"

//this func is used for extracting the numbers which passes as id values
//it takes the value which client passes it as an id in the request (the value is a string) and it returns an array contain the values after parsing
//it returns an array with size 2 (first element is the start of the rang and second is the end)
func parseNums(str string) []string {
	var params []string
	ind := strings.IndexByte(str, ':')
	params = append(params, str[1:ind])
	params = append(params, str[ind+1:len(str)-1])
	return params
}

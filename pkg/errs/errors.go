package errs

import "errors"

var(
	ErrDb = errors.New("unexpected database error")
	ErrContentTypeNotFound = errors.New("content type not found")
	ErrContentNotFound = errors.New("content not found")
	ErrEmailMissing = errors.New("email is missing")
	ErrInvalidPassword = errors.New("invalid password")
	ErrInvalidEmail = errors.New("invalid email")
	ErrServerErr = errors.New("internal server error")
	ErrTokenErr = errors.New("can't generate token")
	ErrContentWithStatusOk = errors.New("there is no content found")
	ErrContentParams = errors.New("parameter value is not valid")
	ErrUnexpected = errors.New("unexpected error")
	ErrInvalidToken = errors.New("invalid token")
	ErrColumnName = errors.New("no specific column name was sent")
	ErrColNotFound = errors.New("column not found")
	ErrNoContentTypeName = errors.New("there is no content type name")
	ErrDuplicateValue = errors.New("this value already exists")
	ErrNoRolesFound = errors.New("no types found")
	ErrNoRowsFound = errors.New("no values found")
	ErrUnauthorized = errors.New("you are unauthorized")
)

type Response struct {
	Message string `json:"message"`
	Status int `json:"status"`
}
func NewResponse(message string, status int) *Response {
	return &Response{Message: message, Status: status}
}



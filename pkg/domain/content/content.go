package content

import "time"

// Content  model
type Content struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Details string `json:"details"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
}
type ContentRepository interface {

	//TODO 1
	ReadAll() ([]Content, error)
	ReadById(string) (*Content,error)
	Create(content Content) (string, error)
	ReadRange([]string) ([]Content, error)
	DeleteById(string) error
	UpdateById(string, Content) error
}
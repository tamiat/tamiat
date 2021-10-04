package content

import (
	"errors"
	"fmt"
	"strconv"

	_ "github.com/jackc/pgx/v4/stdlib"
	"gorm.io/gorm"
)

// ContentRepositoryDb implements the ContentRepository interface
type ContentRepositoryDb struct {
	db *gorm.DB
}

func (r ContentRepositoryDb) ReadAll() ([]Content, error) {
	contents := make([]Content, 0)
	err := r.db.Find(&contents)
	//TODO error handling
	fmt.Println(err)
	return contents, nil
}
func (d ContentRepositoryDb) ReadById(id string) (*Content, error) {
	var c Content
	err := d.db.First(&c,  id)
	//TODO error handling
	fmt.Println(err)
	return &c, nil
}

func (d ContentRepositoryDb) ReadRange(ids []string) ([]Content, error) {
	var res []Content
	err := d.db.Find(&res,ids)
	//TODO error handling
	fmt.Println(err)
	return res, nil
}

func (d ContentRepositoryDb) Create(newContent Content) (string, error) {
	result := d.db.Create(&newContent)
	fmt.Println(result)
	var err = errors.New("error in login")
	return "",err
}
func (d ContentRepositoryDb) DeleteById(id string) error {
	var content Content
	err:=d.db.Delete(&content,id)
	//TODO error handling
	fmt.Println(err)
	return nil
}
func (d ContentRepositoryDb) UpdateById(id string, UpdContent Content) error {
	intId,err:= strconv.Atoi(id)
	UpdContent.ID = intId
	//fmt.Println(err)
	d.db.Model(&UpdContent).Select("title", "details").Updates(Content{Title: UpdContent.Title, Details: UpdContent.Details})
	fmt.Println(err)
	return nil
}
func NewContentRepositoryDb(db *gorm.DB) ContentRepositoryDb {
	return ContentRepositoryDb{db}
}
package user

import (
	"fmt"

	"github.com/harranali/authority"
	"gorm.io/gorm"

	"github.com/tamiat/backend/pkg/errs"
)

type UserRepositoryDb struct {
	db   *gorm.DB
	auth *authority.Authority
}

func (r UserRepositoryDb) Login(userObj User) (string, error) {
	var retrievedUsr User
	if err := r.db.Where("email = ?", userObj.Email).First(&retrievedUsr).Error; err != nil {
		return "", errs.ErrDb
	}
	return retrievedUsr.Password, nil
}

func (r UserRepositoryDb) Signup(user User) (int, error) {
	if err := r.db.Select("email", "password").Create(&user).Error; err != nil {
		fmt.Println(err)
		return -1, errs.ErrDb
	}
	err := r.auth.AssignRole(uint(user.ID), user.Role)
	if err != nil {
		fmt.Println(err)
		return user.ID, err
	}
	return user.ID, nil
}

func NewUserRepositoryDb(db *gorm.DB, auth *authority.Authority) UserRepositoryDb {
	return UserRepositoryDb{db, auth}
}

package service

import (
	"github.com/tamiat/backend/pkg/domain/role"
)

type RoleService interface {
	Create(role.Role) (int, error)
	Read() ([]role.Role, error)
	Delete(int) error
}

type DefaultRoleService struct {
	repo role.RoleRepository
}

func (s DefaultRoleService) Create(newRole role.Role) (int, error) {
	return s.repo.Create(newRole)
}

func (s DefaultRoleService) Read() ([]role.Role, error) {
	return s.repo.Read()
}

func (s DefaultRoleService) Delete(roleId int) error {
	return s.repo.Delete(roleId)
}

func NewRoleService(repository role.RoleRepository) DefaultRoleService {
	return DefaultRoleService{repo: repository}
}

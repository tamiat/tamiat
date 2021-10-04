package role

import (
	"database/sql"

	"github.com/harranali/authority"

	"github.com/tamiat/backend/pkg/errs"
)

type RoleRepositoryDb struct {
	sqlDb  *sql.DB
	auth   *authority.Authority
}

func (r RoleRepositoryDb) Create(newRole Role) (int, error) {
	err := r.auth.CreateRole(newRole.Name)
	if err != nil {
		return 0, err
	}
	query := r.sqlDb.QueryRow(`SELECT id FROM authority_roles WHERE name=$1`, newRole.Name)
	err = query.Scan(&newRole.ID)
	if err != nil {
		return 0, err
	}
	return newRole.ID, nil
}

func (r RoleRepositoryDb) Read() ([]Role, error) {
	roles := make([]Role, 0)
	rows, err := r.sqlDb.Query("SELECT id, name FROM authority_roles")
	if err != nil {
		return roles, err
	}
	for rows.Next() {
		var oneRole Role
		switch err := rows.Scan(&oneRole.ID, &oneRole.Name); err {
		case sql.ErrNoRows:
			return roles, sql.ErrNoRows
		case nil:
			roles = append(roles, oneRole)
		default:
			return roles, errs.ErrDb
		}
	}
	return roles, nil
}

func (r RoleRepositoryDb) Delete(roleId int) error {
	var name string
	query := r.sqlDb.QueryRow(`SELECT name FROM authority_roles WHERE id=$1`, roleId)
	err := query.Scan(&name)
	if err != nil {
		return err
	}
	return r.auth.DeleteRole(name)
}

func NewRoleRepositoryDb(sqlDb *sql.DB, auth *authority.Authority) RoleRepositoryDb {
	return RoleRepositoryDb{sqlDb, auth}
}

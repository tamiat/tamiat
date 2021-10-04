// Package service is used as a port of the business logic, which api handlers implement
package service
import (
	"github.com/tamiat/backend/pkg/domain/content"
)
type ContentService interface {	
	ReadAllContents() ([]content.Content, error)
	ReadContent(string) (*content.Content, error)
	ReadRangeOfContents([]string) ([]content.Content, error)
	CreateContent(content.Content) (string, error)
	DeleteContent(string) error
	UpdateContent(string, content.Content) error
}

type DefaultContentService struct {
	repo content.ContentRepository
}

func (s DefaultContentService) ReadAllContents() ([]content.Content, error) {
	return s.repo.ReadAll()
}
func (s DefaultContentService) ReadContent(id string) (*content.Content, error) {
	return s.repo.ReadById(id)
}
func (s DefaultContentService) ReadRangeOfContents(ids []string) ([]content.Content, error) {
	return s.repo.ReadRange(ids)
}
func (s DefaultContentService) CreateContent(newContent content.Content) (string, error) {
	return s.repo.Create(newContent)
}
func (s DefaultContentService) DeleteContent(id string) error {
	return s.repo.DeleteById(id)
}
func (s DefaultContentService) UpdateContent(id string, updContent content.Content) error {
	return s.repo.UpdateById(id, updContent)
}
func NewContentService(repository content.ContentRepository) DefaultContentService {
	return DefaultContentService{repo: repository}
}

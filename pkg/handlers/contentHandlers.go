// Package handlers, This package is used to implement the rest API operations
// we use a file for each domain object, here is the content handler
//which is responsible for crud operations of content object
package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"regexp"
	"strconv"

	"github.com/gorilla/mux"

	"github.com/tamiat/backend/pkg/domain/content"
	"github.com/tamiat/backend/pkg/errs"
	"github.com/tamiat/backend/pkg/service"
)

type ContentHandlers struct {
	service service.ContentService
}

func (ch *ContentHandlers) readAllContents(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	contents, err := ch.service.ReadAllContents()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(errs.ErrServerErr)
		return
	}
	if len(contents) == 0 {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(errs.ErrContentWithStatusOk)
		return
	}
	json.NewEncoder(w).Encode(contents)
}

func (ch *ContentHandlers) readContent(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	vars := mux.Vars(r)
	//regular expression to check if the string has numbers only	example: 1234
	pattern1, _ := regexp.Match(`^[0-9]+$`, []byte(vars["id"]))
	//if the string can't match with any RG, the response will be 400 (badrequest)
	if !pattern1 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(errs.ErrContentParams)
		return
	}
	id := vars["id"]
	log.Println(id)
	content, err := ch.service.ReadContent(id)
	if err != nil {
		if err.Error() == "content not found" {
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(errs.ErrContentNotFound)
		} else {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(errs.ErrServerErr)
		}
		return
	}
	json.NewEncoder(w).Encode(content)
}

func (ch *ContentHandlers) readRangeOfContents(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	//regular expression to check if the string in the pattern of this examples ([1:2], [35:40])
	pattern, _ := regexp.Match(`^([)([0-9]+)[:]([0-9]+)(])$`, []byte(params["id"]))
	//if the string can't match with any RG, the response will be 400 (badrequest)
	idValues := parseNums(params["id"])
	items, err := ch.service.ReadRangeOfContents(idValues)
	if !pattern || idValues[0] > idValues[1] && len(idValues[0]) <= len(idValues[1]) {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(errs.ErrContentParams)
		return
	}
	if len(items) == 0 {
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(errs.ErrServerErr)
			return
		} else {
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(errs.ErrContentTypeNotFound)
			return
		}
	}
	json.NewEncoder(w).Encode(items)
}

func (ch *ContentHandlers) createContent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var newContent content.Content
	err := json.NewDecoder(r.Body).Decode(&newContent)
	if err != nil || newContent.Title == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(errs.ErrContentParams)
		return
	}
	id, err := ch.service.CreateContent(newContent)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(errs.ErrServerErr)
		return
	}
	type ID struct {
		ID string `json:"id"`
	}
	var IDobj ID
	IDobj.ID = id
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(IDobj)
}

func (ch *ContentHandlers) deleteContent(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	vars := mux.Vars(r)
	//regular expression to check if the string has numbers only	example: 1234
	pattern1, _ := regexp.Match(`^[0-9]+$`, []byte(vars["id"]))
	if !pattern1 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(errs.ErrContentParams)
		return
	}
	id := vars["id"]
	log.Println(id)
	err := ch.service.DeleteContent(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(errs.ErrServerErr)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("This content has been deleted successfully")
	return
}

func (ch *ContentHandlers) updateContent(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	vars := mux.Vars(r)
	//regular expression to check if the string has numbers only	example: 1234
	pattern1, _ := regexp.Match(`^[0-9]+$`, []byte(vars["id"]))
	if !pattern1 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(errs.ErrContentParams)
		return
	}
	var newContent content.Content
	newContent.ID, _=strconv.Atoi(vars["id"])
	err := json.NewDecoder(r.Body).Decode(&newContent)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(errs.ErrUnexpected)
		return
	}
	err = ch.service.UpdateContent(mux.Vars(r)["id"], newContent)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(errs.ErrServerErr)
		return
	}
	json.NewEncoder(w).Encode(newContent)
}

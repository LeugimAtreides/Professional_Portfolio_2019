package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"

	"github.com/LeugimAtreides/Professional_Portfolio_2020/vwd-services/models"
	"gorm.io/gorm"
)

// getCommentOr404 gets a instance of a comment if it exists, or responds with a 404 if it does not
func getCommentOr404(db *gorm.DB, id uint, w http.ResponseWriter, r *http.Request) *models.Comment {
	comment := models.Comment{}
	if err := db.First(&comment, models.Comment{Model: gorm.Model{ID: id}}).Error; err != nil {
		respondError(w, http.StatusNotFound, err.Error())
		return nil
	}
	return &comment
}

// GetAllComments returns all comments
func GetAllComments(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	comments := []models.Comment{}
	db.Find(&comments)
	respondJSON(w, http.StatusOK, comments)
}

// CreateComment uses body to create new comment
func CreateComment(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	comment := []models.Comment{}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&comment); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	if err := db.Save(&comment).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusCreated, comment)
}

// GetComment gets a single comment
func GetComment(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		return
	}
	uID := uint(id)
	comment := getCommentOr404(db, uID, w, r)
	respondJSON(w, http.StatusOK, comment)
}

// UpdateComment allows updates to a comment
func UpdateComment(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		return
	}
	uID := uint(id)
	comment := getCommentOr404(db, uID, w, r)
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&comment); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	if err := db.Save(&comment).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	respondJSON(w, http.StatusOK, comment)
}

// DeleteComment deletes a single comment
func DeleteComment(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		return
	}
	uID := uint(id)
	comment := getCommentOr404(db, uID, w, r)
	if comment == nil {
		return
	}
	if err := db.Delete(&comment).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusNoContent, nil)
}

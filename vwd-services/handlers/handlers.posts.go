package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"

	"github.com/LeugimAtreides/Professional_Portfolio_2020/vwd-services/models"
	"gorm.io/gorm"
)

// getPostOrGet404 gets a instance of a post if it exists, or responds with a 404 if it does not
func getPostOrGet404(db *gorm.DB, id uint, w http.ResponseWriter, r *http.Request) *models.Post {
	post := models.Post{}
	if err := db.First(&post, models.Post{Model: gorm.Model{ID: id}}).Error; err != nil {
		respondError(w, http.StatusNotFound, err.Error())
		return nil
	}
	return &post
}

// GetAllPosts returns all posts
func GetAllPosts(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	posts := []models.Post{}
	db.Find(&posts)
	respondJSON(w, http.StatusOK, posts)
}

// CreatePost uses body to create new post
func CreatePost(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	post := []models.Post{}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&post); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	if err := db.Save(&post).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusCreated, post)
}

// GetPost gets a single post
func GetPost(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		return
	}
	uID := uint(id)
	post := getPostOrGet404(db, uID, w, r)
	respondJSON(w, http.StatusOK, post)
}

// UpdatePost allows updates to a post
func UpdatePost(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		return
	}
	uID := uint(id)
	post := getPostOrGet404(db, uID, w, r)
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&post); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	if err := db.Save(&post).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	respondJSON(w, http.StatusOK, post)
}

// DeletePost deletes a single post
func DeletePost(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		return
	}
	uID := uint(id)
	post := getPostOrGet404(db, uID, w, r)
	if post == nil {
		return
	}
	if err := db.Delete(&post).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusNoContent, nil)
}

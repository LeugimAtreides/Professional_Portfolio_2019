package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/LeugimAtreides/Professional_Portfolio_2020/vwd-services/models"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

// GetAllAuthors gets all authors from db
func GetAllAuthors(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	authors := []models.Author{}
	db.Find(&authors)
	respondJSON(w, http.StatusOK, authors)
}

// CreateAuthor creates an author and inserts it into db
func CreateAuthor(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	author := models.Author{}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&author); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	if err := db.Save(&author).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusCreated, author)
}

// GetAuthor gets author from db
func GetAuthor(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	name := vars["name"]
	author := getAuthorOrGet404(db, name, w, r)
	if author == nil {
		return
	}
	respondJSON(w, http.StatusOK, author)
}

// UpdateAuthor updates author in db
func UpdateAuthor(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	name := vars["name"]
	author := getAuthorOrGet404(db, name, w, r)
	if author == nil {
		return
	}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&author); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	if err := db.Save(&author).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusOK, author)
}

// DeleteAuthor deletes author from db
func DeleteAuthor(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	name := vars["name"]
	author := getAuthorOrGet404(db, name, w, r)
	if author == nil {
		return
	}
	if err := db.Delete(&author).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusNoContent, nil)
}

// DisableAuthor disables an author's status field
func DisableAuthor(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	name := vars["name"]
	author := getAuthorOrGet404(db, name, w, r)
	if author == nil {
		return
	}
	author.Disable()
	if err := db.Save(&author).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusOK, author)
}

// EnableAuthor enables authors status field
func EnableAuthor(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	name := vars["name"]
	author := getAuthorOrGet404(db, name, w, r)
	if author == nil {
		return
	}
	author.Enable()
	if err := db.Save(&author).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusOK, author)
}

// getAuthorOrGet404 gets a author instance if exists, or respond the 404 error otherwise
func getAuthorOrGet404(db *gorm.DB, name string, w http.ResponseWriter, r *http.Request) *models.Author {
	author := models.Author{}
	if err := db.First(&author, models.Author{User: models.User{Name: name}}).Error; err != nil {
		respondError(w, http.StatusNotFound, err.Error())
		return nil
	}
	return &author
}

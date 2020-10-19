package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/LeugimAtreides/Professional_Portfolio_2020/vwd-services/models"
	"gorm.io/gorm"
)

// GetAllProjects gets all projects from DB
func GetAllProjects(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	projects := []models.Project{}
	db.Find(&projects)
	respondJSON(w, http.StatusOK, projects)
}

// CreateProject inserts a new projec into DB
func CreateProject(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	project := models.Project{}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&project); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}

	defer r.Body.Close()

	if err := db.Save(&project).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
	}
	respondJSON(w, http.StatusCreated, project)
}

// GetProject gets a single project from DB
func GetProject(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	title := vars["title"]
	project := getProjectOr404(db, title, w, r)
	if project == nil {
		return
	}
	respondJSON(w, http.StatusOK, project)
}

// UpdateProject updates a project in the DB
func UpdateProject(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	title := vars["title"]
	project := getProjectOr404(db, title, w, r)
	if project == nil {
		return
	}
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&project); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	if err := db.Save(&project).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusOK, project)
}

// DeleteProject deletes a project in the DB
func DeleteProject(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	title := vars["title"]
	project := getProjectOr404(db, title, w, r)

	if project == nil {
		return
	}

	if err := db.Delete(&project).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusNoContent, nil)
}

// getProjectOr404 gets a project instance if it exists or responds with a 404 error if otherwise
func getProjectOr404(db *gorm.DB, title string, w http.ResponseWriter, r *http.Request) *models.Project {
	project := models.Project{}
	if err := db.First(&project, models.Project{Title: title}).Error; err != nil {
		respondError(w, http.StatusNotFound,
			err.Error())
		return nil
	}
	return &project
}

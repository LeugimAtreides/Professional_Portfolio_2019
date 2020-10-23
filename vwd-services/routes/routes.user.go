package routes

import (
	"net/http"

	"github.com/LeugimAtreides/Professional_Portfolio_2020/vwd-services/handlers"
)

// GetAllUsers Handlers to manage user data CRUD
func (a *App) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	handlers.GetAllUsers(a.DB, w, r)
}

// GetUser handler to get user
func (a *App) GetUser(w http.ResponseWriter, r *http.Request) {
	handlers.GetUser(a.DB, w, r)
}

package routes

import (
	"fmt"
	"log"
	"net/http"

	"github.com/LeugimAtreides/Professional_Portfolio_2020/vwd-services/config"
	"github.com/LeugimAtreides/Professional_Portfolio_2020/vwd-services/middleware"
	"github.com/LeugimAtreides/Professional_Portfolio_2020/vwd-services/models"
	"github.com/gorilla/mux"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// App has router and db instances
type App struct {
	Router *mux.Router
	DB     *gorm.DB
}

// Migrate performs auto migrations of all models
func Migrate(db *gorm.DB) *gorm.DB {
	defer models.DBMigrateUsers(db)
	defer models.DBMigrateProjects(db)
	defer models.DBMigrateAuthors(db)
	defer models.DBMigrateComments(db)
	defer models.DBMigratePosts(db)
	return db
}

// Initialize starts db with a predetermined configuration
func (a *App) Initialize(config *config.Config) {
	dbURI := fmt.Sprintf("host=%s dbname=%s user=%s password=%s sslmode=disable",
		config.DB.Instance, config.DB.DBName, config.DB.DBUser, config.DB.DBPassword,
	)

	db, err := gorm.Open(postgres.Open(dbURI), &gorm.Config{})

	if err != nil {
		panic("failed to connect to database")
	}

	a.DB = Migrate(db)
	a.Router = mux.NewRouter()
	a.setRouters()
}

// SetRouter intializes all required routers
func (a *App) setRouters() {
	a.Get("/users", a.GetAllUsers, "")
}

// MidSwitch does stuff
func (a *App) MidSwitch(m string) {
	switch m {
	case "LoggedIn":
		a.Router.Use(middleware.EnsureLoggedIn)
	case "LoggedOut":
		a.Router.Use(middleware.EnsureNotLoggedIn)
	case "ChangeUserStatus":
		a.Router.Use(middleware.SetUserStatus)
	default:
		a.Router.Use(middleware.Default)
	}
}

// Get Wrap the router for GET method
func (a *App) Get(path string, f func(w http.ResponseWriter, r *http.Request), m string) {
	a.MidSwitch(m)
	a.Router.HandleFunc(path, f).Methods("GET")
}

// Post Wrap the router for POST method
func (a *App) Post(path string, f func(w http.ResponseWriter, r *http.Request), m string) {
	a.MidSwitch(m)
	a.Router.HandleFunc(path, f).Methods("POST")
}

// Put Wrap the router for PUT method
func (a *App) Put(path string, f func(w http.ResponseWriter, r *http.Request), m string) {
	a.MidSwitch(m)
	a.Router.HandleFunc(path, f).Methods("PUT")
}

// Delete Wrap the router for DELETE method
func (a *App) Delete(path string, f func(w http.ResponseWriter, r *http.Request), m string) {
	a.MidSwitch(m)
	a.Router.HandleFunc(path, f).Methods("DELETE")
}

// Run the app on its router
func (a *App) Run(host string) {
	log.Fatal(http.ListenAndServe(host, a.Router))
}

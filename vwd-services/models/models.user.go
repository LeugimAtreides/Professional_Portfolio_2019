package models

import (
	"gorm.io/gorm"
)

// User fields
type User struct {
	gorm.Model
	Name     string `gorm:"<-" json:"name"`
	Username string `gorm:"<-" json:"username"`
	Password string `gorm:"<-" json:"password"`
	Status   bool   `json:"status"`
}

// Disable switches the status of an author
func (e *User) Disable() {
	e.Status = false
}

// Enable switches the status of an author to tru
func (e *User) Enable() {
	e.Status = true
}

// DBMigrateUsers will create and migrate the tables, and then make the some relationships if necessary
func DBMigrateUsers(db *gorm.DB) *gorm.DB {
	db.AutoMigrate(&User{})
	return db
}

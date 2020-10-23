package models

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

// Project holds the different things I've worked on
type Project struct {
	gorm.Model
	Upvotes    int32          `gorm:"<-:update" json:"upvotes"`
	Title      string         `gorm:"<-" json:"title"`
	Info       string         `gorm:"<-" json:"info"`
	Technology pq.StringArray `gorm:"type:varchar(64)[];<-" json:"technologies"`
	Link       string         `json:"link"`
}

// DBMigrateProjects will create and migrate the tables, and then make the some relationships if necessary
func DBMigrateProjects(db *gorm.DB) {
	db.AutoMigrate(&Project{})
}

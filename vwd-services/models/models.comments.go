package models

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

// Comment are for users who want to leave comments in a post
type Comment struct {
	gorm.Model
	PostID    int            `json:"post_id"`
	Post      Post           `json:"post"`
	Author    Author         `gorm:"embedded;embeddedPrefix" json:"author"`
	Upvotes   int32          `json:"upvotes"`
	Reactions pq.StringArray `gorm:"type:varchar(64)[];<-" json:"reactions"`
}

// DBMigrateComments will create and migrate the tables, and then make the some relationships if necessary
func DBMigrateComments(db *gorm.DB) *gorm.DB {
	db.AutoMigrate(&Comment{})
	return db
}

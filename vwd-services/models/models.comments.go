package models

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

// Comment are for users who want to leave comments in a post
type Comment struct {
	gorm.Model
	PostID    uint           `json:"post_id"`
	Author    Author         `gorm:"embedded;embeddedPrefix" json:"author"`
	AuthorID  uint           `json:"author_id"`
	Upvotes   int32          `json:"upvotes"`
	Reactions pq.StringArray `gorm:"type:varchar(64)[];<-" json:"reactions"`
}

// DBMigrateComments will create and migrate the tables, and then make the some relationships if necessary
func DBMigrateComments(db *gorm.DB) {
	db.AutoMigrate(&Comment{})
}

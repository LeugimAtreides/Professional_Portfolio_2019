package models

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

// Post is for my blog posts
type Post struct {
	gorm.Model
	Author   Author         `gorm:"embedded;embeddedPrefix" json:"author"`
	Upvotes  int32          `gorm:"<-" json:"upvotes"`
	Content  string         `gorm:"<-" json:"content"`
	Tags     pq.StringArray `gorm:"type:varchar(64)[];<-" json:"tags"`
	Comments []Comment      `json:"comments"`
}

// DBMigratePosts will create and migrate the tables, and then make the some relationships if necessary
func DBMigratePosts(db *gorm.DB) *gorm.DB {
	db.AutoMigrate(&Post{})
	return db
}

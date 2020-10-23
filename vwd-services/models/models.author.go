package models

import (
	"gorm.io/gorm"
)

// Author of a blog post, only me for now
type Author struct {
	gorm.Model
	UserID    int       `json:"user_id"`
	User      User      `json:"user"`
	PostID    uint      `json:"post_id"`
	Posts     []Post    `json:"posts"`
	CommentID uint      `json:"comment_id"`
	Comments  []Comment `json:"comments"`
	Status    bool      `json:"status"`
}

// Disable switches the status of an author
func (e *Author) Disable() {
	e.Status = false
}

// Enable switches the status of an author to tru
func (e *Author) Enable() {
	e.Status = true
}

// DBMigrateAuthors will create and migrate the tables, and then make the some relationships if necessary
func DBMigrateAuthors(db *gorm.DB) {
	db.AutoMigrate(&Author{})
}

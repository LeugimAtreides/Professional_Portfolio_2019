package middleware

import (
	"net/http"
)

// Options groups all of the middleware options together
type Options interface {
	Default() http.Handler
	EnsureLoggedIn() http.Handler
	EnsureNotLoggedIn() http.Handler
	SetUserStatus() http.Handler
}

// Default allows for when no middleware is needed
func Default(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		next.ServeHTTP(w, r)
	})
}

// EnsureLoggedIn ensures that requests are aborted with an error if the user is not logged in
func EnsureLoggedIn(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		loggedIn := r.Header.Get("is_logged_in")
		if loggedIn == "" {
			http.Error(w, "Forbidden", http.StatusForbidden)
		} else {
			next.ServeHTTP(w, r)
		}
	})
}

// EnsureNotLoggedIn makes sure that requests are aborted with an error if the user is logged in
func EnsureNotLoggedIn(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		loggedIn := r.Header.Get("is_logged_in")
		if loggedIn != "" {
			http.Error(w, "Forbidden", http.StatusForbidden)
		} else {
			next.ServeHTTP(w, r)
		}
	})
}

// SetUserStatus sets whether the user is logged in or not
func SetUserStatus(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if token, err := r.Cookie("token"); err == nil || token.Value != "" {
			r.Header.Set("is_logged_in", "true")
			next.ServeHTTP(w, r)
		} else {
			r.Header.Set("is_logged_in", "false")
			next.ServeHTTP(w, r)
		}
	})
}

package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/LeugimAtreides/Professional_Portfolio_2020/vwd-services/models"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

func goDotEnvVariable(key string) string {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	return os.Getenv(key)
}

// CreateToken creates a jwt session token for a user
func CreateToken(username string) (string, error) {
	var err error
	atClaims := jwt.MapClaims{}
	atClaims["authorized"] = true
	atClaims["username"] = username
	atClaims["exp"] = time.Now().Add(time.Minute * 15).Unix()
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	token, err := at.SignedString([]byte(goDotEnvVariable("ACCESS_SECRET")))
	if err != nil {
		log.Printf("unable to create authentication token for user")
		return "", err
	}
	return token, nil
}

// GetAllUsers gets user list from DB
func GetAllUsers(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	users := []models.User{}
	db.Find(&users)
	respondJSON(w, http.StatusOK, users)
}

// createUser creates a new user and inserts into db
func createUser(db *gorm.DB, w http.ResponseWriter, r *http.Request) (*models.User, error) {
	user := models.User{}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&user); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())

	}
	defer r.Body.Close()

	if err := db.Save(&user).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
	}
	respondJSON(w, http.StatusCreated, user)
	return &user, nil
}

// RegisterNewUser uses createUser function to register a new user and log them in at the same time
func RegisterNewUser(c *gin.Context, db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	if newUser, err := createUser(db, w, r); err == nil {
		if token, err := CreateToken(newUser.Username); err == nil {
			c.SetCookie("token", token, 3600, "", "", false, true)
			c.Set("is_logged_in", true)
			log.Printf("successful login attempt")
			respondJSON(w, http.StatusOK, token)
		} else {
			log.Printf("token creation for user failed %+v", err)
			respondError(w, http.StatusInternalServerError, err.Error())
		}
	} else {
		log.Printf("invalid registration attempt %+v", err)
		respondError(w, http.StatusUnauthorized, err.Error())
	}
}

// GetUser grabs a single user from DB
func GetUser(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	name := vars["name"]
	user := getUserOr404(db, name, w, r)
	if user == nil {
		return
	}
	respondJSON(w, http.StatusOK, user)
}

// Login holds values for logging in a user
type Login struct {
	Username, Password string
}

// PerformLogin logs in a user
func PerformLogin(db *gorm.DB, w http.ResponseWriter, r *http.Request, c *gin.Context) {
	var l Login
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&l); err != nil {
		respondError(w, http.StatusUnauthorized, err.Error())
		return
	}
	defer r.Body.Close()
	user := isUserValid(db, l.Username, l.Password, w, r)
	if user == nil {
		return
	}
	if token, err := CreateToken(l.Username); err == nil {
		c.SetCookie("token", token, 3600, "", "", false, true)
		c.Set("is_logged_in", true)
		log.Printf("successful login attempt")
		respondJSON(w, http.StatusOK, token)
	} else {
		log.Printf("token creation for user failed %+v", err)
		respondError(w, http.StatusInternalServerError, err.Error())
	}
}

// Logout will remove the jwt token from a users session and effectively log them out
func Logout(w http.ResponseWriter, c *gin.Context) {
	// clear the cookie
	c.SetCookie("token", "", -1, "", "", false, true)
	log.Printf("successful logout attempt")
	respondJSON(w, http.StatusOK, nil)
}

// UpdateUser updates a user in the DB
func UpdateUser(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	name := vars["name"]
	user := getUserOr404(db, name, w, r)
	if user == nil {
		return
	}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&user); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	if err := db.Save(&user).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusOK, user)
}

// DeleteUser deletes a user from the DB
func DeleteUser(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	name := vars["name"]
	user := getUserOr404(db, name, w, r)
	if user == nil {
		return
	}
	if err := db.Delete(&user).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusNoContent, nil)
}

// DisableUser disables a user
func DisableUser(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	name := vars["name"]
	user := getUserOr404(db, name, w, r)
	if user == nil {
		return
	}
	user.Disable()
	if err := db.Save(&user).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusOK, user)
}

// EnableUser enables a user
func EnableUser(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	name := vars["name"]
	user := getUserOr404(db, name, w, r)
	if user == nil {
		return
	}
	user.Enable()
	if err := db.Save(&user).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusOK, user)
}

// getUserOr404 gets a user instance if exists, or respond the 404 error otherwise
func getUserOr404(db *gorm.DB, name string, w http.ResponseWriter, r *http.Request) *models.User {
	user := models.User{}
	if err := db.First(&user, models.User{Name: name}).Error; err != nil {
		respondError(w, http.StatusNotFound, err.Error())
		return nil
	}
	return &user
}

// isUserValid checks and returns a user if they have provided an actual password and username
func isUserValid(db *gorm.DB, username string, password string, w http.ResponseWriter, r *http.Request) *models.User {
	user := models.User{}
	if err := db.Where("username = ?", username).Where("password = ?", password).First(&user).Error; err != nil {
		respondError(w, http.StatusNotFound, err.Error())
		return nil
	}
	return &user
}

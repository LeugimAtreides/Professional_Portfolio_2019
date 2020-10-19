package main

import (
	"fmt"
	"log"
	"os"

	"github.com/LeugimAtreides/Professional_Portfolio_2020/vwd-services/middleware"
	"github.com/LeugimAtreides/Professional_Portfolio_2020/vwd-services/models"
	"github.com/gin-gonic/gin"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func goDotEnvVariable(key string) string {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	return os.Getenv(key)
}

func main() {
	router := gin.Default()

	var (
		instanceName = goDotEnvVariable("INSTANCE_CONNECTION_NAME")
		dbName       = goDotEnvVariable("DATABASE_NAME")
		dbUser       = goDotEnvVariable("DATABASE_USER")
		dbPassword   = goDotEnvVariable("PASSWORD")
	)

	dsn := fmt.Sprintf("host=%s dbname=%s user=%s password=%s sslmode=disable",
		instanceName, dbName, dbUser, dbPassword,
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		fmt.Printf(dsn)
		panic("failed to connect to database")
	}

	db.AutoMigrate(&models.SeedUsers)
	db.AutoMigrate(&models.SeedProjects)

	router.Use(middleware.SetUserStatus())

	router.Run(":5000")
}

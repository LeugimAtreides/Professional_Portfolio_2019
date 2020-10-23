package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func goDotEnvVariable(key string) string {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	return os.Getenv(key)
}

var (
	instanceName = goDotEnvVariable("INSTANCE_CONNECTION_NAME")
	dbName       = goDotEnvVariable("DATABASE_NAME")
	dbUser       = goDotEnvVariable("DATABASE_USER")
	dbPassword   = goDotEnvVariable("PASSWORD")
)

// Config serves as a general struct holder for DBConfig
type Config struct {
	DB *DBConfig
}

// DBConfig holds database configuration values
type DBConfig struct {
	Instance   string
	DBName     string
	DBUser     string
	DBPassword string
}

// GetConfig allows other parts of the application to get database configurations
func GetConfig() *Config {
	return &Config{
		DB: &DBConfig{
			Instance:   instanceName,
			DBName:     dbName,
			DBUser:     dbUser,
			DBPassword: dbPassword,
		},
	}
}

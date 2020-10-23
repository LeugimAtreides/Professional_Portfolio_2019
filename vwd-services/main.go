package main

import (
	"github.com/LeugimAtreides/Professional_Portfolio_2020/vwd-services/config"
	"github.com/LeugimAtreides/Professional_Portfolio_2020/vwd-services/routes"
)

func main() {
	config := config.GetConfig()
	app := &routes.App{}
	app.Initialize(config)
	app.Run(":3000")
}

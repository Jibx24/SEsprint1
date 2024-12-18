package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"example.com/sesprint1/config"
	
	"example.com/sesprint1/entity"
)

func GetCategory(c *gin.Context) {

	var categories []entity.Category

	db := config.DB()

	db.Find(&categories)
	
	c.JSON(http.StatusOK, &categories)
}

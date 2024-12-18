package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"example.com/sesprint1/config"
	"example.com/sesprint1/entity"
)

// CreateMenu - POST /menus
func CreateMenu(c *gin.Context) {
	var menu entity.Menu

	// Bind JSON data to menu struct
	if err := c.ShouldBindJSON(&menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// Create a new menu entry
	if err := db.Create(&menu).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create menu"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Menu created successfully", "data": menu})
}

// GetAllMenus - GET /menus
func GetAllMenus(c *gin.Context) {
	var menus []entity.Menu

	db := config.DB()
 
	results := db.Preload("Category").Find(&menus)
 
	if results.Error != nil {
 
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
 
		return
 
	}
 
	c.JSON(http.StatusOK, menus)
}

// GetMenu - GET /menus/:id
func GetMenu(c *gin.Context) {
	ID := c.Param("id")

	var menu entity.Menu
 
 
	db := config.DB()
 
	results := db.Preload("Category").First(&menu, ID)
 
	if results.Error != nil {
 
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
 
		return
 
	}
 
	if menu.ID == 0 {
 
		c.JSON(http.StatusNoContent, gin.H{})
 
		return
 
	}
 
	c.JSON(http.StatusOK, menu)
}


// UpdateMenu - PUT /menus/:id
func UpdateMenu(c *gin.Context) {

	var menu entity.Menu


	MenuID := c.Param("id")
 
 
	db := config.DB()
 
	result := db.First(&menu, MenuID)
 
	if result.Error != nil {
 
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
 
		return
 
	}
 
 
	if err := c.ShouldBindJSON(&menu); err != nil {
 
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
 
		return
 
	}
 
	result = db.Save(&menu)
 
	if result.Error != nil {
 
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
 
		return
 
	}
 
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

// DeleteMenu - DELETE /menus/:id
func DeleteMenu(c *gin.Context) {
	id := c.Param("id")

	db := config.DB()
 
	if tx := db.Exec("DELETE FROM menus WHERE id = ?", id); tx.RowsAffected == 0 {
 
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
 
		return
 
	}
 
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}

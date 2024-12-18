package main


import (

   "net/http"


   "github.com/gin-gonic/gin"


   "example.com/sesprint1/config"

   "example.com/sesprint1/controller"


)


const PORT = "8000"


func main() {


   // open connection database

   config.ConnectionDB()


   // Generate databases

   config.SetupDatabase()


   r := gin.Default()


   r.Use(CORSMiddleware())

// Route
   r.POST("/menus", controller.CreateMenu)


   router := r.Group("/")

   {

       // User Route

       router.PUT("/menus/:id", controller.UpdateMenu)

       router.GET("/menus", controller.GetAllMenus)

       router.GET("/menus/:id", controller.GetMenu)

       router.DELETE("/menus/:id", controller.DeleteMenu)


   }


   r.GET("/category", controller.GetCategory)


   r.GET("/", func(c *gin.Context) {

       c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)

   })


   // Run the server


   r.Run("localhost:" + PORT)


}


func CORSMiddleware() gin.HandlerFunc {

   return func(c *gin.Context) {

       c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

       c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

       c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

       c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")


       if c.Request.Method == "OPTIONS" {

           c.AbortWithStatus(204)

           return

       }


       c.Next()

   }

}
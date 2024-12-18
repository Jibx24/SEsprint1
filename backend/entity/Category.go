package entity

import (

   "gorm.io/gorm"

)

type Category struct {

   gorm.Model

   CategoryName string `json:"category_name"`

   Menu []Menu `gorm:"foreignKey:CategoryID"`

   
}
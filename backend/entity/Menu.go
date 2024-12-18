package entity

import (

   "gorm.io/gorm"

)

type Menu struct {

   gorm.Model

   MenuName    string  `json:"menu_name"`

   MenuPrice   float64 `json:"menu_price"`

   AmountSold      uint    `json:"amount_sold"`

   Amount      uint    `json:"amount"`

   CategoryID uint    `json:"category_id"`
   Category    Category `gorm:"foreignKey:CategoryID" json:"category"`

   UserID     uint    `json:"user_id"`
}
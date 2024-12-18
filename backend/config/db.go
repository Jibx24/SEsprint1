package config

import (
	"example.com/sesprint1/entity"
	"fmt"
	"time"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("sa.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {
	db.AutoMigrate(
		&entity.Gender{},
		&entity.Users{},
		&entity.Category{},
		&entity.Menu{}, // เพิ่มการ migrate ตาราง Like
	)

	// สร้างข้อมูลเพศ
	genders := []entity.Gender{
		{GenderName: "Male"},
		{GenderName: "Female"},
	}

	for _, gender := range genders {
		db.FirstOrCreate(&gender, entity.Gender{GenderName: gender.GenderName})
	}

	// สร้างข้อมูลผู้ใช้
	hashedPassword, _ := HashPassword("4")

	birthDate, err := time.Parse("02-01-2006", "11-11-2003")
	if err != nil {
		panic("invalid birth date format")
	}

	users := []entity.Users{
		{
			FirstName: "J",
			LastName:  "K",
			Email:     "Nuay@gmail.com",
			Age:       20,
			Password:  hashedPassword,
			BirthDay:  birthDate,
			Profile:   "https://th.bing.com/th/id/OIF.fbwj6WknENM1GagLsK5N8Q?rs=1&pid=ImgDetMain",
			GenderID:  1,
		},
	}

	for _, user := range users {
		db.FirstOrCreate(&user, entity.Users{Email: user.Email})
	}

	menus := []entity.Menu{
		{
			MenuName:       "popcorn",
			MenuPrice: 		50.0,
			AmountSold: 	50,	
			Amount:         100,
			CategoryID:    1,
			UserID:      1,
		},
		{
			MenuName:       "corn",
			MenuPrice: 		50.0,
			AmountSold: 	50,	
			Amount:         100,
			CategoryID:    2,
			UserID:      1,
		},
	}

	for _, menu := range menus {
		db.FirstOrCreate(&menu, entity.Menu{MenuName: menu.MenuName})
	}

	// สร้างข้อมูลประเภท
	categorys := []entity.Category{
		{CategoryName: "อาหาร"},
		{CategoryName: "เครื่องดื่ม"},
	}

	for _, Category := range categorys {
		db.FirstOrCreate(&Category, entity.Category{CategoryName: Category.CategoryName})
	}
}

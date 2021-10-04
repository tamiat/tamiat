package handlers

//this file is used to handle all business logic

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/harranali/authority"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/tamiat/backend/pkg/domain/content"
	"github.com/tamiat/backend/pkg/domain/contentType"
	"github.com/tamiat/backend/pkg/domain/role"
	"github.com/tamiat/backend/pkg/domain/user"
	"github.com/tamiat/backend/pkg/middleware"
	"github.com/tamiat/backend/pkg/service"
)

func Start() {
	router := mux.NewRouter()
	headers := handlers.AllowedHeaders([]string{"content-type"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"*"})
	dbConnection, sqlDBConnection := getDbConnetion()
	auth := initAuthority(dbConnection)
	contentHandler := ContentHandlers{service.NewContentService(content.NewContentRepositoryDb(dbConnection))}
	usertHandler := UserHandlers{service.NewUserService(user.NewUserRepositoryDb(dbConnection,auth))}
	ct := ContentTypeHandlers{service.NewContentTypeService(contentType.NewContentTypeRepositoryDb(dbConnection, sqlDBConnection, auth))}
	roleHandler := RoleHandlers{service.NewRoleService(role.NewRoleRepositoryDb(sqlDBConnection ,auth))}

		router.Path("/api/v1/contentType/{userId:[0-9]+}").
			HandlerFunc(ct.createContentType).Methods(http.MethodPost)

		router.Path("/api/v1/contentType/{userId:[0-9]+}/{contentTypeId:[0-9]+}").
			HandlerFunc(ct.deleteContentType).Methods(http.MethodDelete)

		router.Path("/api/v1/contentType/renamecol/{userId:[0-9]+}/{contentTypeId:[0-9]+}").
			HandlerFunc(ct.updateColName).Methods(http.MethodPut)

		router.Path("/api/v1/contentType/addcol/{userId:[0-9]+}/{contentTypeId:[0-9]+}").
			HandlerFunc(ct.addCol).Methods(http.MethodPut)

		router.Path("/api/v1/contentType/delcol/{userId:[0-9]+}/{contentTypeId:[0-9]+}").
			HandlerFunc(ct.deleteCol).Methods(http.MethodPut)


	//roles endpoints
	router.HandleFunc("/api/v1/roles", roleHandler.Create).Methods(http.MethodPost)
	router.HandleFunc("/api/v1/roles", roleHandler.Read).Methods(http.MethodGet)
	router.HandleFunc("/api/v1/roles/{id:[0-9]+}", roleHandler.Delete).Methods(http.MethodDelete)


	router.HandleFunc("/api/v1/contents/", middleware.TokenVerifyMiddleWare(contentHandler.readAllContents)).Methods(http.MethodGet)
	router.Path("/api/v1/content").Queries("id", "{id}").
		HandlerFunc(middleware.TokenVerifyMiddleWare(contentHandler.readContent)).Methods(http.MethodGet)
	router.Path("/api/v1/contents").Queries("id", "{id}").
		HandlerFunc(middleware.TokenVerifyMiddleWare(contentHandler.readRangeOfContents)).Methods(http.MethodGet)
	router.HandleFunc("/api/v1/content/", middleware.TokenVerifyMiddleWare(contentHandler.createContent)).Methods(http.MethodPost)
	router.Path("/api/v1/content").Queries("id", "{id}").
		HandlerFunc(middleware.TokenVerifyMiddleWare(contentHandler.deleteContent)).Methods(http.MethodDelete)
	router.Path("/api/v1/content").Queries("id", "{id}").
		HandlerFunc(middleware.TokenVerifyMiddleWare(contentHandler.updateContent)).Methods(http.MethodPut)

	router.HandleFunc("/api/v1/login", usertHandler.Login).Methods("POST")
	router.HandleFunc("/api/v1/signup", usertHandler.Signup).Methods("POST")

	log.Fatal(http.ListenAndServe("localhost:8080", handlers.CORS(headers, methods, origins)(router)))
}
func getDbConnetion() (*gorm.DB, *sql.DB) {
	dataSourceName := fmt.Sprintf("host=%s port=%s dbname=%s user=%s password=%s",
		os.Getenv("HOST"),
		os.Getenv("DBPORT"),
		os.Getenv("DBNAME"),
		os.Getenv("USER"),
		os.Getenv("PASS"))
	sqlDB, err := sql.Open("pgx", dataSourceName)
	db, err := gorm.Open(postgres.Open(dataSourceName), &gorm.Config{})
	if err != nil {
		log.Fatal(fmt.Sprintf("unable to conect to db"))
		panic(err)
	}
	log.Println("connected to db ")
	log.Println("pinged db")
	return db, sqlDB
}

// initiate authority
func initAuthority(db *gorm.DB) *authority.Authority{
	return authority.New(authority.Options{
		TablesPrefix: "authority_",
		DB:           db,
	})
}

package middleware

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"

	"github.com/tamiat/backend/pkg/domain/user"
	"github.com/tamiat/backend/pkg/errs"
)


func TokenVerifyMiddleWare(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		secret:=fmt.Sprintf("%s",os.Getenv("SECRET"))
		authHeader := r.Header.Get("Authorization")
		bearerToken := strings.Split(authHeader, " ")
		if len(bearerToken) == 2 {
			authToken := bearerToken[1]
			token, err := jwt.Parse(authToken, func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("There was an error")
				}
				return []byte(secret), nil
			})
			if err != nil {
				//TODO
				w.WriteHeader(http.StatusUnauthorized)
				json.NewEncoder(w).Encode(errs.NewResponse(err.Error(),http.StatusUnauthorized))
				return
			}
			if token.Valid {
				next.ServeHTTP(w, r)
			} else {
				//TODO
				w.WriteHeader(http.StatusUnauthorized)
				json.NewEncoder(w).Encode(errs.NewResponse(err.Error(),http.StatusUnauthorized))
				return
			}
		} else {
			//TODO
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(errs.NewResponse(errs.ErrInvalidToken.Error(),http.StatusUnauthorized))
			return
		}
	})
}
func GenerateToken(user user.User) (string, error) {
	var err error
	secret:=fmt.Sprintf("%s",os.Getenv("SECRET"))
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		//TODO change claims
		"email": user.Email,
		"iss":   "course",
		"exp": time.Now().Add(time.Hour * 2).Unix(),
	})
	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		return "",err
	}
	return tokenString, nil
}




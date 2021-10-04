package user

type User struct {
	ID       int    `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type UserRepository interface {
	Login(User) (string, error)
	Signup(User) (int, error)
}

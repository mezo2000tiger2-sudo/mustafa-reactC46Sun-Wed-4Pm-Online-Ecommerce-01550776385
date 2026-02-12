export interface SuccessLogin {
  message: string
  user: UserResponse
  token: string
}
export interface FaildLogin {
  statusMsg: string
  message: string
}

export interface UserResponse {
  name: string
  email: string
  role: string
}

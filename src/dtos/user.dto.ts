export interface CreateUserDTO {
    name: string;
    email: string;
    username: string;
    password: string;
}

export interface UpdateUserDTO {
    userID?: string;
    name?: string;
    email?: string;
    password?: string;
    username?: string;
    token?: string | null;
}

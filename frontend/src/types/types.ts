export type AuthContext = {
    user: User | null,
    signUp: (data: AuthUser) => Promise<any>,
    signIn: (data: AuthUser) => Promise<any>,
    message: string,
    logOut: () => void,
    changeMessage: (message: string) => void,
    loading: boolean,
    changeLoading: (boolean: boolean) => void,
    handleExpiredToken: () => void
}

export type AuthUser = {
    email: string,
    password: string
}

export type User = {
    id: number,
    email: string
}
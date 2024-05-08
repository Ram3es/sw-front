import { GET } from '../axios.instance'

export const loginSteam = async () => await GET('/auth/steam')
export const logoutSteam = async () => await GET('/auth/logout')

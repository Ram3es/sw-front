import { GET } from "./axios.instance";

export const getUser = async () => await GET('/user/me')
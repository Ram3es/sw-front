import { IMAGE_ROOT_URL } from "@/constants/common"

export const getImageURL = (hash: string, size?: number): string => IMAGE_ROOT_URL.replace(':hash', hash).concat(`${size}fx${size}f`)
// @ts-ignore
import convert from "cyrillic-to-latin"
export default function normalizeString(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}
export function toSearchableString(string: string) {
    return normalizeString(convert(string)).toLowerCase().replaceAll("đ", "dj")
}

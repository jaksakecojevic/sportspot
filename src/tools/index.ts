import { Moment } from "moment"

export function sameDay(d1: Moment, d2: Moment) {
    return d1.year() === d2.year() && d1.month() === d2.month() && d1.date() === d2.date()
}
export function getFlagEmoji(countryCode: string) {
    return countryCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
}
export function awaitTimeout(delay: number) {
    return new Promise((resolve) => setTimeout(resolve, delay))
}

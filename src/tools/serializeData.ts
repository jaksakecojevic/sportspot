export default function serializeData(data: object) {
    return JSON.parse(JSON.stringify(data))
}

export default function serializeData(data: any) {
    return JSON.parse(JSON.stringify(data)) as any
}

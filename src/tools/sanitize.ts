export default function sanitize(string: string) {
    return string.replace(/[{}<>]/g, "")
}

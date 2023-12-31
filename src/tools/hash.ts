import crypto from "crypto"

export function hash(data: any) {
    return crypto.createHash("sha256").update(data).digest("hex")
}

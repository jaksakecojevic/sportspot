export default function ListingDescription({ description }: { description: string }) {
    const limitDescription = (description: string, limit: number) => {
        if (description.length > limit) {
            return description.substring(0, limit) + "..."
        }
        return description
    }

    return <p className={`block max-w-2xl whitespace-pre-wrap ${!limitDescription(description, 250).includes(" ") ? "break-all" : ""}`}>{description}</p>
}

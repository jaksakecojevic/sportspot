import LoadingLine from "../LoadingLine"

export default function LoadingForm() {
    return (
        <div className="w-full flex justify-center items-center px-sideSpace">
            <div className="w-full max-w-lg">
                <div className="p-4 rounded-lg border-2 border-gray-200 flex flex-col justify-between gap-4 h-72 mb-4">
                    <LoadingLine />
                    <LoadingLine />
                    <LoadingLine />
                    <LoadingLine />
                </div>
                <LoadingLine />
            </div>
        </div>
    )
}

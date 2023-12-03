import LoadingLine from "../LoadingLine"

export default function AccountLoading() {
    return (
        <div className="w-full flex justify-center px-sideSpace pt-24 pb-96">
            <div className="p-4 rounded-lg border-2 border-gray-200 flex flex-col sm:flex-row gap-4 w-full sm:min-h-[400px]">
                <div className="flex flex-col gap-1 sm:w-[150px] w-full">
                    <LoadingLine />
                    <LoadingLine />
                    <LoadingLine />
                </div>
                <div className="flex-1"></div>
            </div>
        </div>
    )
}

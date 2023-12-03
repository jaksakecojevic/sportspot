import LoadingLine from "../LoadingLine"

export default function ListingLoading() {
    return (
        <div className="px-sideSpace py-8 sm:py-16 min-h-screen">
            <div className="flex gap-4 sm:gap-8 flex-col lg:flex-row items-center lg:items-stretch min-h-screen">
                <div className="max-w-xl w-full">
                    <div className="w-full bg-gray-200 rounded-lg animate-pulse h-full max-h-[420px] min-h-[240px] mb-4"></div>
                    <div className="flex gap-4 flex-wrap justify-center">
                        <LoadingLine className="h-12 w-12" />
                        <LoadingLine className="h-12 w-12" />
                        <LoadingLine className="h-12 w-12" />
                        <LoadingLine className="h-12 w-12" />
                        <LoadingLine className="h-12 w-12" />
                        <LoadingLine className="h-12 w-12" />
                    </div>
                </div>
                <div className="h-full w-full flex-1 flex flex-col gap-8">
                    <LoadingLine className="h-12" />
                    <div className="flex flex-col gap-2">
                        <LoadingLine className="w-4/5 h-5" />
                        <LoadingLine className="w-full h-5" />
                        <LoadingLine className="w-3/5 h-5" />
                        <LoadingLine className="w-4/5 h-5" />
                    </div>
                    <LoadingLine />

                    <LoadingLine />
                    <LoadingLine className="max-w-sm h-12" />
                </div>
            </div>
        </div>
    )
}

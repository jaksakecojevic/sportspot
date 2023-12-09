import LoadingLine from "../LoadingLine"

export default function AccountLoading() {
    return (
        <div className="w-full flex flex-col gap-4 justify-center px-sideSpace pt-24 pb-96">
            <LoadingLine />
            <LoadingLine />
            <LoadingLine />
            <LoadingLine />
            <LoadingLine />
            <LoadingLine />
        </div>
    )
}

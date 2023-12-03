export default function LoadingLine({ className }: { className?: string }) {
    return <div className={`w-full h-8 bg-gray-200 rounded-lg animate-pulse ${className || ""}`}></div>
}

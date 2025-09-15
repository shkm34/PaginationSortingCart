
function LoadingBox({ message }: { message: string }) {
    return (
        <div className="rounded-xl bg-white/60 border border-dashed border-gray-200 p-12 text-center text-white shadow-sm">
            <div className="animate-pulse text-lg">{message}</div>
        </div>
    )
}

export default LoadingBox

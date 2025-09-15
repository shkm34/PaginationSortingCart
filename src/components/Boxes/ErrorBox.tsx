
function ErrorBox({ title, message }: { title: string, message?: string }) {
    return (
        <div className="rounded-xl bg-red-50 border border-red-100 p-6 text-center text-red-700">
            <strong className="block mb-1">{title}</strong>
            <div className="text-sm">{message ?? "Unknown error"}</div>
        </div>
    )
}

export default ErrorBox

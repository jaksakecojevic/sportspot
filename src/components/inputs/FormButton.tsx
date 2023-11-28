type ButtonProps = {
    onClick?: () => void
    disabled?: boolean
    children?: React.ReactNode
}
export default function FormButton(props: ButtonProps) {
    return (
        <button onClick={props.onClick} disabled={props.disabled} className="bg-primary h-10 flex justify-center items-center w-full rounded-lg text-white font-semibold hover:bg-primaryDarker transition-colors disabled:cursor-default disabled:grayscale active:brightness-90">
            {props.children}
        </button>
    )
}

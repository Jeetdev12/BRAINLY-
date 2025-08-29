
interface ButtonProps{
placeholder:string ,
reference:any,
className?:string,
type?:string,
autoComplete?:string,
}


export function Input({ reference, placeholder,className,type ,autoComplete}:ButtonProps) {
    return (
        <div>
            <input autoComplete={autoComplete} ref={reference} type={type} className={`px-4 py-2 border rounded m-1 ${className} `}  placeholder={placeholder}>
            </input>
        </div>
    )
}
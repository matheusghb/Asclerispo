
function Input({
    title = "",
    placeholder = "",
    type = "text",
    id = "",
    value = "",
    onChange
}) {
    return (
        <div className="inputdiv">
            <h1>{title}</h1>

            <input
                type={type}
                placeholder={placeholder}
                id={id}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default Input

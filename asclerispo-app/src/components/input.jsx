function Input({title = "", placeholder = "", type="text", id=""},) {

    return(

        <div className="inputdiv">

            <h1>{title}</h1>
            <input type={type} placeholder={placeholder} id={id}/>
        
        </div>

    )

}

export default Input
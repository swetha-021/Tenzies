export default function Die(props){
    return (
        <button 
            className={props.isHeld? "held": ""}
            onClick={()=>props.handleClick(props.id)}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value} ${props.isHeld? "held":"not held"}`}
        >{props.number}</button>
    )
}
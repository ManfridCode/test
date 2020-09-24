import React,{useState,useRef,useEffect} from 'react'
import './MROThelper.scss'

export default ()=>{

    const target = useRef(null);

    const [hover, setHover] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const invertOpen =(e:React.MouseEvent<HTMLElement>)=>{
        e.preventDefault();
        if(open) setHover(false);
        setOpen(!open);

    };

    return (
        <button
            ref={target}
            onClick={invertOpen}
            onMouseEnter = {()=>setHover(true)}
            onMouseLeave = {()=>setHover(false)}
            className = {open?'helper-btn open':'helper-btn'}
        >
            {open?'✖':'i'}
            <div className={open||hover?"helper__tooltip open":"helper__tooltip"}>
                МРОТ - минимальный размер оплаты труда. Разный для разных регионов.
            </div>
        </button>
    )
}
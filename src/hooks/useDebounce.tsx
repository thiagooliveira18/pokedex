import { useRef } from "react";

export default function useDebounce (fn: Function, delay: number){
    const timoutRef = useRef<any>(null);
    
    function debounceFunc(...args: any) {
        window.clearTimeout(timoutRef.current);
        timoutRef.current = window.setTimeout(()=>{
            fn(...args);
        }, delay)
    }

    return debounceFunc;
}
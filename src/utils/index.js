import { useRef } from "react";

export function useFocus() {
    const focusRef = useRef(null);
    const setFocus = () => focusRef.current && focusRef.current.focus();

    return [focusRef, setFocus];
}
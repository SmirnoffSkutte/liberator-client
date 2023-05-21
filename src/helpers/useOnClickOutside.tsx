import {RefObject, useEffect } from "react";

export default function useOnClickOutside(ref:RefObject<HTMLDialogElement>, handler:Function) {
    useEffect(
      () => {
        if(ref!==null){
            const listener = (event:MouseEvent) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target as Node)) {
                  return;
                } else {
                    handler(event);
                }
            };
            document.addEventListener("click", listener);
            return () => {
                document.addEventListener("click", listener);
            };
        }
      },
      [ref, handler]
    );
  }
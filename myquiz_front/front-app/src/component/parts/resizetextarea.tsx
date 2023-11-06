import { TextareaHTMLAttributes, useRef } from "react";
import { useEffect } from "react";
import { UseFormRegisterReturn } from "react-hook-form"

//react-hook-formと併用するときは、idを設定する
interface AutoResizeTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    register?: UseFormRegisterReturn;
}

const AutoResizeTextArea: React.FC<AutoResizeTextAreaProps> = (props) => {

    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const adjustTextAreaHeight = () => {
        if (!props.register) {
            if (textAreaRef.current) {
                textAreaRef.current.style.height = "auto";
                textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
            }
       } else {
        if ( props.id ) {
            const ele : HTMLTextAreaElement = document.getElementById(props.id) as HTMLTextAreaElement;
            ele.style.height = "auto";
            ele.style.height = ele.scrollHeight+"px";
        }
       }
    };

    useEffect(() => {
        adjustTextAreaHeight();
    }, [props.value])

    const onChange = (e: any) => {
        adjustTextAreaHeight();
        if (props.onChange) {
            props.onChange(e);
        }
    }

    const regiOnChange = props.register?.onChange;

    if (props.register) {
        props.register.onChange = async (e) => {
            onChange(e);
            if (regiOnChange) regiOnChange(e);
        }
    }

    return (
        <textarea {...props} onChange={onChange} style={{ overflowY: "hidden" }} {...props.register}></textarea>
    )
}

export default AutoResizeTextArea;
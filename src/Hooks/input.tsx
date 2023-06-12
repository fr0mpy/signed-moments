import TextField, { BaseTextFieldProps } from "@mui/material/TextField";
import React, { useState } from "react";


export const useInput = (type: BaseTextFieldProps['type'], label: string) => {
    const [input, setInput] = useState<string>('');

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setInput(e.target.value);

    const InputComponent = <TextField type={type} label={label} variant="standard" onChange={handleChange} />;

    return [
        input,
        InputComponent
    ] as const;
}
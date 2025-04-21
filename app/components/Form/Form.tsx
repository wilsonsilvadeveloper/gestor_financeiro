"use client";
import React, { useState } from "react";
import Field from "@/app/interfaces/interfaceForm";

interface AdaptiveFormProps {
    fields: Field[];
    styleFormContainer?: string;
    styleButtonSubmit?: string;
    onSubmit: (formData: Record<string, string | number | boolean>) => void;
    buttonText?: string;
    buttonChildren?: React.ReactNode;
}
export default function Form({ fields, onSubmit, buttonChildren, buttonText = "Enviar", styleFormContainer, styleButtonSubmit} : AdaptiveFormProps) {

    const [formData, setFormData] = useState<Record<string, string | number | boolean>>(
        fields.reduce((acc, field) => ({...acc, [field.name]: ""}), {})
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <form onSubmit={handleSubmit} className={styleFormContainer}>
            {fields.map((fields) => (
                <div key={fields.name} className={fields.className}>
                    {fields.label && (
                        <label className={fields.classNameLabel}>{fields.label}</label>
                    )}
                    {fields.type === "textarea" ? (
                        <textarea
                            name={fields.name}
                            value={formData[fields.name]?.toString() || ""}
                            onChange={handleChange}
                            placeholder={fields.placeholder}
                            required={fields.required}
                            className={fields.className}
                        />
                    ) : fields.type === "select" && fields.options ? (
                        <select name={fields.name} required={fields.required} onChange={handleChange} className={fields.classNameSelect}>
                            <option disabled value="">Selecione</option>
                            {fields.options.map((option)=> (
                                <option className={option.className} key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={fields.type}
                            name={fields.name}
                            placeholder={fields.placeholder}
                            required={fields.required}
                            value={formData[fields.name]?.toString() ?? ''}
                            onChange={(e)=> {
                                if(fields.onChange) {
                                    const newValue = fields.onChange(e);
                                    if(newValue !== undefined){
                                        setFormData({...formData, [e.target.name]: newValue})
                                    }
                                } else {
                                    handleChange(e)
                                }
                            }}
                            className={fields.classNameInput}                        
                        />
                    )}
                </div>
            ))}
            <button type="submit" className={styleButtonSubmit}>
                {buttonChildren ? buttonChildren : buttonText}
            </button>
        </form>
    )
}
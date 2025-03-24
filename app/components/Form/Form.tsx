"use client";
import React, { useState } from "react";
import Field from "@/app/interfaces/interfaceForm";

interface AdaptiveFormProps {
    fields: Field[];
    styleFormContainer?: string;
    styleButtonSubmit?: string;
    onSubmit: (formData: Record<string, string | number>) => void;
    buttonText?: string;
}

export default function Form({ fields, onSubmit, buttonText = "Enviar", styleFormContainer, styleButtonSubmit} : AdaptiveFormProps) {

    const [formData, setFormData] = useState<Record<string, string | number>>(
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
                    <label className="font-medium">{fields.label}</label>
                    {fields.type === "textarea" ? (
                        <textarea
                            name={fields.name}
                            value={formData[fields.name]}
                            onChange={handleChange}
                            placeholder={fields.placeholder}
                            required={fields.required}
                            className={fields.className}
                        />
                    ) : fields.type === "select" && fields.options ? (
                        <select name={fields.name} required={fields.required} onChange={handleChange} className={fields.className}>
                            <option value="">Selecione</option>
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
                            onChange={handleChange}
                            className={fields.className}                        
                        />
                    )}
                </div>
            ))}
            <button type="submit" className={styleButtonSubmit}>
                {buttonText}
            </button>
        </form>
    )
}
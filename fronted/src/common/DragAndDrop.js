import './DragNDrop.css';
import { form, control } from 'react-validation';
import React, { useRef, useState, useEffect } from 'react';

// Define own Form component
// const Form = ({ getValues, validate, validateAll, showError, hideError, children, ...props }) => (
//     <form {...props}>{children}</form>
// );

// Define own Input component
const Input = ({ error, isChanged, isUsed, ...props }) => (
    <div>
        <input {...props} />
        {isChanged && isUsed && error}
    </div>
);

// Now call HOCs on components
// const MyValidationForm = form(Form);
const MyValidationInput = control(Input);

function DropzoneAreaMi({ type, formlabel, value, onChange, validations, setFile, file }) {
    const fileInputRef = useRef();
    const dropzoneRef = useRef();

    useEffect(() => {
        if (file) {
            setFile(file);
        }
    }, [file]);

    const onFileChange = (e) => {
        // if (e.target.files.length) {
        //     setFile(e.target.files[0]);
        // }
    };

    const onDragOver = (e) => {
        e.preventDefault();
        dropzoneRef.current.classList.add('dropzone--over');
    };

    const onDragLeave = (e) => {
        dropzoneRef.current.classList.remove('dropzone--over');
    };

    const onDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
            fileInputRef.current.files = e.dataTransfer.files;
            onChange({ target: { files: e.dataTransfer.files } });
            setFile(e.dataTransfer.files[0]);
        }
        dropzoneRef.current.classList.remove('dropzone--over');
    };

    return (
        <div className="dropzone-area" ref={dropzoneRef} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
            <div className="file-upload-icon">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cloud-upload" width="24"
                    height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                    <path d="M9 15l3 -3l3 3" />
                    <path d="M12 12l0 9" />
                </svg>
            </div>
            {/* <MyValidationInput type={type} required id="upload-file" name="uploaded-file"  ref={fileInputRef} onChange={onFileChange} validations={validations} /> */}
            {/* <MyValidationInput type={type} required id="upload-file" name="uploaded-file"  ref={value} onChange={(e) => setFile(e.target.files[0])} validations={validations} /> */}
            <MyValidationInput type={type} required id="upload-file" name="uploaded-file" ref={fileInputRef} onChange={(e) => onFileChange(e.target.files[0])}  validations={validations} />
            {/* <p className="file-info">{fileInfo}</p> */}
            <p class="file-info">No Files Selected</p>
        </div>
    );
}

export default DropzoneAreaMi;
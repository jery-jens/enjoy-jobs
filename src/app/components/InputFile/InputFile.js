import React, { useState, useEffect } from 'react';

import './InputFile.scss';
import download from '../../assets/icons/download.svg';
import deleteIcon from '../../assets/icons/delete.svg';

import { useAPI } from '../../services';

const InputFile = (props) => {
    const [ fileNameTags, setFileNameTags ] = useState([]);
    const [ uploadedFiles, setUploadedFiles ] = useState(0);
    const [ fileIdToDelete, setFileIdToDelete ] = useState(undefined);

    const { deleteList, currentUser, downloadFile } = useAPI();

    useEffect(() => {
        if (props.backoffice) {
            if (props.defaultFiles) {
                const names = props.defaultFiles.map((file, index) => createFileNameTag(file.name, index, file.id));
                setFileNameTags(names);
            };
        };

        if (fileIdToDelete) {
            const filteredTags = fileNameTags.filter((file) => file.props.id !== fileIdToDelete);
            setFileNameTags(filteredTags);
            setFileIdToDelete(undefined);
        };
        // eslint-disable-next-line
    }, [fileIdToDelete, props]);

    const onClick = (e) => {
        e.preventDefault();
        const input = document.getElementById(props.id);
        input.click();

        input.onchange = () => {
            if (props.backoffice) {
                props.uploadFile(input.files[0]);
            } else {
                addFileNames(input.files);
            };
        };
    };

    const dragOver = (e) => {
        e.preventDefault();
    };

    const dragEnter = (e) => {
        e.preventDefault();
    };

    const dragLeave = (e) => {
        e.preventDefault();
    };
    
    const addFileNames = (files) => {
        // save fileNames
        const newFileNameTags = Object.values(files).map((file, index) => createFileNameTag(file.name, uploadedFiles+index));
        setFileNameTags([...fileNameTags, ...newFileNameTags]);
        setUploadedFiles(uploadedFiles+1);
    };

    const fileDrop = (e) => {
        e.preventDefault();

        const files = e.dataTransfer.files;
        const input = document.getElementById(props.id);
        // put files in input element
        if (props.backoffice) {
            props.uploadFile(files[0]);
        } else {
            input.files = files;
            addFileNames(files);
        };
    };

    const deleteFileNameTag = async (e, fileId) => {
        if (props.backoffice) {
            await deleteList("upload", currentUser, fileId);
            window.location.reload();
        } else {
            const id = e.target.parentElement.id;
            setFileIdToDelete(id);
    
            const fileName = id.split('-')[0];
    
            const newFileList = new DataTransfer();
            const input = document.getElementById(props.id);
    
            Object.values(input.files).forEach((file) => {
                if (file.name !== fileName) {
                    newFileList.items.add(file);
                };
            });
    
            input.files = newFileList.files;
        };
    };

    const downloadItem = async (id) => {
        await downloadFile(currentUser, id);
    };

    const createFileNameTag = (fileName, index, id) => {
        return !props.backoffice ? (
            <div className="file-tag" key={`${fileName}-${index}`} id={`${fileName}-${index}`}>
                {fileName}
                <img alt="icon-delete" className="file-tags__delete" src={deleteIcon}  onClick={(e) => deleteFileNameTag(e)}/>
            </div>
        ) : (
            <div className="file-tag" key={`${fileName}-${index}`} id={`${fileName}-${index}`}>
                <span onClick={() => downloadItem(id)}>{fileName}</span>
                <img alt="icon-delete" className="file-tags__delete" src={deleteIcon} onClick={(e) => deleteFileNameTag(e, id)}/>
            </div>
        )
    };

    return (
        <div className="input-file">
            <input 
                type="file" 
                style={{display:'none'}} 
                id={props.id}
                multiple
                onBlur={fileDrop}
            />
            <div className="input-file__uploaded">
                {
                    fileNameTags
                }
            </div>
            <div 
                className="input-file__dropzone"
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={fileDrop}
            >
                <p>{props.label}</p>
                <div className="input-file-dropzone__button" onClick={onClick}>
                    <p>UPLOAD</p>
                    <img alt="icon" src={download}/>
                </div>
            </div>
        </div>
    )
}

export default InputFile;
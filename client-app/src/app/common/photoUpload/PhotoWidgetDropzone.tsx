import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Icon, Header } from 'semantic-ui-react'


interface IProps {
    setFiles: (files: object[]) => void;
}

const dropzoneStyles = {
    marginTop: '20px',
    border: "dashed 2px",
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#eee',
    borderRadius: '10px',
    textAlign: 'center' as 'center',
    height: '200px',
    width: '200px'
}

const dropzoneActive = {
    borderColor: 'green'
}

const PhotoWidgetDropzone: React.FC<IProps> = ({setFiles}) => {
  const onDrop = useCallback(acceptedFiles => {
    
    setFiles(acceptedFiles.map((file: object) => Object.assign(file, {
        preview: URL.createObjectURL(file)
    })))

}, [setFiles]);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} style={isDragActive ? {...dropzoneStyles, ...dropzoneActive} : dropzoneStyles}>
      <input {...getInputProps()} />
      <Icon name='upload' size='big'/>
      <Header content="Drag & Drop"></Header>
    </div>
  )
}

export default PhotoWidgetDropzone;
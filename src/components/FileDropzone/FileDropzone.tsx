import React, { useEffect, useState } from 'react';
import IFileDropzoneProps, { IFile } from './IFileDropzoneProps';
import IFileDropzoneState from './IFileDropzoneState';
import { useStateCallback } from '../../hooks';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button
} from 'reactstrap';
import Dropzone from 'react-dropzone';
import { FcUpload, FcDownload } from 'react-icons/fc';
import { MdDeleteForever } from 'react-icons/md';
import { bufferToBlob, downloadFile, isNull, pseudoId } from '../../helper';
import styles from './FileDropzone.module.scss';

interface IFileExtended extends File {
  [x: string]: any;
  arrayBuffer: () => Promise<ArrayBuffer>;
}

function FileDropzone(props: IFileDropzoneProps): JSX.Element {
  const [state, setState] = useStateCallback<IFileDropzoneState>({
    files: []
  });

  useEffect(() => {
    if (props.isOpen) {
      setState({ files: props.value.sort((a, b) => a.name.localeCompare(b.name)) });
    }
  }, [props.isOpen, props.value]);

  const onDrop = (files: IFileExtended[]) => {
    Promise.all(files.map((file, i) => {
      return file.arrayBuffer().then((buffer): IFile => {
        return {
          id: pseudoId(state.files),
          name: file.name,
          buffer: buffer,
          comment: ''
        };
      });
    })).then((droppedFiles) =>
      setState({ files: [...state.files, ...droppedFiles].sort((a, b) => a.name.localeCompare(b.name)) })
    );
  }

  return (
    <Modal className={styles.fileDropzone} isOpen={props.isOpen}>
      <ModalHeader>Anhänge</ModalHeader>
      <ModalBody>
        <Dropzone
          onDrop={(files) => onDrop(files as any as IFileExtended[])}
          noDragEventsBubbling={true}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div {...getRootProps()} className={[styles.dropzone, isDragActive ? styles.dropzoneActiveDrag : undefined].filter(x => !isNull(x)).join(' ')} tabIndex={0}>
              <input {...getInputProps()} multiple={true} />
              <FcUpload />
            </div>
          )}
        </Dropzone>
        {
          state.files.map((file, i) => (
            <div key={i} className={styles.row} style={{ marginTop: '5px' }}>
              <span>{file.name}</span>
              <Input
                type='textarea'
                placeholder='Kommentar:'
                value={file.comment}
                onChange={(e) => {
                  file.comment = e.target.value;
                  setState({ files: [ ...state.files.filter((x) => x.id !== file.id), file ] });
                }}
              />
              <FcDownload
                onClick={() => downloadFile(bufferToBlob(file.buffer), file.name)}
                style={{ fontSize: '25px' }}
              />
              <MdDeleteForever
                onClick={() => setState({ files: state.files.filter((x) => x.id !== file.id) })}
                style={{ fontSize: '25px' }}
              />
            </div>
          ))
        }
      </ModalBody>
      <ModalFooter>
        <Button color='danger' onClick={props.onClose}>Abbrechen</Button>
        <Button color='success' onClick={() => props.onChange(state.files)}>Speichern</Button>
      </ModalFooter>
    </Modal>
  );
}

export default FileDropzone;

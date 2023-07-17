export default interface IFileDropzoneProps {
  isOpen: boolean;
  value: IFile[];
  onChange: (files: IFile[]) => void;
  onClose: () => void;
}

export interface IFile {
  id: number;
  name: string;
  buffer: ArrayBuffer;
  comment: string;
}

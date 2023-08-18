declare interface Window {
  showOpenFilePicker(options?: OpenFilePickerOptions): Promise<FileSystemFileHandle[]>;
}

interface OpenFilePickerOptions {
  multiple?: boolean;
}

interface FileSystemFileHandle {
  getFile(): Promise<File>;
}

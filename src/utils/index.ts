/**
 * 打开文件系统上传文件
 * @returns
 */
export const openFileUpload = () => {
  return new Promise<any>((resolve) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', () => {
      // @ts-ignore
      const selectedFile = fileInput.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = function (event: any) {
          resolve(event.target?.result);
        };
        reader.readAsText(selectedFile);
      }
      document.body.removeChild(fileInput);
    });

    document.body.appendChild(fileInput);
    fileInput.click();
  });
};

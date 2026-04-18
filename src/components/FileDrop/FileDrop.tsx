import { useRef, useState } from "react";
import styles from "./FileDrop.module.css";

type FileDropProps = {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  onFilesSelect: (files: File[]) => void;
  title?: string;
  subtitle?: string;
};

export function FileDrop({
  accept,
  multiple = false,
  disabled = false,
  onFilesSelect,
  title = "Arraste arquivos aqui",
  subtitle = "ou clique para selecionar",
}: FileDropProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function openFilePicker() {
    if (disabled) return;
    inputRef.current?.click();
  }

  function handleFiles(files: FileList | null) {
    if (!files || disabled) return;

    const fileArray = Array.from(files);

    if (!multiple && fileArray.length > 1) {
      onFilesSelect([fileArray[0]]);
      return;
    }

    onFilesSelect(fileArray);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    handleFiles(event.target.files);

    event.target.value = "";
  }

  function handleDragEnter(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (disabled) return;
    setIsDragging(true);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (disabled) return;
    event.dataTransfer.dropEffect = "copy";
    setIsDragging(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (disabled) return;
    setIsDragging(false);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (disabled) return;

    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (disabled) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFilePicker();
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        className={styles.input}
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        disabled={disabled}
      />

      <div
        className={[
          styles.dropzone,
          isDragging ? styles.dragging : "",
          disabled ? styles.disabled : "",
        ].join(" ")}
        onClick={openFilePicker}
        onKeyDown={handleKeyDown}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
      >
        <h4 className={styles.title}>{title}</h4>
        <span className={styles.subtitle}>{subtitle}</span>
      </div>
    </>
  );
}
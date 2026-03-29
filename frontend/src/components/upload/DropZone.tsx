import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface DropZoneProps {
  onFileSelected: (file: File) => void;
  isLoading?: boolean;
}

export default function DropZone({ onFileSelected, isLoading }: DropZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelected(acceptedFiles[0]);
      }
    },
    [onFileSelected]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: isLoading,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        {...getRootProps()}
        className={`
          relative overflow-hidden rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer
          transition-all duration-300 group
          ${isDragActive ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border hover:border-primary/40 hover:bg-surface/50'}
          ${isDragReject ? 'border-danger bg-danger/5' : ''}
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {/* Gradient background blob */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300 ${isDragActive ? 'bg-primary/20' : 'bg-surface border border-border group-hover:border-primary/30'}`}>
            {isDragActive ? (
              <FileText className="w-8 h-8 text-primary" />
            ) : (
              <Upload className="w-8 h-8 text-text-secondary group-hover:text-primary transition-colors" />
            )}
          </div>

          <div>
            <p className="text-lg font-medium text-text-primary mb-1">
              {isDragActive ? 'Drop your document here' : 'Drop your document here or click to browse'}
            </p>
            <p className="text-sm text-text-secondary">
              Supports PDF, DOCX, and TXT files up to 10MB
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

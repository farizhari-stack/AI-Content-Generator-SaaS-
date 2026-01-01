"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone"; // Need to install this
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface ImageUploadProps {
    onImageSelected: (file: File) => void;
    isGenerating?: boolean;
}

export function ImageUpload({ onImageSelected, isGenerating = false }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            onImageSelected(file);
        }
    }, [onImageSelected]);

    const removeImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".webp"],
        },
        maxFiles: 1,
        disabled: isGenerating,
    });

    return (
        <div className="w-full max-w-xl mx-auto">
            <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                <div
                    {...getRootProps()}
                    className={cn(
                        "relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-muted-foreground/25 bg-muted/5 transition-all duration-300 hover:border-primary/50 hover:bg-muted/10",
                        isDragActive && "border-primary bg-primary/5 ring-2 ring-primary/20",
                        preview && "border-transparent p-0",
                        isGenerating && "pointer-events-none opacity-80"
                    )}
                >
                    <input {...getInputProps()} />

                    <AnimatePresence mode="wait">
                        {preview ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="relative aspect-video w-full h-64 sm:h-80 bg-neutral-900 rounded-2xl overflow-hidden flex items-center justify-center p-2"
                            >
                                <img
                                    src={preview}
                                    alt="Upload preview"
                                    className="h-full w-full object-contain rounded-lg"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    {!isGenerating && (
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={removeImage}
                                            className="rounded-full h-12 w-12"
                                        >
                                            <X className="h-6 w-6" />
                                        </Button>
                                    )}
                                </div>
                                {isGenerating && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                                        <div className="flex flex-col items-center gap-3 text-white">
                                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                                            <p className="font-medium animate-pulse">Vision AI analyzing...</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center"
                            >
                                <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                                    <Upload className="h-10 w-10" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg text-foreground">
                                        {isDragActive ? "Drop image here" : "Upload Product Image"}
                                    </h3>
                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                                        Drag & drop or click to browse. Supports JPG, PNG, WEBP.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}

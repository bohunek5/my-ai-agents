"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
    images: string[];
    currentIndex: number;
    onClose: () => void;
    altPrefix?: string;
}

export default function ImageLightbox({ images, currentIndex, onClose, altPrefix = "Image" }: ImageLightboxProps) {
    const [index, setIndex] = useState(currentIndex);

    useEffect(() => {
        setIndex(currentIndex);
    }, [currentIndex]);

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") setIndex((prev) => (prev - 1 + images.length) % images.length);
            if (e.key === "ArrowRight") setIndex((prev) => (prev + 1) % images.length);
        };

        window.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [images.length, onClose]);

    return (
        <div
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 text-white hover:text-amber-400 transition-colors p-2"
                aria-label="Close lightbox"
            >
                <X size={32} />
            </button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePrev();
                        }}
                        className="absolute left-4 z-50 text-white hover:text-amber-400 transition-colors p-2"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={48} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                        }}
                        className="absolute right-4 z-50 text-white hover:text-amber-400 transition-colors p-2"
                        aria-label="Next image"
                    >
                        <ChevronRight size={48} />
                    </button>
                </>
            )}

            {/* Image Container */}
            <div
                className="relative w-[90vw] h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={images[index]}
                    alt={`${altPrefix} ${index + 1}`}
                    fill
                    className="object-contain"
                    quality={100}
                    priority
                />
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                    {index + 1} / {images.length}
                </div>
            )}
        </div>
    );
}

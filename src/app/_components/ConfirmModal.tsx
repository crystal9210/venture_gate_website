"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink } from "react-icons/fi";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    linkUrl: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    linkUrl,
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    aria-modal="true"
                    role="dialog"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 35,
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {title}
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full -mr-2"
                                    aria-label="閉じる"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                関連ページを新しいタブで開きますか？
                            </p>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 break-all">
                                <a
                                    href={linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline hover:text-orange-600 transition-colors flex items-center gap-2"
                                >
                                    <FiExternalLink className="flex-shrink-0" />
                                    <span className="truncate">{linkUrl}</span>
                                </a>
                            </div>
                        </div>

                        {/* Footer / Actions */}
                        <div className="bg-gray-50 px-6 py-4 flex justify-end items-center gap-4">
                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                            >
                                キャンセル
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center gap-2 shadow-md"
                            >
                                <FiExternalLink />
                                はい、移動する
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal;

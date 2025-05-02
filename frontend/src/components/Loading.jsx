import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            />
        </motion.div>
    );
};

export default Loading;

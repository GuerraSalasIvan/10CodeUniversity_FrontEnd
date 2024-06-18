// components/Pagination.js
import React from 'react';

export default function Pagination({ currentPage, setCurrentPage, totalPages }) {
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-center my-4 items-center">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`border px-3 py-1 rounded-md ${
                    currentPage === 1 ? 'bg-primary-200 text-white' : 'bg-primary-500 text-white'
                }`}
            >
                &laquo; Previous
            </button>
            <span className="mx-2">Page {currentPage} of {totalPages}</span>
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`border px-3 py-1 rounded-md ${
                    currentPage === totalPages ? 'bg-primary-200 text-white' : 'bg-primary-500 text-white'
                }`}
            >
                Next &raquo;
            </button>
        </div>
    );
}

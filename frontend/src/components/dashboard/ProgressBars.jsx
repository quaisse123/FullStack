import React from 'react';

const ProgressBars = () => {
    return (
        <>
        <div className="col-span-1 md:col-span-2 bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800">Membership Growth</h2>
            <div className="mt-2">
                <div className="text-sm text-gray-600">Current Year</div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-blue-600 h-4 rounded-full" style={{ width: '75%' }}></div>
                </div>
            </div>
            <div className="mt-4">
                <div className="text-sm text-gray-600">Last Year</div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-green-600 h-4 rounded-full" style={{ width: '60%' }}></div>
                </div>
            </div>
        </div>
        </>
    );
};

export default ProgressBars;
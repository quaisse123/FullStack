import React from 'react';

const Notifications = () => {
    return (
        <>
            <div className="col-span-1 bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
                <ul className="mt-2 space-y-2">
                    <li className="text-sm text-gray-700">
                    <span className="font-bold">John Doe</span> has renewed their membership.
                    </li>
                    <li className="text-sm text-gray-700">
                    <span className="font-bold">Jane Smith</span> submitted a new application.
                    </li>
                    <li className="text-sm text-gray-700">
                    <span className="font-bold">Club Meeting</span> scheduled for next week.
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Notifications;
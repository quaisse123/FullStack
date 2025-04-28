import React from 'react';

const Events = () => {
    return (
        <>
            <div className="col-span-1 md:col-span-2 bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
                <ul className="mt-2 space-y-2">
                    <li className="text-sm text-gray-700">
                    <span className="font-bold">Annual Gala</span> - March 25th, 2023
                    </li>
                    <li className="text-sm text-gray-700">
                    <span className="font-bold">Volunteer Day</span> - April 10th, 2023
                    </li>
                    <li className="text-sm text-gray-700">
                    <span className="font-bold">Sports Tournament</span> - May 5th, 2023
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Events;
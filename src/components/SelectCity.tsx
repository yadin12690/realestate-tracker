'use client'

import React, { use, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getCities from '@/api/getCitiesListData';
import getKomoApartments from '@/api/scrape/getKomoApartemnentList';


const SelectCity = () => {
    const [selectedCity, setSelectedCity] = useState('');

    const { data, isLoading, isError } = useQuery({
        queryFn: async () => await getCities(),
        queryKey: ["cities"],
    });

    const { data: apartmentsData, isLoading: apartmentsIsLoading, isError: apartmentsIsError } = useQuery({
        queryFn: async () => await getKomoApartments(selectedCity),
        enabled: !!selectedCity,
        queryKey: ["komoapartments"],
    });

    useEffect(() => {
        console.log(selectedCity);
    }, [selectedCity]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading cities</div>;

    return (
        <div className="w-full max-w-xs rtl:p-0">
            <label htmlFor="beautifulSelect" className="block text-lg font-medium text-gray-700 mb-2 rtl:pr-4">
                בחרו עיר על מנת שנתחיל
            </label>
            <div className="relative">
                <select
                    onChange={(e) => setSelectedCity(e.target.value)}
                    value={selectedCity}
                    id="beautifulSelect"
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">בחרו עיר</option>
                    {data && data.record.map((city: { id: string; name: string }) => (
                        <option key={city.name} value={city.name} >
                            {city.name}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SelectCity;
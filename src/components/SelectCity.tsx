'use client'

import React, { use, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getCities from '@/api/getCitiesListData';
import getKomoApartments from '@/api/scrape/getKomoApartemnentList';
import { LoadingWheel } from './LoadingWheel';


const SelectCity = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const [extractedPrices, setExtractedPrices] = useState<number[]>([]);

    const { data, isLoading, isError } = useQuery({
        queryFn: async () => await getCities(),
        queryKey: ["cities"],
    });

    const { data: apartmentsData, isLoading: apartmentsIsLoading, isError: apartmentsIsError } = useQuery({
        queryFn: async () => await getKomoApartments(selectedCity),
        enabled: !!selectedCity,
        queryKey: ["komoapartments"],
    });

    const extractPrices = (text: string): number[] => {
        const pricePattern = /(\d{1,3}(?:,\d{3})*)\s*₪/g;;
        const matches = text.match(pricePattern);

        if (matches) {
            return matches.map(price => parseInt(price.replace(/[,₪]/g, ''), 10));
        }

        return [];
    };

    useEffect(() => {
        if (apartmentsData && apartmentsData.markdown) {
            const prices = extractPrices(apartmentsData.markdown);
            setExtractedPrices(prices);
        }
    }, [apartmentsData]);


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

            {/* apprtment for sale section */}
            {apartmentsIsLoading && <div className='flex justify-center flex-row'>
                <p className='text-fuchsia-400'>טוען דירות למכירה</p>
                <LoadingWheel />
            </div>}
            <div className="extracted-prices mt-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Extracted Prices:</h3>
                <ul className="list-disc pl-5">
                    {extractedPrices && extractedPrices.map((price, index) => (
                        <li key={index} className="text-gray-600">
                            {price.toLocaleString('he-IL', { style: 'currency', currency: 'ILS' })}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SelectCity;
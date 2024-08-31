import { Cities } from "./types/cities";

async function getData(): Promise<Cities> {

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

    const options = { method: "GET", headers: { "Content-Type": "application/json", "X-Master-Key": "$2a$10$4qRBiwSV9ahPHzZx3DAEHOpEGSMBHeGleI2I8IMhLmvHEk3rr1bk." } };

    const response = await fetch(
        `${apiEndpoint}`,
        options
    )
        .then((response) => response.json())
        .catch((err) => console.error(err));

    return response;
}

export default async function getCities() {
    const data = await getData();
    return data;
}
import { Cities } from "./types/cities";

async function getData(): Promise<Cities> {

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

    const options = { method: "GET" };

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
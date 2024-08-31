
async function getData(selectedCity: string): Promise<any> {

    const apiEndpoint = process.env.NEXT_PUBLIC_KOMO_APRT_SALE_BY_CITY + selectedCity;

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
        }
    };

    const response = await fetch(
        `${apiEndpoint}`,
        options
    )
        .then((response) => response.json())
        .catch((err) => console.error(err));

    return response;
}

export default async function getKomoApartments(selectedCity: string) {
    const data = await getData(selectedCity);
    return data;
}
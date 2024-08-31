import FirecrawlApp, { CrawlParams, CrawlStatusResponse, MapResponse, ScrapeResponse } from '@mendable/firecrawl-js';

const app = new FirecrawlApp({ apiKey: process.env.NEXT_PUBLIC_FIEWCRAWLAPP });

async function getData(selectedCity: string): Promise<any> {

    // Scrape a website
    const scrapeResult = await app.scrapeUrl(process.env.NEXT_PUBLIC_KOMO_APRT_SALE_BY_CITY + selectedCity, { formats: ['markdown', 'html'] }) as ScrapeResponse;


    if (scrapeResult) {
        console.log(scrapeResult)
    }

    // Crawl a website

    // const crawlResponse = await app.crawlUrl('https://firecrawl.dev', {
    //     limit: 100,
    //     scrapeOptions: {
    //         formats: ['markdown', 'html'],
    //     }
    // })

    return scrapeResult
}

export default async function getKomoApartments(selectedCity: string) {
    const data = await getData(selectedCity);
    return data;
}
export type Cities = {
    [x: string]: any;
    cities: City[];
}


export type City = {
    num: number,
    name: string,
    alternateName: string,
    counter: number
}
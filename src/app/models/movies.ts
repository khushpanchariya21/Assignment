export interface Movies {
    count:number
    next:string
    previous:string
    results:result[]
}
export interface result{
    title: string
    description:string
    genres: string
    uuid: string
}

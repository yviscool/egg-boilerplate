enum Order {
    ASC = 'ASC',
    DESC = 'DESC',
}


export class PageRequest {
    page?: number;
    size?: number;
    sort?: string;
    order?: string;
}

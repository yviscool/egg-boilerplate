const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 10;
const MAX_PAGE_SIZE = 1000;

enum Order {
    ASC = 'ASC',
    DESC = 'DESC',
}

export const toPage = (pageRequest) => {

    let { page = DEFAULT_PAGE, size = DEFAULT_SIZE  } = pageRequest || {};

    if (page < 0) {
        page = 0;
    }

    if (size > MAX_PAGE_SIZE) {
        size = MAX_PAGE_SIZE;
    }

    return {
        page: Number.parseInt(page, 10),
        size: Number.parseInt(size, 10),
        take: size,
        skip: page * size,
    };
};
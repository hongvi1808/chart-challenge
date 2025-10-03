export const forceToInfoPagition = (
    page: number = 1,
    limit: number = 20,
): { skip: number; take: number; page: number } => {
    page = +(page);
    limit = +(limit);
    const skip = (page -1)*limit;
    const take = (limit > -1 && limit < 100) ? limit : 100;

    return { skip, take, page };
};

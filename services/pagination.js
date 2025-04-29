// Pagination service
const paginate = (query) => {
    const page = parseInt(query.page, 10) || 1; // Default to page 1
    const pageSize = parseInt(query.pageSize, 10) || 10; // Default to 10 items per page
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    return {skip, limit};
};

module.exports = paginate;
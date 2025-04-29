// Filtering and sorting service
const buildQuery = (query) => {
    const filter = {};
    const sort = {};

    // Filtering
    if (query.name) {
        filter.name = {$regex: query.name, $options: 'i'}; // Case-insensitive search
    }
    if (query.category) {
        filter.category = query.category;
    }
    if (query.status) {
        filter.status = query.status;
    }
    if (query.minPrice || query.maxPrice) {
        filter.price = {};
        if (query.minPrice) filter.price.$gte = parseFloat(query.minPrice);
        if (query.maxPrice) filter.price.$lte = parseFloat(query.maxPrice);
    }

    // Sorting
    if (query.sortBy) {
        const sortFields = query.sortBy.split(',');
        sortFields.forEach((field) => {
            const order = field.startsWith('-') ? -1 : 1;
            const fieldName = field.replace(/^-/, '');
            sort[fieldName] = order;
        });
    }

    return {filter, sort};
};

module.exports = buildQuery;
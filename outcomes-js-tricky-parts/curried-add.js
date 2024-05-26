function curriedAdd(total = 0) {
    return function(nextValue) {
        if (nextValue === undefined) return total;
        return curriedAdd(total + nextValue);
    };
};

module.exports = { curriedAdd };

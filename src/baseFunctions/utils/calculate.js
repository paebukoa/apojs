module.exports = async d => {
    let [expression] = d.function.parameters;

    if(expression.replaceAll(" ", "") !== expression.replace(/[^-()\d/*+.]/g, '')) return new d.error("invalid", d, 'expression', expression);

    return eval(expression.replace(/[^-()\d/*+.]/g, ''));
};
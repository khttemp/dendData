function safeHtml(strings, ...values) {
    const escapeHtml = (str) => {
        if (str === null || str === undefined) return '';
        if (str.__isSafeHtml) return str.toString(); 
        
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };

    const resultString = strings.reduce((result, string, i) => {
        let value = values[i];

        if (Array.isArray(value)) {
            value = value.map(v => v.__isSafeHtml ? v.toString() : escapeHtml(v)).join("");
            return result + string + value;
        }

        return result + string + escapeHtml(value);
    }, '');

    return {
        toString() { return resultString; },
        __isSafeHtml: true
    };
}
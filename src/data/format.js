import moment from 'moment';

function number(num) {
    if (num === null || num === undefined) {
        return 'unknown';
    }

    return num.toLocaleString();
}

function timestamp(ts, format) {
    return moment(ts).format(format);
}

export default {
    number,
    timestamp,
};
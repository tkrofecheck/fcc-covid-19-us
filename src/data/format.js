import moment from 'moment';

function number(num) {
    if (num === null || num === undefined) {
        return 'unknown';
    }

    return num.toLocaleString();
}

function timestamp(ts) {
    return moment(ts).format('LLLL');
}

export default {
    number,
    timestamp,
};
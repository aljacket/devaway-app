import { zeroFill } from "@/utils/numbers";

export function toTimestamp(time) {
    const splitTime = time.split(':');
    const milliseconds = time.split('.');

    return new Date(0,0,0, splitTime[0], splitTime[1], splitTime[2]).setMilliseconds(milliseconds[1]);
}

export function stampToHours (datestamp) {
    const hour = zeroFill(new Date(datestamp).getHours(), 2);
    const minutes = zeroFill(new Date(datestamp).getMinutes(), 2);
    const seconds = zeroFill(new Date(datestamp).getSeconds(), 2);
    const milliseconds = new Date(datestamp).getMilliseconds();

    return `${hour}:${minutes}:${seconds}.${milliseconds}`;
}
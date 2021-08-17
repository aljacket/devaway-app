import { zeroFill } from "@/utils/numbers";

export function stampToHours (datestamp) {
    const hour = zeroFill(new Date(datestamp).getHours(), 2);
    const minutes = zeroFill(new Date(datestamp).getMinutes(), 2);
    const seconds = zeroFill(new Date(datestamp).getSeconds(), 2);
    const milliseconds = new Date(datestamp).getMilliseconds();

    return `${hour}:${minutes}:${seconds}.${milliseconds}`;
}
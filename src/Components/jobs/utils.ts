import { roles } from "../filters/filtersData";

export const currencySymbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: '$',
    CAD: '$',
    CHF: 'Fr',
    CNY: '¥',
    SEK: 'kr',
    NZD: '$',
};

export const rolesLabel = roles.reduce((acc: { [key: string]: {} }, role) => {
    if(role.value){
        acc[role.value] = { label: role.label, value: role.value };
    }

    return acc;
}, {});
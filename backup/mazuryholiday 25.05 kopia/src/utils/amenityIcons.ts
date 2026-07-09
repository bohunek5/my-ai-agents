export function getAmenityIcon(amenity: string): string {
    const normalized = amenity.toLowerCase();

    // Default icon
    let icon = 'ROOM.svg';

    // Kitchen
    if (normalized.includes('lodów') || normalized.includes('lodowk') || normalized.includes('chłodziarka')) icon = 'FRIDGE.svg';
    else if (normalized.includes('zmywark')) icon = 'WASHING_MACHINE.svg';
    else if (normalized.includes('mikrofal') || normalized.includes('kuchenka mikrofal')) icon = 'TOASTER.svg';
    else if (normalized.includes('płyta') || normalized.includes('plyta') || normalized.includes('kuchenka')) icon = 'CUTLERY.svg';
    else if (normalized.includes('ekspres') || normalized.includes('zestaw startowy') || normalized.includes('kaw') || normalized.includes('herbat')) icon = 'COFFEE.svg';
    else if (normalized.includes('czajnik')) icon = 'HOT_TEA.svg';
    else if (normalized.includes('toster')) icon = 'TOASTER.svg';
    else if (normalized.includes('naczyn') || normalized.includes('sztuć') || normalized.includes('sztucce')) icon = 'CUTLERY.svg';
    else if (normalized.includes('kuchnia') || normalized.includes('aneks')) icon = 'CUTLERY.svg';

    // Living Room
    else if (normalized.includes('klimatyzac')) icon = 'AIR_CONDITIONER.svg';
    else if (normalized.includes('sofa') || normalized.includes('kanapa') || normalized.includes('fotel') || normalized.includes('puf')) icon = 'SOFA.svg';
    else if (normalized.includes('tv') || normalized.includes('telewizor') || normalized.includes('smart tv')) icon = 'TV.svg';
    else if (normalized.includes('wi-fi') || normalized.includes('wifi')) icon = 'WIFI.svg';
    else if (normalized.includes('stół') || normalized.includes('stol') || normalized.includes('krzesł')) icon = 'ROOM.svg'; 
    else if (normalized.includes('kominek')) icon = 'FIREPLACE.svg';
    else if (normalized.includes('odkurzacz')) icon = 'CLEANING_STAFF.svg';
    else if (normalized.includes('żelazko') || normalized.includes('zelazko') || normalized.includes('prasowan')) icon = 'IRON.svg';

    // Bedroom
    else if (normalized.includes('łóżko') || normalized.includes('lozko')) icon = 'BED.svg';
    else if (normalized.includes('pościel') || normalized.includes('posciel')) icon = 'PILLOWS.svg';
    else if (normalized.includes('szafa') || normalized.includes('komoda')) icon = 'LUGGAGE.svg';
    else if (normalized.includes('sypialnia')) icon = 'ROOM.svg';
    else if (normalized.includes('suszarka na ubrania') || normalized.includes('suszarka do ubrań')) icon = 'HANGER.svg';

    // Bathroom
    else if (normalized.includes('prysznic') || normalized.includes('prysnic')) icon = 'SHOWER.svg';
    else if (normalized.includes('wanna')) icon = 'BATHTUB.svg';
    else if (normalized.includes('pralka')) icon = 'WASHING_MACHINE.svg';
    else if (normalized.includes('suszarka do włos') || normalized.includes('prostownica')) icon = 'HAIR_DRYER.svg';
    else if (normalized.includes('ręcznik') || normalized.includes('recznik')) icon = 'TOWEL.svg';
    else if (normalized.includes('mydło') || normalized.includes('szampon') || normalized.includes('kosmetyk') || normalized.includes('żel') || normalized.includes('balsam')) icon = 'SOAP.svg';
    else if (normalized.includes('szlafrok')) icon = 'BATHROBE.svg';

    // Terrace / Outdoor / Location
    else if (normalized.includes('jacuzzi')) icon = 'SPA.svg';
    else if (normalized.includes('sauna')) icon = 'SPA.svg';
    else if (normalized.includes('taras') || normalized.includes('balkon')) icon = 'TERRACE.svg';
    else if (normalized.includes('wyjście') || normalized.includes('wyjscie')) icon = 'DOOR_HANDLE.svg';
    else if (normalized.includes('meble') || normalized.includes('leżak')) icon = 'SUNBED.svg';
    else if (normalized.includes('widok') || normalized.includes('port')) icon = 'LOCATION.svg';
    else if (normalized.includes('grill') || normalized.includes('ognisko')) icon = 'BAR.svg'; 
    else if (normalized.includes('posesja')) icon = 'HOTEL_SIGN.svg';

    // General
    else if (normalized.includes('parking')) icon = 'PARKING.svg';
    else if (normalized.includes('ogrzewanie')) icon = 'AIR_CONDITIONER.svg';
    else if (normalized.includes('osób') || normalized.includes('osob')) icon = 'BED.svg';
    else if (normalized.includes('stery') || normalized.includes('strumieniow')) icon = 'THRUSTERS.svg';

    return `/icons/${icon}`;
}

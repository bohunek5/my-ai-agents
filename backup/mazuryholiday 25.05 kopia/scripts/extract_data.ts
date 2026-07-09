import { strandaApartments } from '../src/data/stranda-apartments';
import { kisajnoApartments } from '../src/data/kisajno-apartments';
import { fuledaApartments } from '../src/data/fuleda-apartments';

console.log("# Udogodnienia - Strona (Mazury Holiday)\n");

function printAmenities(name: string, apartments: any[]) {
    console.log(`\n## --- ${name} ---`);
    for (const apt of apartments) {
        console.log(`\n### ${apt.title} (ID: ${apt.id} | IdoBooking: ${apt.idoBookingId || 'Brak'})`);
        console.log(`**Premium:** ${apt.premiumAmenities?.join(', ') || 'Brak'}`);
        console.log(`**Standard:** ${apt.amenities?.join(', ') || 'Brak'}`);
    }
}

printAmenities("STRANDA", strandaApartments);
printAmenities("KISAJNO", kisajnoApartments);
printAmenities("FULEDA", fuledaApartments);

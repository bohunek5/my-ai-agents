const { strandaApartments } = require('./src/data/stranda-apartments.js');
let errors = 0;
for (const [id, apt] of Object.entries(strandaApartments)) {
    if (!apt.gallery || !Array.isArray(apt.gallery.images)) {
        console.error(`Error in stranda ${id}: gallery.images is not an array`);
        errors++;
    }
}
console.log(`Stranda errors: ${errors}`);

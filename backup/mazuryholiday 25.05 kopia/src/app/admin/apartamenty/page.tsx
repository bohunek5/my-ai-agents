import { ApartmentsEditor } from "./ApartmentsEditor";
import { strandaApartments } from "@/data/stranda-apartments";
import { fuledaApartments } from "@/data/fuleda-data";
import { kisajnoData } from "@/data/kisajno-data";
import { pokojeFuledaData } from "@/data/pokoje-fuleda-data";
import { skorupkiData } from "@/data/skorupki-data";

export default function AdminApartamentyPage() {
    return (
        <ApartmentsEditor
            initialStranda={strandaApartments}
            initialFuleda={fuledaApartments}
            initialKisajno={kisajnoData}
            initialPokoje={pokojeFuledaData}
            initialSkorupki={skorupkiData}
        />
    );
}

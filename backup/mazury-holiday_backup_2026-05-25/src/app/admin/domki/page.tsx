import { skorupkiData } from "@/data/skorupki-data";
import { CottagesEditor } from "./CottagesEditor";

export default function AdminDomkiPage() {
    return <CottagesEditor initialData={skorupkiData} />;
}

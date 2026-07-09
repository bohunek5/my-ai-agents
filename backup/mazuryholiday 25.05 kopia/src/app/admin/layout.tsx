import { AdminGate } from "@/components/admin/AdminGate";

export default async function AdminLayout({
    children
}: Readonly<{ children: React.ReactNode }>) {
    return <AdminGate>{children}</AdminGate>;
}

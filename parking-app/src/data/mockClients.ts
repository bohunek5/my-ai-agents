export interface Client {
    id: number;
    name: string;
    email: string;
    vehicle: string;
    plate: string;
    lastPurchase: string;
    product: string;
    status: 'active' | 'inactive' | 'expired';
}

export const mockClients: Client[] = [
    {
        id: 1,
        name: "TechBud Sp. z o.o.",
        email: "biuro@techbud.pl",
        vehicle: "Mercedes Sprinter",
        plate: "WA 98234",
        lastPurchase: "2025-10-03",
        product: "Betoniarka X5",
        status: 'active'
    },
    {
        id: 2,
        name: "Piekarnia Jan Kowalski",
        email: "piekarnia@kowalski.pl",
        vehicle: "Fiat Ducato",
        plate: "WB 77123",
        lastPurchase: "2026-01-21",
        product: "Mąka Żytnia 50kg",
        status: 'active'
    },
    {
        id: 3,
        name: "Auto-Serwis Max",
        email: "max@serwis.com",
        vehicle: "Toyota Hilux",
        plate: "WJ 44556",
        lastPurchase: "2025-09-03",
        product: "Olej Silnikowy 5L",
        status: 'inactive'
    },
    {
        id: 4,
        name: "Hotel Blue",
        email: "recepcja@hotelblue.pl",
        vehicle: "Volkswagen Crafter",
        plate: "KR 55992",
        lastPurchase: "2026-01-26",
        product: "Ręczniki Hotelowe",
        status: 'active'
    },
    {
        id: 5,
        name: "Eko-Warzywa",
        email: "kontakt@ekowarzywa.pl",
        vehicle: "Renault Master",
        plate: "LU 11223",
        lastPurchase: "2025-07-15",
        product: "Nawóz Bio",
        status: 'expired'
    }
];

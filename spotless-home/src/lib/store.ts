import { create } from 'zustand';

export type PropertyType = 'Apartament' | 'Dom' | 'Biuro';

export interface ExtraService {
    id: string;
    name: string;
    price: number;
    icon: string;
}

export interface BookingState {
    step: number;
    scope: {
        propertyType: PropertyType;
        rooms: number;
        bathrooms: number;
    };
    extras: string[];
    details: {
        date: Date | undefined;
        timeSlot: string;
        address: string;
        email: string;
        phone: string;
    };

    nextStep: () => void;
    prevStep: () => void;
    setStep: (step: number) => void;
    setPropertyType: (type: PropertyType) => void;
    setRooms: (count: number) => void;
    setBathrooms: (count: number) => void;
    toggleExtra: (id: string) => void;
    setDetails: (details: Partial<BookingState['details']>) => void;

    calculateTotal: () => number;
}

const EXTRAS: ExtraService[] = [
    { id: 'oven', name: 'Piekarnik', price: 80, icon: '🍳' },
    { id: 'windows', name: 'Mycie Okien', price: 150, icon: '🪟' },
    { id: 'fridge', name: 'Lodówka', price: 60, icon: '🧊' },
    { id: 'deep', name: 'Głębokie Sprzątanie', price: 200, icon: '✨' },
    { id: 'cabinets', name: 'Wnętrza Szafek', price: 100, icon: '🚪' },
    { id: 'pets', name: 'Sierść Zwierząt', price: 50, icon: '🐾' },
];

export const useBookingStore = create<BookingState>((set, get) => ({
    step: 1,
    scope: {
        propertyType: 'Apartament',
        rooms: 1,
        bathrooms: 1,
    },
    extras: [],
    details: {
        date: undefined,
        timeSlot: '',
        address: '',
        email: '',
        phone: '',
    },

    nextStep: () => set((state) => ({ step: state.step + 1 })),
    prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
    setStep: (step) => set({ step }),

    setPropertyType: (propertyType) => set((state) => ({
        scope: { ...state.scope, propertyType }
    })),

    setRooms: (rooms) => set((state) => ({
        scope: { ...state.scope, rooms }
    })),

    setBathrooms: (bathrooms) => set((state) => ({
        scope: { ...state.scope, bathrooms }
    })),

    toggleExtra: (id) => set((state) => ({
        extras: state.extras.includes(id)
            ? state.extras.filter((e) => e !== id)
            : [...state.extras, id],
    })),

    setDetails: (newDetails) => set((state) => ({
        details: { ...state.details, ...newDetails }
    })),

    calculateTotal: () => {
        const { scope, extras } = get();
        let total = 200; // Cena bazowa

        if (scope.propertyType === 'Dom') total += 150;
        if (scope.propertyType === 'Biuro') total += 200;

        total += (scope.rooms - 1) * 50;
        total += (scope.bathrooms - 1) * 40;

        extras.forEach((extraId) => {
            const extra = EXTRAS.find((e) => e.id === extraId);
            if (extra) total += extra.price;
        });

        return total;
    },
}));

export { EXTRAS };

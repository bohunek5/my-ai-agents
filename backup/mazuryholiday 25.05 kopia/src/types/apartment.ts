export type ApartmentAmenities = {
    living: string[];
    kitchen: string[];
    bedroom: string[];
    bathroom: string[];
    terrace: string[];
};

export type ApartmentGallery = {
    heroImage: string;
    images: string[];
};

export type Apartment = {
    id: string;
    building: string;
    type: string;
    price: number;
    guests: string;
    description: string;
    amenities: ApartmentAmenities;
    additionalInfo: string[];
    idoBookingId?: string;
    icalUrl?: string;
    gallery: ApartmentGallery;
};

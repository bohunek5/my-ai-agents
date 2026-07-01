export interface ScooterSpec {
  key: string;
  maxSpeed: string;
  horsepower: string;
  capacity: string;
  length: string;
  weight: string;
  description: string;
  gallery: string[];
  mainImage: string;
}

export const scootersData: Record<string, ScooterSpec> = {
  vx110_1: {
    key: 'vx110_1',
    maxSpeed: '85 km/h',
    horsepower: '110 KM',
    capacity: '3 osoby',
    length: '3.22 m',
    weight: '334 kg',
    description: 'Skuter wodny Yamaha VX110 Cruiser to doskonały sprzęt zarówno dla początkujących, jak i zaawansowanych motorowodniaków. Posiada niezawodny, oszczędny silnik czterosuwowy oraz 3-osobowe siodło. Gwarantuje bezpieczeństwo i świetną zabawę na jeziorach.',
    mainImage: '/assets/20210211_181101.jpg',
    gallery: [
      '/assets/20210211_181101.jpg',
      '/assets/20210211_181212.jpg',
      '/assets/20190805_200721-scaled.jpg',
      '/assets/20200611_205511-scaled.jpg'
    ]
  },
  vx110_2: {
    key: 'vx110_2',
    maxSpeed: '85 km/h',
    horsepower: '110 KM',
    capacity: '3 osoby',
    length: '3.22 m',
    weight: '334 kg',
    description: 'Bliźniaczy model Yamahy VX 110KM. Doskonały do wycieczek z przyjaciółmi dzięki 3-osobowej kanapie i intuicyjnemu sterowaniu. Stabilny na fali, zapewnia pełen komfort pływania.',
    mainImage: '/assets/vx4.jpg',
    gallery: [
      '/assets/vx4.jpg',
      '/assets/IMG-20190819-WA0005.jpg',
      '/assets/IMG-20200920-WA0004-1024x768.jpg',
      '/assets/20200611_211053-scaled.jpg'
    ]
  },
  honda: {
    key: 'honda',
    maxSpeed: '90 km/h',
    horsepower: '165 KM',
    capacity: '3 osoby',
    length: '3.20 m',
    weight: '360 kg',
    description: 'Skuter wodny Honda Aquatrax o dużej mocy (165 KM), stworzony z myślą o miłośnikach większych prędkości i agresywniejszego pływania. Doskonałe wyważenie, sportowy charakter i komfortowe fotele to jego główne atuty.',
    mainImage: '/assets/1-1024x719.jpg',
    gallery: [
      '/assets/1-1024x719.jpg',
      '/assets/20240528_122225-scaled.jpg',
      '/assets/20240528_122529-scaled.jpg'
    ]
  },
  vx180: {
    key: 'vx180',
    maxSpeed: '105 km/h',
    horsepower: '180 KM',
    capacity: '3 osoby',
    length: '3.35 m',
    weight: '348 kg',
    description: 'Yamaha VX ze wzmocnionym silnikiem 180 KM. Bezkompromisowe przyspieszenie, precyzyjne sterowanie i niesamowite wrażenia na wodzie. To sprzęt dla wymagających poszukiwaczy adrenaliny, którzy chcą poczuć wiatr we włosach.',
    mainImage: '/assets/IMG-20200809-WA0018.jpg',
    gallery: [
      '/assets/IMG-20200809-WA0018.jpg',
      '/assets/20240601_182330-scaled.jpg',
      '/assets/20240601_182339-scaled.jpg',
      '/assets/20240601_182359-scaled.jpg'
    ]
  },
  activ505: {
    key: 'activ505',
    maxSpeed: '60 km/h',
    horsepower: '100 KM',
    capacity: '5 osób',
    length: '5.07 m',
    weight: '582 kg',
    description: 'Motorówka Quicksilver Activ 505 Open łączy w sobie nowoczesny design, ergonomię i funkcjonalność. Na pokład bez problemu zabierzesz nawet 5 osób. Posiada obszerny pokład słoneczny na dziobie – idealny do letniego relaksu. Wymagane uprawnienia motorowodne.',
    mainImage: '/assets/q1.jpg',
    gallery: [
      '/assets/q1.jpg',
      '/assets/20240601_185516-scaled.jpg',
      '/assets/20240630_105901-scaled.jpg'
    ]
  },
  quick675: {
    key: 'quick675',
    maxSpeed: '75 km/h',
    horsepower: '150 KM',
    capacity: '7 osób',
    length: '6.75 m',
    weight: '1084 kg',
    description: 'Flagowy model Quicksilver 675 to potężna łódź z silnikiem o mocy 150 KM. Komfortowa kanapa, obszerna kabina i pokład na 7 osób sprawiają, że to najlepszy wybór na rejsowanie po Szlaku Wielkich Jezior Mazurskich. Poczuj luksus i swobodę.',
    mainImage: '/assets/q2.jpg',
    gallery: [
      '/assets/q2.jpg',
      '/assets/20240705_150810-scaled.jpg',
      '/assets/slid2-scaled.jpg'
    ]
  }
};

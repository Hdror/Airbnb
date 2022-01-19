// Tempting to use Atlas airbnb test db?
// https://docs.atlas.mongodb.com/sample-data/sample-airbnb/
// Need to be mapped to simpler model

// const stays = [{}, {}] // LOCAL DB

// State: stay (crudl) , trip.

// AIRBNB_DB
// Collections :
// 1.stay
// 2.order
// 3.user


const db = {
  // STAY JSON
  stay: [
    {
      _id: '10006546', // MONGO
      name: 'Ribeira Charming Duplex',
      type: 'House', // Cabin / Hotel / Boutique hotel / Apartment / Guesthouse (shared) / Townhouse / Loft / Bungalow /
      // Guest suite / Villa / Boat
      imgUrls: [
        'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
        'otherImg.jpg',
      ],
      price: 80.0,
      summary:
        'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
      capacity: 8,
      faciilites: { beds: 4, bedrooms: 2, bathrooms: 2 },
      accessibility: {
        stepFreeEntrance: true,
        accessibleParkingSpot: true,
        wideDoorsEntrances: true,
        grabBars: false,
      },
      amenities: [
        'TV',
        'Cable TV',
        'Wifi',
        'Kitchen',
        'Paid parking off premises',
        'Smoking allowed',
        'Pets allowed',
        'Buzzer/wireless intercom',
        'Heating',
        'Family/kid friendly',
        'Washer',
        'First aid kit',
        'Fire extinguisher',
        'Essentials',
        'Hangers',
        'Hair dryer',
        'Iron',
        'Room-darkening shades',
        'Hot water',
        'Bed linens',
        'Extra pillows and blankets',
        'Microwave',
        'Coffee maker',
        'Refrigerator',
        'Dishwasher',
        'Dishes and silverware',
        'Cooking basics',
        'Oven',
        'Stove',
        'Cleaning before checkout',
        'Waterfront',
      ],
      host: {
        // MINI USER
        _id: '51399391', // MONGO
        fullname: 'Davit Pok',
        imgUrl:
          'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
      },
      loc: {
        country: 'Portugal',
        countryCode: 'PT',
        address: 'Porto, Portugal',
        lat: -8.61308,
        lng: 41.1413,
      },
      reviews: [
        {
          id: 'madeId', // MAKE OUR OWN ID
          txt: 'Very helpful hosts. Cooked traditional...',
          rate: 4,
          by: {
            // MINI USER
            _id: 'u102', // MONGO
            fullname: 'user2',
            imgUrl: '/img/img2.jpg',
          },
        },
      ],
      likedByUsers: ['mini-user'], // FOR USER WISHLIST : USE $in
    },
  ],

  // ORDER JSON
  order: [
    {
      _id: 'o1225', // MONGO
      hostId: 'u102',
      createdAt: 9898989,
      buyer: { // MINI USER
        _id: 'u101', // MONGO USER ID
        fullname: 'James Harden',
      },
      totalPrice: 160,
      startDate: '2025/10/15',
      endDate: '2025/10/17',
      guests: {
        adults: 2,
        kids: 1,
      },
      stay: {
        _id: 'h102', // MONGO
        name: 'House Of Uncle My',
        price: 80.0,
      },
      status: 'pending',
    },
  ],

  //  USER JSON
  user: [
    {
      _id: 'u101', // MONGO
      fullname: 'James Harden',
      imgUrl: '/img/img1.jpg',
      isAdmin: false,
      username: 'user1',
      password: 'secret',
    },
    {
      _id: 'u102', // MONGO
      fullname: 'Steph Curry',
      imgUrl: '/img/img2.jpg',
      isAdmin: false,
      username: 'user2',
      password: 'secret',
    },
  ],
}

// PAGES 
// -----
// StayDetails
// ExplorePage (Preview + List)
// HomePage 
// BackOffice ()
// UserDetails
// BecomeHostPage
// WhishListPage
// Notifications (msgs feom host)
// Trips (user can see his orders)

// COMPONENETS
// -----
// AppHeader
// AppFooter
// AppFilter (Filter modal , filter bar)
// AppSearch
// LoginSignup (Modal)
// StayPreview
// StayList
// AddStay
// AddReview
// AddOrder
// ReviewPreview
// ReviewLisst
// StayMap
// OrderList
// Dynamic Recommanded stays (4 cards preview)


// AGG WHEN WE WANT TO PULL MORE THEN ONE VALUE FROM 2 DIFFERENT COLLECTIONS
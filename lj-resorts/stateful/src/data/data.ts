export type Room = {
  roomId: string;
  roomType: string;
  roomDescription: string;
  date: string;
  cost: string;
};
export type Rooms = Room[];

export type GolfSession = {
  sessionId: string;
  sessionType: string;
  sessionDescription: string;
  date: string;
  cost: string;
};
export type GolfSessions = GolfSession[];

export type SpaTreatment = {
  treatmentId: string;
  treatmentType: string;
  treatmentDescription: string;
  date: string;
  cost: string;
};
export type SpaTreatments = SpaTreatment[];

export const golfSessions: GolfSessions = [
  {
    sessionId: '1',
    sessionType: 'Morning Tee Time',
    sessionDescription:
      'Enjoy a round of golf in the morning with stunning views.',
    date: '2024-02-25',
    cost: '$80',
  },
  {
    sessionId: '2',
    sessionType: 'Afternoon Tee Time',
    sessionDescription:
      'Play a round of golf in the afternoon under the clear sky.',
    date: '2024-02-25',
    cost: '$70',
  },
  {
    sessionId: '3',
    sessionType: 'Twilight Tee Time',
    sessionDescription:
      'Experience a relaxing round of golf in the evening as the sun sets.',
    date: '2024-02-25',
    cost: '$60',
  },
  {
    sessionId: '4',
    sessionType: 'Early Bird Tee Time',
    sessionDescription:
      'Start your day with a refreshing round of golf at dawn.',
    date: '2024-02-25',
    cost: '$90',
  },
  {
    sessionId: '5',
    sessionType: 'Weekend Special Tee Time',
    sessionDescription: 'Take advantage of our special weekend golf offer.',
    date: '2024-02-25',
    cost: '$100',
  },
  {
    sessionId: '6',
    sessionType: 'Senior Tee Time',
    sessionDescription: 'Seniors can enjoy discounted rates for golf sessions.',
    date: '2024-02-25',
    cost: '$50',
  },
  {
    sessionId: '7',
    sessionType: 'Family Tee Time',
    sessionDescription: 'Golf session suitable for families to enjoy together.',
    date: '2024-02-25',
    cost: '$120',
  },
  {
    sessionId: '8',
    sessionType: "Beginner's Lesson",
    sessionDescription: 'Perfect for beginners to learn the basics of golf.',
    date: '2024-02-25',
    cost: '$40',
  },
  {
    sessionId: '9',
    sessionType: 'Driving Range Session',
    sessionDescription:
      'Practice your swing at our well-equipped driving range.',
    date: '2024-02-25',
    cost: '$30',
  },
  {
    sessionId: '10',
    sessionType: 'Putting Clinic',
    sessionDescription:
      'Improve your putting skills with our expert instructors.',
    date: '2024-02-25',
    cost: '$50',
  },
];

export const rooms: Rooms = [
  {
    roomId: '101',
    roomType: 'Standard',
    roomDescription: 'Cozy standard room with a queen-sized bed.',
    date: '2024-02-25',
    cost: '$100',
  },
  {
    roomId: '102',
    roomType: 'Standard',
    roomDescription: 'Spacious standard room with two double beds.',
    date: '2024-02-25',
    cost: '$100',
  },
  {
    roomId: '103',
    roomType: 'Deluxe',
    roomDescription: 'Luxurious deluxe room with a king-sized bed and a view.',
    date: '2024-02-25',
    cost: '$150',
  },
  {
    roomId: '104',
    roomType: 'Suite',
    roomDescription: 'Elegant suite with a separate living area and bedroom.',
    date: '2024-02-25',
    cost: '$200',
  },
  {
    roomId: '105',
    roomType: 'Standard',
    roomDescription: 'Comfortable standard room with a twin bed.',
    date: '2024-02-25',
    cost: '$90',
  },
  {
    roomId: '106',
    roomType: 'Deluxe',
    roomDescription: 'Deluxe room with a cozy fireplace and mountain view.',
    date: '2024-02-25',
    cost: '$180',
  },
  {
    roomId: '107',
    roomType: 'Suite',
    roomDescription: 'Luxurious suite with a private balcony and jacuzzi.',
    date: '2024-02-25',
    cost: '$250',
  },
  {
    roomId: '108',
    roomType: 'Standard',
    roomDescription: 'Standard room with a city view and modern amenities.',
    date: '2024-02-25',
    cost: '$110',
  },
  {
    roomId: '109',
    roomType: 'Deluxe',
    roomDescription: 'Spacious deluxe room with a luxurious bathroom.',
    date: '2024-02-25',
    cost: '$160',
  },
  {
    roomId: '110',
    roomType: 'Suite',
    roomDescription: 'Grand suite with a king-sized bed and a private terrace.',
    date: '2024-02-25',
    cost: '$280',
  },
];

export const spaTreatments: SpaTreatments = [
  {
    treatmentId: '1',
    treatmentType: 'Swedish Massage',
    treatmentDescription:
      'Relaxing full-body massage to relieve tension and promote relaxation.',
    date: '2024-02-25',
    cost: '$80',
  },
  {
    treatmentId: '2',
    treatmentType: 'Facial',
    treatmentDescription:
      'Deep cleansing facial to rejuvenate and refresh your skin.',
    date: '2024-02-25',
    cost: '$70',
  },
  {
    treatmentId: '3',
    treatmentType: 'Hot Stone Massage',
    treatmentDescription:
      'Therapeutic massage using heated stones to soothe muscles and improve circulation.',
    date: '2024-02-25',
    cost: '$90',
  },
  {
    treatmentId: '4',
    treatmentType: 'Aromatherapy',
    treatmentDescription:
      'Gentle massage using aromatic essential oils to enhance relaxation and well-being.',
    date: '2024-02-25',
    cost: '$85',
  },
  {
    treatmentId: '5',
    treatmentType: 'Body Scrub',
    treatmentDescription:
      'Exfoliating treatment to remove dead skin cells and leave your skin smooth and radiant.',
    date: '2024-02-25',
    cost: '$75',
  },
  {
    treatmentId: '6',
    treatmentType: 'Pedicure',
    treatmentDescription:
      'Complete foot care treatment to pamper your feet and nails.',
    date: '2024-02-25',
    cost: '$60',
  },
  {
    treatmentId: '7',
    treatmentType: 'Manicure',
    treatmentDescription:
      'Professional nail care treatment to groom and beautify your hands and nails.',
    date: '2024-02-25',
    cost: '$55',
  },
  {
    treatmentId: '8',
    treatmentType: 'Deep Tissue Massage',
    treatmentDescription:
      'Intensive massage targeting deep layers of muscle tissue to relieve chronic pain and tension.',
    date: '2024-02-25',
    cost: '$95',
  },
  {
    treatmentId: '9',
    treatmentType: 'Reflexology',
    treatmentDescription:
      'Ancient healing technique applying pressure to specific points on the feet to promote relaxation and balance.',
    date: '2024-02-25',
    cost: '$65',
  },
  {
    treatmentId: '10',
    treatmentType: 'Couples Massage',
    treatmentDescription:
      'Romantic massage experience for couples to relax and unwind together.',
    date: '2024-02-25',
    cost: '$150',
  },
];

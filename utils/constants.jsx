import { AiOutlineCar, AiOutlineWifi } from 'react-icons/ai';
import { BsQuestionCircleFill, BsSnow, BsStars } from 'react-icons/bs';
import { FaSwimmingPool } from 'react-icons/fa';
import {
  MdOutlineAccessTimeFilled,
  MdOutlineBalcony,
  MdOutlineDryCleaning,
  MdOutlineTv,
  MdSmokeFree,
} from 'react-icons/md';
import { TbBallonOff, TbToolsKitchen2 } from 'react-icons/tb';

export const categories = [
  {
    name: 'National parks',
    icon: 'https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg',
  },
  {
    name: 'Beach',
    icon: 'https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg',
  },
  {
    name: 'Islands',
    icon: 'https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg',
  },
  {
    name: 'Windmills',
    icon: 'https://a0.muscache.com/pictures/5cdb8451-8f75-4c5f-a17d-33ee228e3db8.jpg',
  },
  {
    name: 'Tiny homes',
    icon: 'https://a0.muscache.com/pictures/35919456-df89-4024-ad50-5fcb7a472df9.jpg',
  },
  {
    name: 'OMG!',
    icon: 'https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg',
  },
  {
    name: 'Amazing pools',
    icon: 'https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg',
  },
  {
    name: 'Arctic',
    icon: 'https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg',
  },
  {
    name: 'Design',
    icon: 'https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg',
  },
  {
    name: 'Shared homes',
    icon: 'https://a0.muscache.com/pictures/52c8d856-33d0-445a-a040-a162374de100.jpg',
  },
  {
    name: 'Caves',
    icon: 'https://a0.muscache.com/pictures/4221e293-4770-4ea8-a4fa-9972158d4004.jpg',
  },
  {
    name: 'Amazing views',
    icon: 'https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg',
  },
];

export const placeOffers = [
  { name: 'Air conditioning', icon: <BsSnow /> },
  { name: 'Wifi', icon: <AiOutlineWifi /> },
  { name: 'Shared pool', icon: <FaSwimmingPool /> },
  { name: 'Kitchen', icon: <TbToolsKitchen2 /> },
  {
    name: 'Free parking on premises',
    icon: <AiOutlineCar />,
  },
  { name: '65 TV', icon: <MdOutlineTv /> },
  { name: 'Hangers', icon: <MdOutlineDryCleaning /> },
  { name: 'Patio or balcony', icon: <MdOutlineBalcony /> },
];

export const thingsToKnow = [
  {
    title: 'House rules',
    content: [
      { name: 'Check-in: After 3:00 PM', icon: <MdOutlineAccessTimeFilled /> },
      { name: 'Checkout: 11:00 AM', icon: <MdOutlineAccessTimeFilled /> },
      { name: 'No smoking', icon: <MdSmokeFree /> },
      { name: 'No parties or events', icon: <TbBallonOff /> },
    ],
  },
  {
    title: 'Health & safety',
    content: [
      { name: "Airbnb's COVID-19 safety practices apply", icon: <BsStars /> },
      {
        name: 'Carbon monoxide alarm not reported',
        icon: <BsQuestionCircleFill />,
      },
      { name: 'Smoke alarm not reported', icon: <BsQuestionCircleFill /> },
    ],
  },
  {
    title: 'Cancellation policy',
    content: [
      { name: 'Free cancellation before Oct 22.' },
      {
        name: 'Review the Hosts full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19.',
      },
    ],
  },
];

export const footer = [
  {
    title: 'Support',
    content: [
      'Help Center',
      'AirCover',
      'Safety information',
      'Supporting people with disabilities',
      'Cancellation options',
      'Report a neighborhood concern',
    ],
  },
  {
    title: 'Community',
    content: [
      'Airbnb.org: disaster relief housing',
      'Support Afghan refugees',
      'Combating discrimination',
    ],
  },
  {
    title: 'Hosting',
    content: [
      'Try hosting',
      'AirCover for Hosts',
      'Explore hosting resources',
      'Visit our community forum',
      'How to host responsibly',
    ],
  },
  {
    title: 'Airbnb',
    content: [
      'Newsroom',
      'Learn about new features',
      'Letter from our founders',
      'Careers',
      'Investors',
      'Gift cards',
    ],
  },
];

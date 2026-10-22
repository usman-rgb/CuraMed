import type { NavLink } from '@/types'

export const CLINIC_INFO = {
  name:        'CuraMed',
  tagline:     'Expert & Passionate Healthcare, Right at Your Doorstep',
  doctor:      'Dr. Alex Chen',
  specialty:   'MD — Chief Medical Officer & Specialist',
  phone:       '+1 (234) 567-890',
  email:       'info@CuraMedhospital.com',
  address:     '123 Health Street, City, Country',
  mapUrl:      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.4868372674386!2d67.09127287607392!3d24.91243294171706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f90167c5bbf%3A0x2b2b63caab714549!2sGulshan-e-Iqbal%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1698567890123!5m2!1sen!2s',
  hours: [
    { day: 'Monday – Friday', time: '8:00 AM – 8:00 PM' },
    { day: 'Saturday',        time: '9:00 AM – 5:00 PM' },
    { day: 'Sunday',          time: '10:00 AM – 2:00 PM' },
  ],
} as const

export const NAV_LINKS: NavLink[] = [
  { label: 'Home',         href: '/'            },
  { label: 'About',        href: '/about'       },
  { label: 'Services',     href: '/services'    },
  { label: 'Appointments', href: '/appointment' },
  { label: 'Contact',      href: '/contact'     },
]

export const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
]

export const STATS = [
  { value: '50,000+', label: 'Patients Treated' },
  { value: '150+',    label: 'Certified Doctors' },
  { value: '99.4%',   label: 'Positive Feedback' },
  { value: '24/7',    label: 'Emergency Care'   },
]

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Schedule Online',
    description: 'Book your appointment in minutes.',
    icon: 'calendar-check',
  },
  {
    step: '02',
    title: 'Meet Your Provider',
    description: 'Consult virtually or in person.',
    icon: 'user-check',
  },
  {
    step: '03',
    title: 'Get Personalized Care',
    description: 'Receive tailored treatment & ongoing support.',
    icon: 'activity',
  },
  {
    step: '04',
    title: 'Follow-Up & Support',
    description: 'Continuous care to keep you on track.',
    icon: 'heart-handshake',
  },
]

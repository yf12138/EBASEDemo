// EXPORTS: IContactInfo, MOCK_CONTACT_INFO
export interface IContactInfo {
  id: string
  address: string
  phone: string
  email: string
  businessHours: string
  whatsappNumber: string
}

export const MOCK_CONTACT_INFO: IContactInfo[] = [
  {
    id: '1',
    address: 'G-01, Wisma REN, Jalan Sultan, 50000 Kuala Lumpur, Malaysia',
    phone: '+60 3-2181 8888',
    email: 'hello@rentcm.com',
    businessHours: 'Mon - Sat: 9:00 AM - 6:00 PM',
    whatsappNumber: '60123456789'
  }
]
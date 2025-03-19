import axios from 'axios';

// Type for contact data
export interface ContactData {
  email: string;
  firstname: string;
  lastname: string;
}

// Create a batch of contacts in HubSpot portal 1 through our API route
export const createContactsPortal1 = async (contacts: ContactData[]): Promise<unknown> => {
  try {
    const response = await axios.post('/api/create-contacts', { contacts });
    return response.data;
  } catch (error) {
    console.error('Error creating contacts in portal 1:', error);
    throw error;
  }
};

// Get contacts from HubSpot portal 1
export const getContactsFromPortal1 = async (): Promise<ContactData[]> => {
  try {
    const response = await axios.get<{ contacts: ContactData[] }>('/api/get-contacts');
    return response.data.contacts;
  } catch (error) {
    console.error('Error fetching contacts from portal 1:', error);
    throw error;
  }
};

// Create a batch of contacts in HubSpot portal 2 through our API route
export const createContactsPortal2 = async (contacts: ContactData[]): Promise<unknown> => {
  try {
    const response = await axios.post('/api/create-contacts-portal2', { contacts });
    return response.data;
  } catch (error) {
    console.error('Error creating contacts in portal 2:', error);
    throw error;
  }
};
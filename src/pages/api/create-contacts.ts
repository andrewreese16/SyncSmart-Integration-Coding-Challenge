import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Define the contact data type
interface ContactData {
  email: string;
  firstname: string;
  lastname: string;
}

const HUBSPOT_API_KEY = 'pat-na2-08927b51-adfc-4e26-87b2-b2283cb9898c';
const HUBSPOT_API_URL = 'https://api.hubapi.com';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { contacts } = req.body as { contacts: ContactData[] };

    const response = await axios.post(
      `${HUBSPOT_API_URL}/crm/v3/objects/contacts/batch/create`,
      {
        inputs: contacts.map((contact: ContactData) => ({
          properties: {
            email: contact.email,
            firstname: contact.firstname,
            lastname: contact.lastname
          }
        }))
      },
      {
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data 
        ? JSON.stringify(error.response.data) 
        : error.message;
      console.error('Error creating contacts:', errorMessage);
      return res.status(500).json({ 
        message: 'Error creating contacts', 
        error: errorMessage
      });
    } else {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Error creating contacts:', errorMessage);
      return res.status(500).json({ 
        message: 'Error creating contacts', 
        error: errorMessage
      });
    }
  }
}
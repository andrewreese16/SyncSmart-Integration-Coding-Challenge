import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Second HubSpot portal token
const HUBSPOT_API_KEY_2 = process.env.HUBSPOT_API_KEY_2;; // Replace with your second portal token
const HUBSPOT_API_URL = 'https://api.hubapi.com';

// Define the contact data type
interface ContactData {
  email: string;
  firstname: string;
  lastname: string;
}

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
          'Authorization': `Bearer ${HUBSPOT_API_KEY_2}`,
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
      console.error('Error creating contacts in portal 2:', errorMessage);
      return res.status(500).json({ 
        message: 'Error creating contacts in portal 2', 
        error: errorMessage
      });
    } else {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Error creating contacts in portal 2:', errorMessage);
      return res.status(500).json({ 
        message: 'Error creating contacts in portal 2', 
        error: errorMessage
      });
    }
  }
}
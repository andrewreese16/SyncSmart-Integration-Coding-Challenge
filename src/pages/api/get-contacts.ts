import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// First HubSpot portal token
const HUBSPOT_API_KEY_1 = 'pat-na2-08927b51-adfc-4e26-87b2-b2283cb9898c';
const HUBSPOT_API_URL = 'https://api.hubapi.com';

export interface ContactData {
  email: string;
  firstname: string;
  lastname: string;
}

// Define the HubSpot API response interface
interface HubspotContactsResponse {
  results: Array<{
    id: string;
    properties: {
      email: string;
      firstname: string;
      lastname: string;
      [key: string]: string;
    };
    createdAt?: string;
    updatedAt?: string;
    archived?: boolean;
  }>;
  paging?: {
    next?: {
      after: string;
      link: string;
    };
  };
  total?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get up to 100 contacts from the first portal
    const response = await axios.get<HubspotContactsResponse>(
      `${HUBSPOT_API_URL}/crm/v3/objects/contacts`,
      {
        params: {
          limit: 100,
          properties: ['email', 'firstname', 'lastname']
        },
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY_1}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Transform the response to our ContactData format
    const contacts: ContactData[] = response.data.results.map((result) => ({
      email: result.properties.email,
      firstname: result.properties.firstname,
      lastname: result.properties.lastname
    }));

    return res.status(200).json({ contacts });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data 
        ? JSON.stringify(error.response.data) 
        : error.message;
      console.error('Error fetching contacts:', errorMessage);
      return res.status(500).json({ 
        message: 'Error fetching contacts', 
        error: errorMessage
      });
    } else {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Error fetching contacts:', errorMessage);
      return res.status(500).json({ 
        message: 'Error fetching contacts', 
        error: errorMessage
      });
    }
  }
}
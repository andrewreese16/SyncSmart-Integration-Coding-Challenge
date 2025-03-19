import { useState } from "react";
import { faker } from "@faker-js/faker";
import {
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
  Grid,
  Divider,
} from "@mui/material";
import {
  createContactsPortal1,
  getContactsFromPortal1,
  createContactsPortal2,
  type ContactData,
} from "../utils/hubspot";

export default function GenerateContacts() {
  const [loading, setLoading] = useState(false);
  const [transferLoading, setTransferLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transferError, setTransferError] = useState<string | null>(null);

  const generateFakeContacts = (): ContactData[] => {
    const contacts: ContactData[] = [];

    for (let i = 0; i < 100; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email({ firstName, lastName });

      contacts.push({
        firstname: firstName,
        lastname: lastName,
        email: email,
      });
    }

    return contacts;
  };

  const handleGenerateContacts = async () => {
    setLoading(true);
    setError(null);

    try {
      const contacts = generateFakeContacts();
      await createContactsPortal1(contacts);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTransferContacts = async () => {
    setTransferLoading(true);
    setTransferError(null);

    try {
      // Get contacts from portal 1
      const contacts = await getContactsFromPortal1();

      if (contacts.length === 0) {
        setTransferError("No contacts found in Portal 1");
        setTransferLoading(false);
        return;
      }

      // Create those contacts in portal 2
      await createContactsPortal2(contacts);
      setTransferSuccess(true);
    } catch (err) {
      setTransferError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setTransferLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          HubSpot Contacts Manager
        </Typography>

        <Grid container spacing={4} direction="column">
          <Grid item>
            <Typography variant="h5" component="h2" gutterBottom>
              Generate Contacts
            </Typography>

            <Typography variant="body1" sx={{ mb: 4 }}>
              Click the button below to generate 100 fake contacts in your first
              HubSpot test account.
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleGenerateContacts}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                "Generate 100 Contacts"
              )}
            </Button>

            <Snackbar
              open={success}
              autoHideDuration={6000}
              onClose={() => setSuccess(false)}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                Successfully generated 100 contacts in Portal 1!
              </Alert>
            </Snackbar>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                Error: {error}
              </Alert>
            )}
          </Grid>

          <Grid item>
            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" component="h2" gutterBottom>
              Transfer Contacts
            </Typography>

            <Typography variant="body1" sx={{ mb: 4 }}>
              Click the button below to transfer contacts from your first
              HubSpot test account to your second account.
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleTransferContacts}
              disabled={transferLoading}
            >
              {transferLoading ? (
                <CircularProgress size={24} />
              ) : (
                "Transfer Contacts to Portal 2"
              )}
            </Button>

            <Snackbar
              open={transferSuccess}
              autoHideDuration={6000}
              onClose={() => setTransferSuccess(false)}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                Successfully transferred contacts to Portal 2!
              </Alert>
            </Snackbar>

            {transferError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                Error: {transferError}
              </Alert>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

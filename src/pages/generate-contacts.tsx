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
  Paper,
  Card,
  CardContent,
  CardActions,
  Stack,
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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        py: 6,
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "background.paper",
            mb: 6,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            align="center"
            color="primary"
            sx={{ mb: 4, fontWeight: "bold" }}
          >
            SyncSmart Integration Coding Challenge
          </Typography>

          <Stack spacing={6}>
            <Card
              sx={{
                borderRadius: 2,
                overflow: "visible",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  color="secondary"
                  sx={{ fontWeight: "medium" }}
                >
                  Generate Contacts
                </Typography>

                <Typography variant="body1" sx={{ mb: 3 }}>
                  Click the button below to generate 100 fake contacts in your
                  first HubSpot test account.
                </Typography>

                {error && (
                  <Alert
                    severity="error"
                    sx={{
                      mb: 3,
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                    }}
                  >
                    {error}
                  </Alert>
                )}
              </CardContent>

              <CardActions sx={{ p: 4, pt: 0, justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleGenerateContacts}
                  disabled={loading}
                  sx={{
                    px: 4,
                    py: 1,
                    minWidth: 220,
                    borderRadius: 2,
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Generate 100 Contacts"
                  )}
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                borderRadius: 2,
                overflow: "visible",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  color="secondary"
                  sx={{ fontWeight: "medium" }}
                >
                  Transfer Contacts
                </Typography>

                <Typography variant="body1" sx={{ mb: 3 }}>
                  Click the button below to transfer contacts from your first
                  HubSpot test account to your second account.
                </Typography>

                {transferError && (
                  <Alert
                    severity="error"
                    sx={{
                      mb: 3,
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                    }}
                  >
                    {transferError}
                  </Alert>
                )}
              </CardContent>

              <CardActions sx={{ p: 4, pt: 0, justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleTransferContacts}
                  disabled={transferLoading}
                  sx={{
                    px: 4,
                    py: 1,
                    minWidth: 220,
                    borderRadius: 2,
                  }}
                >
                  {transferLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Transfer Contacts to Portal 2"
                  )}
                </Button>
              </CardActions>
            </Card>
          </Stack>
        </Paper>
      </Container>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Successfully generated 100 contacts in Portal 1!
        </Alert>
      </Snackbar>

      <Snackbar
        open={transferSuccess}
        autoHideDuration={6000}
        onClose={() => setTransferSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Successfully transferred contacts to Portal 2!
        </Alert>
      </Snackbar>
    </Box>
  );
}

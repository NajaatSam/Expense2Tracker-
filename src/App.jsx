import { useState, useEffect } from "react";
import {
  Authenticator,
  Button,
  Text,
  TextField,
  Heading,
  Flex,
  View,
  Divider,
  Badge,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);
const client = generateClient({ authMode: "userPool" });

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sub = client.models.Expense.observeQuery().subscribe({
      next: ({ items }) => {
        setExpenses(items);
        setLoading(false);
      },
    });
    return () => sub.unsubscribe();
  }, []);

  async function createExpense(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name").trim();
    const amount = parseFloat(form.get("amount"));

    if (!name || isNaN(amount) || amount <= 0) return;
    await client.models.Expense.create({ name, amount });
    e.target.reset();
  }

  async function deleteExpense(expense) {
    await client.models.Expense.delete({ id: expense.id });
  }

  const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <View as="main" padding="2rem" backgroundColor="#f9fafb" minHeight="100vh">
          <Flex direction="column" alignItems="center" gap="2rem" maxWidth="900px" margin="0 auto">
            <Heading level={1}>Expense Tracker</Heading>
            <Text color="gray">Welcome, {user?.signInDetails?.loginId}</Text>

            {/* --- Expense Form --- */}
            <View
              as="form"
              onSubmit={createExpense}
              width="100%"
              backgroundColor="white"
              padding="2rem"
              borderRadius="1rem"
              boxShadow="0 2px 6px rgba(0,0,0,0.05)"
            >
              <Heading level={3} marginBottom="1rem">
                Add Expense
              </Heading>

              <Flex direction={{ base: "column", medium: "row" }} gap="1rem">
                <TextField
                  name="name"
                  placeholder="Expense name"
                  variation="quiet"
                  flex="1"
                  required
                />
                <TextField
                  name="amount"
                  placeholder="Amount"
                  type="number"
                  step="0.01"
                  variation="quiet"
                  flex="1"
                  required
                />
                <Button type="submit" variation="primary">
                  Add
                </Button>
              </Flex>
            </View>

            {/* --- Totals --- */}
            <Flex
              backgroundColor="white"
              padding="1rem 2rem"
              borderRadius="0.75rem"
              alignItems="center"
              justifyContent="space-between"
              boxShadow="0 1px 4px rgba(0,0,0,0.05)"
              width="100%"
            >
              <Heading level={4}>Total</Heading>
              <Text fontWeight="700">${total.toFixed(2)}</Text>
            </Flex>

            <Divider />

            {/* --- Expense List --- */}
            <Heading level={3}>Your Expenses</Heading>

            {loading ? (
              <Text>Loading...</Text>
            ) : expenses.length === 0 ? (
              <Text color="gray">No expenses yet. Add one above!</Text>
            ) : (
              <Flex
                wrap="wrap"
                gap="1.5rem"
                justifyContent="center"
                width="100%"
              >
                {expenses.map((expense) => (
                  <View
                    key={expense.id}
                    backgroundColor="white"
                    borderRadius="1rem"
                    padding="1.5rem"
                    width={{ base: "100%", medium: "45%", large: "30%" }}
                    boxShadow="0 2px 8px rgba(0,0,0,0.05)"
                    transition="transform 0.2s ease"
                    _hover={{ transform: "translateY(-3px)" }}
                  >
                    <Flex direction="column" gap="0.5rem">
                      <Heading level={4}>{expense.name}</Heading>
                      <Badge variation="info">${Number(expense.amount).toFixed(2)}</Badge>
                      <Button
                        variation="destructive"
                        size="small"
                        onClick={() => deleteExpense(expense)}
                        marginTop="1rem"
                      >
                        Delete
                      </Button>
                    </Flex>
                  </View>
                ))}
              </Flex>
            )}

            <Divider marginTop="2rem" />
            <Button onClick={signOut} variation="link">
              Sign Out
            </Button>
          </Flex>
        </View>
      )}
    </Authenticator>
  );
}

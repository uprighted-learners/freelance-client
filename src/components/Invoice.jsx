import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Paper, AppBar, Toolbar} from '@mui/material';

function InvoiceForm() {
    const [status, setStatus] = useState('unpaid');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [invoices, setInvoices] = useState([]);
    const [updateId, setUpdateId] = useState(null);

    const API_URL = 'http://localhost:4000/invoices';

    useEffect(() => {
    fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setInvoices(data);
    } catch (err) {
        console.error('Failed to load invoices', err);
    }
};

    const resetForm = () => {
    setStatus('unpaid');
    setDate(new Date().toISOString().slice(0, 10));
    setAmount('');
    setMessage('');
    setUpdateId(null);
    };

    const handleUpdate = (invoice) => {
    setStatus(invoice.status);
    setDate(invoice.date.slice(0, 10));
    setAmount(invoice.amount);
    setMessage(invoice.message || '');
    setUpdateId(invoice._id);
    };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this invoice?')) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Delete failed');
      alert('Invoice deleted');
      fetchInvoices();
    } catch (err) {
        console.error(err);
        alert('Could not delete invoice');
    }
};

    const handleSubmit = async (e) => {
    e.preventDefault();

    const invoiceData = {
        status,
        date: new Date(date),
        amount: parseFloat(amount),
        message,
    };

    try {
        const url = updateId ? `${API_URL}/${updateId}` : `${API_URL}/create`;
        const method = updateId ? 'PUT' : 'POST';

        const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
        });

        if (!response.ok) throw new Error('Error saving invoice');

        const result = await response.json();
        alert(updateId ? 'Invoice Updated' : 'Invoice Created');
        resetForm();
        fetchInvoices();
        console.log(result);
    } catch (err) {
        console.error(err);
        alert(`Error: ${err.message}`);
    }
    };

    return (


    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>

        <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6">Job Sight</Typography>
        </Toolbar>
    </AppBar>


        <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
            {updateId ? 'Edit Invoice' : 'Create Invoice'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
                required
            >
                <MenuItem value="unpaid">Unpaid</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
            </Select>
            </FormControl>

            <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            fullWidth
            slotProps={{
                inputLabel: { shrink: true }
            }}
            />

            <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            fullWidth
            slotProps={{
                input: { step: '0.01', min: '0' },
                inputLabel: { shrink: true }
            }}
        />

        <TextField
            label="Message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            multiline
            rows={3}
        />

        <Button type="submit" variant="contained" color="primary">
            {updateId ? 'Update Invoice' : 'Submit Invoice'}
        </Button>

        {updateId && (
            <Button variant="outlined" color="secondary" onClick={resetForm}>
                Cancel Update
            </Button>
        )}
        </Box>
        </Paper>

        <Box mt={4}>
        <Typography variant="h6" gutterBottom>All Invoices</Typography>
        {invoices.length === 0 ? (
        <Typography>No invoices yet.</Typography>
        ) : (
        <Box component="ul" sx={{ pl: 2 }}>
            {invoices.map((inv) => (
                <li key={inv._id}>
                <Typography>
                <strong>{inv.status}</strong> - ${Number(inv.amount).toFixed(2)} on {inv.date.slice(0, 10)}
                </Typography>
                {inv.message && <Typography variant="body2"><em>{inv.message}</em></Typography>}
                <Box mt={1} mb={2}>
                <Button size="small" onClick={() => handleUpdate(inv)}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDelete(inv._id)}>Delete</Button>
                </Box>
            </li>
            ))}
        </Box>
        )}
    </Box>

        <Box
                    component="footer"
                    sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    textAlign: 'center',
                    py: 2,
                    }}
                >
                <Typography variant="body2" sx={{ mb: 1 }}>
                    Follow us with ❤️: 🐦 Twitter | 📸 Instagram
                </Typography>
                <Typography variant="body2">
                    &copy; {new Date().getFullYear()} Freelance Tracker. All rights reserved.
                </Typography>
                </Box>

</Box>
);
}

export default InvoiceForm;
import React, { useState, useEffect } from 'react'

function InvoiceForm() {

    const [ status, setStatus ] = useState(' ')
    const [ date, setDate] = useState(' ')
    const [ amount, setAmount] = useState(' ')
    const [ message, setMessage ] = useState(' ')
    const [ invoices, setInvoices ] = useState([])
    const [ updateId, setUpdateId ] = useState(null)

    const API_URL = 'http://localhost:4000/invoices'


    useEffect(() => {
        fetchInvoices()
    },[])

    const fetchInvoices = async () => {
        try {
            const res = await fetch(API_URL)
            const data = await res.json()
            setInvoices(data)
        } catch (err) {
            console.error(' Failed to load invoices', err)
        }
    }

    const resetForm = () => {
            setStatus('unpaid')
        setDate(new Date().toISOString().slice(0,10))
        setAmount(' ')
        setMessage(' ')
        setUpdateId(null)
        }

        const handleUpdate = (invoice) => {
        setStatus(invoice.status)
        setDate(invoice.date.slice(0,10))
        setAmount(invoice.amount)
        setMessage(invoice.message || ' ')
        setUpdateId(invoice._id)
        }

        const handleDelete = async (id) => {
            if (!window.confirm('Are you sure you want to delete this invoice?')) return;

            try {
                const response = await fetch(`${API_URL}/${id}`, {method: 'Delete'})
            
            if (!response.ok) throw new Error('Delete Failed')
                alert('Invoice Deleted')
            } catch (err) {
                console.error(err)
                alert('Could not delete invoice')
            }
        }


    const handleSubmit = async (e) => {
        e.preventDefault()

        const invoiceData = {
            status,
            date: new Date(date),
            amount: parseFloat(amount),
            message
        }

    try {

        const url = updateId ? `${API_URL}/${updateId}` : `${API_URL}/create`
        const method = updateId ? 'PUT' : 'POST'


        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(invoiceData)
        })
        
        if (!response.ok) {
            throw new Error('Error saving invoice')
        }

        


        const result = await response.json()
        alert(updateId ? 'Invoice Created' : 'Invoice Updated')
        resetForm()
        fetchInvoices()
        console.log(result)

    } catch (err) {
        console.error(err)
        alert(`Error: ${err.message}`)

        

        

    }}

    return (
        <div>
        <form onSubmit = {handleSubmit}>
        <h1> {updateId ? 'Edit Invoice' : 'Create Invoice'} </h1>
        <label>
        Status:
        <select value = { status } onChange={(e) => setStatus(e.target.value)} required>
        <option value = "unpaid">Unpaid</option>
        <option value = "paid">Paid</option>
        </select>
        </label>

        <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
</label>

        <label>
        Amount:
        <input type = "number" value = {amount} onChange = {(e) => setAmount(e.target.value)}required 
        step = "0.01" min = "0">
        </input>
        </label>
        
        <label>
        Message (optional):
        <textArea
        value = {message} onChange = {(e) => setMessage(e.target.value)}>
        </textArea>
        </label>

        <button type = "submit"> {updateId ? 'Update Invoice' : 'Submit Invoice'} </button>
        { updateId && <button type="button" onClick={resetForm}>Cancel Update</button>}
        </form>
        <h3>All Invoices</h3>
        {invoices.length === 0 ? (
        <p>No invoices yet.</p>
        ) : (
        <ul>
            {invoices.map((inv) => (
            <li key={inv._id}>
                <strong>{inv.status}</strong> - ${inv.amount.toFixed(2)} on {inv.date.slice(0, 10)}
                <br />
                {inv.message && <em>{inv.message}</em>}
                <br />
                <button onClick={() => handleUpdate(inv)}>Edit</button>
                <button onClick={() => handleDelete(inv._id)}>Delete</button>
            </li>
            ))}
        </ul>
        )}
    </div>
    )
}

export default InvoiceForm
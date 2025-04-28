import React, { useState, useRef } from 'react';
import InvoiceForm from './form/InvoiceForm';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const InvoiceApp = () => {
    const [invoiceData, setInvoiceData] = useState({
        // Your Company Information
        yourCompany: '', // Your company name
        yourFirstName: '', // Your first name
        yourLastName: '', // Your last name
        companyWebsite: '', // Your company website
        companyAddress: '', // Your company address
        companyCityStateZip: '', // Your company city, state, and ZIP
        companyCountry: '', // Your company country
        companyPhone: '', // Your company phone number
        companyEmail: '', // Your company email address

        // Client Information
        clientCompany: '', // Client's company name
        firstName: '', // Client's first name
        lastName: '', // Client's last name
        clientAddress: '', // Client's address
        cityStateZip: '', // Client's city, state, and ZIP
        country: '', // Client's country
        clientEmail: '', // Client's email address

        // Invoice Information
        logo: null, // Company logo (file)
        invoiceNumber: '', // Invoice number
        invoiceDate: new Date(), // Invoice creation date
        dueDate: new Date(), // Invoice due date

        // Items and Additional Information
        items: [
            {
                description: '', // Item description
                quantity: 0, // Item quantity
                price: 0, // Item price
            },
        ], // List of items
        notes: '', // Additional notes
        tax: 0, // Tax percentage
        discount: 0, // Discount percentage
        total: 0, // Total amount
    });

    const [validationErrors, setValidationErrors] = useState([]); // State for validation errors
    const [isExporting, setIsExporting] = useState(false); // Track export state
    const formRef = useRef(null); // Reference to the InvoiceForm container

    // Validation function to check required fields
    const validateFields = () => {
        const errors = [];
        const { yourCompany, yourFirstName, yourLastName, companyPhone, companyEmail, companyWebsite } = invoiceData;

        if (!yourCompany) errors.push('Your Company should not be blank.');
        if (!yourFirstName || !yourLastName) errors.push('Your First and Last Name should not be blank.');
        if (!companyPhone) errors.push('Phone Number should not be blank.');
        if (!companyEmail) errors.push('Email should not be blank.');
        if (!companyWebsite) errors.push('Website should not be blank.');

        setValidationErrors(errors); // Update the validation errors state
        return errors.length === 0; // Return true if no errors
    };

    //Export to PDF function
    const exportToPDF = async () => {
        // Validate required fields before proceeding
        if (!validateFields()) {
            return; // Stop execution if validation fails
        }

        if (!formRef.current) {
            console.error('formRef is null or undefined');
            return;
        }
    
        setIsExporting(true); // Set export state to true
        await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for DOM update
    
        try {
            const formElement = formRef.current;
            const canvas = await html2canvas(formElement, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
    
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
    
            // Scale the content to fit perfectly within the PDF page
            const scaleFactor = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
            const scaledWidth = canvasWidth * scaleFactor;
            const scaledHeight = canvasHeight * scaleFactor;
    
            // Align content to the top-left corner
            pdf.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);
            pdf.save('invoice.pdf');
        } catch (error) {
            console.error('Error exporting to PDF:', error);
        }
    
        setIsExporting(false); // Reset export state
    };

    return (
        <div className='invoice-container'>
            <div className="invoice-app">
                <InvoiceForm 
                    invoiceData={invoiceData} 
                    setInvoiceData={setInvoiceData}
                    isExporting={isExporting}
                    formRef={formRef}
                    validationErrors={validationErrors}
                />
                <div className="export-button-container">
                    <button type="button" onClick={exportToPDF} className="export-pdf-button">
                        Export to PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceApp;
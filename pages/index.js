import React, { useState, useRef } from 'react';
import InvoiceForm from '../components/form/InvoiceForm';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';

const InvoiceApp = () => {
    const [invoiceData, setInvoiceData] = useState({
        yourCompany: '',
        yourFirstName: '',
        yourLastName: '',
        companyWebsite: '',
        companyAddress: '',
        companyCityStateZip: '',
        companyCountry: '',
        companyPhone: '',
        companyEmail: '',
        clientCompany: '',
        firstName: '',
        lastName: '',
        clientAddress: '',
        cityStateZip: '',
        country: '',
        clientEmail: '',
        logo: null,
        invoiceNumber: '',
        invoiceDate: new Date(),
        dueDate: new Date(),
        items: [
            {
                description: '',
                quantity: 0,
                price: 0,
            },
        ],
        notes: '',
        tax: 0,
        discount: 0,
        total: 0,
    });

    const [validationErrors, setValidationErrors] = useState([]);
    const [isExporting, setIsExporting] = useState(false);
    const formRef = useRef(null);

    const validateFields = () => {
        const errors = [];
        const { yourCompany, yourFirstName, yourLastName, companyPhone, companyEmail, companyWebsite } = invoiceData;

        if (!yourCompany) errors.push('Your Company should not be blank.');
        if (!yourFirstName || !yourLastName) errors.push('Your First and Last Name should not be blank.');
        if (!companyPhone) errors.push('Phone Number should not be blank.');
        if (!companyEmail) errors.push('Email should not be blank.');
        if (!companyWebsite) errors.push('Website should not be blank.');

        setValidationErrors(errors);
        return errors.length === 0;
    };

    const exportToPDF = async () => {
        if (!validateFields()) {
            return;
        }

        if (!formRef.current) {
            console.error('formRef is null or undefined');
            return;
        }

        setIsExporting(true);
        await new Promise((resolve) => setTimeout(resolve, 0));

        try {
            const formElement = formRef.current;
            const canvas = await html2canvas(formElement, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            const scaleFactor = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
            const scaledWidth = canvasWidth * scaleFactor;
            const scaledHeight = canvasHeight * scaleFactor;

            pdf.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);
            pdf.save('invoice.pdf');
        } catch (error) {
            console.error('Error exporting to PDF:', error);
        }

        setIsExporting(false);
    };

    return (
        <div className="invoice-container">
            <div className="invoice-app">
                {validationErrors.length > 0 && (
                    <div className="validation-errors">
                        <ul>
                            {validationErrors.map((error, index) => (
                                <li key={index} className="error-message">
                                    {error}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <InvoiceForm
                    invoiceData={invoiceData}
                    setInvoiceData={setInvoiceData}
                    isExporting={isExporting}
                    formRef={formRef}
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
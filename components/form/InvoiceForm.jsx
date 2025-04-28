import React, { useState, useRef, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import './styles/InvoiceForm.css';
import HeaderSection from './sections/HeaderSection';
import BodySection from './sections/BodySection';
import FooterSection from './sections/FooterSection';

const InvoiceForm = ({ invoiceData, setInvoiceData, isExporting, formRef, validationErrors }) => {
    const [isServiceBased, setIsServiceBased] = useState(false);
    const [showPopover, setShowPopover] = useState(false);
    const popoverTarget = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [invoiceDate, setStartDate] = useState(new Date());
    const [dueDate, setDueDate] = useState(new Date());

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'logo' && files && files[0]) {
            setInvoiceData({ ...invoiceData, logo: files[0] });
        } else {
            setInvoiceData({ ...invoiceData, [name]: value });
        }
    };

    const handleDragOver = (e) => {
            e.preventDefault();
            setDragging(true);
        };
    
    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setInvoiceData({ ...invoiceData, logo: file });
        }
    };

    const handlePopoverChoice = (choice) => {
        setIsServiceBased(choice === "yes");
        setShowPopover(false); // Hide the popover after selection
    };

    // Ensure the table always starts with one empty item
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            if (!invoiceData.items || invoiceData.items.length === 0) {
                setInvoiceData({
                    ...invoiceData,
                    items: [{ description: '', quantity: '', price: '' }],
                });
            }
            initialized.current = true; // Mark as initialized
        }
    }, [invoiceData, setInvoiceData]);
    
    const handleItemChange = (index, field, value) => {
        const updatedItems = [...invoiceData.items];
        updatedItems[index][field] = value;
        setInvoiceData({ ...invoiceData, items: updatedItems });
    };

    const addItem = () => {
        setInvoiceData({
            ...invoiceData,
            items: [...invoiceData.items, { description: '', quantity: '', price: '' }],
        });
    };

    const removeItem = (index) => {
        const updatedItems = invoiceData.items.filter((_, i) => i !== index);
        setInvoiceData({ ...invoiceData, items: updatedItems });
    };

    return (
        <div
            className={`invoice-form-container ${ isExporting ? 'exporting-class' : '' }`} // Dynamically change the class
            ref={formRef}
        >
            <form className="invoice-form">

                <HeaderSection
                    invoiceData={invoiceData}
                    handleChange={handleChange}
                    handleDragOver={handleDragOver}
                    handleDragLeave={handleDragLeave}
                    handleDrop={handleDrop}
                    dragging={dragging}
                    invoiceDate={invoiceDate}
                    setStartDate={setStartDate}
                    dueDate={dueDate}
                    setDueDate={setDueDate}
                    validationErrors={validationErrors}
                />
                <BodySection
                    invoiceData={invoiceData}
                    setInvoiceData={setInvoiceData}
                    handleItemChange={handleItemChange}
                    addItem={addItem}
                    removeItem={removeItem}
                    isServiceBased={isServiceBased}
                    popoverTarget={popoverTarget}
                    showPopover={showPopover}
                    setShowPopover={setShowPopover}
                    handlePopoverChoice={handlePopoverChoice}
                />
                <FooterSection
                    invoiceData={invoiceData}
                    handleChange={handleChange}
                    isExporting={isExporting}
                />
                
            </form>
        </div>
    );
};

export default InvoiceForm;
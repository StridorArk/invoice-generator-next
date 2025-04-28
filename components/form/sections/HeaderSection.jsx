import React from 'react';
import DatePicker from "react-datepicker";

const HeaderSection = ({ 
    invoiceData,
    handleChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    dragging,
    invoiceDate,
    setStartDate,
    dueDate,
    setDueDate,
    validationErrors = []
}) => {
    return (
        <div className="main-row">
            <div className='left-side'>
                <h2>Invoice</h2>
                <div className="left-details">
                    <div className="invoice-one">
                        <input
                            type="text"
                            name="yourCompany"
                            autocomplete="organization"
                            className='invoice-name'
                            value={invoiceData.yourCompany || ''}
                            onChange={handleChange}
                            placeholder="Your Company*"
                        />
                    </div>
                    <div className='invoice-two'>
                        <input
                            type="text"
                            name="yourFirstName"
                            autocomplete="given-name"
                            className='first-name'
                            value={invoiceData.yourFirstName || ''}
                            onChange={handleChange}
                            placeholder="First Name*"
                        />
                        <input
                            type="text"
                            name="yourLastName"
                            autocomplete="family-name"
                            className='last-name'
                            value={invoiceData.yourLastName || ''}
                            onChange={handleChange}
                            placeholder="Last Name*"
                        />
                    </div>
                    <div className='invoice-three'>
                        <input
                            type="text"
                            name="companyWebsite"
                            className="invoice-info"
                            value={invoiceData.companyWebsite || ''}
                            onChange={handleChange}
                            placeholder="Company Website"
                        />
                    </div>
                    <div className='invoice-three'>
                        <input
                            type="text"
                            name="companyAddress"
                            className="invoice-info"
                            value={invoiceData.companyAddress || ''}
                            onChange={handleChange}
                            placeholder="Company Address"
                        />
                    </div>
                    <div className='invoice-three'>
                        <input
                            type="text"
                            name="companyCityStateZip"
                            className="invoice-info"
                            value={invoiceData.companyCityStateZip || ''}
                            onChange={handleChange}
                            placeholder="City, State ZIP"
                        />
                    </div>
                    <div className='invoice-three'>
                        <input
                            type="text"
                            name="companyCountry"
                            className="invoice-info"
                            value={invoiceData.companyCountry || ''}
                            onChange={handleChange}
                            placeholder="Country"
                        />
                    </div>
                    <div className='invoice-three'>
                        <input
                            type="text"
                            name="companyPhone"
                            className="invoice-info"
                            value={invoiceData.companyPhone || ''}
                            onChange={handleChange}
                            placeholder="Phone No*"
                        />
                    </div>
                    <div className='invoice-three'>
                        <input
                            type="email"
                            name="companyEmail"
                            className="invoice-info"
                            value={invoiceData.companyEmail || ''}
                            onChange={handleChange}
                            placeholder="Email Address*"
                        />
                    </div>
                </div>
                <div className="left-details">
                    <div className='invoice-one'>
                        <input
                            type="text"
                            name="clientCompany"
                            className='invoice-name'
                            value={invoiceData.clientCompany || ''}
                            onChange={handleChange}
                            placeholder="Client's Company"
                        />
                    </div>
                    <div className='invoice-two'>
                        <input
                            type="text"
                            name="firstName"
                            className='first-name'
                            autoComplete="given-name"
                            value={invoiceData.firstName || ''}
                            onChange={handleChange}
                            placeholder='First Name'
                        />
                        <input
                            type="text"
                            name="lastName"
                            className='last-name'
                            autoComplete="family-name"
                            value={invoiceData.lastName || ''}
                            onChange={handleChange}
                            placeholder='Last Name'
                        />
                    </div>
                    <div className='invoice-three'>
                        <input
                            type="text"
                            name="clientAddress"
                            className="invoice-info"
                            value={invoiceData.clientAddress || ''}
                            onChange={handleChange}
                            placeholder='Client Address'
                        />
                    </div>
                    <div className='invoice-three'>
                        <input
                            type="text"
                            name="cityStateZip"
                            className="invoice-info"
                            value={invoiceData.cityStateZip || ''}
                            onChange={handleChange}
                            placeholder='City, State ZIP'
                        />
                    </div>
                    <div className='invoice-three'>
                        <input
                            type="text"
                            name="country"
                            className="invoice-info"
                            value={invoiceData.country || ''}
                            onChange={handleChange}
                            placeholder='Country'
                        />
                    </div>
                    <div className='invoice-three'>
                        <input
                            type="email"
                            name="clientEmail"
                            className="invoice-info"
                            autoComplete="email"
                            value={invoiceData.clientEmail || ''}
                            onChange={handleChange}
                            placeholder='Client Email'
                        />
                    </div>
                </div>
            </div>

            <div className='right-side'>
                {invoiceData.logo ? (
                    <label
                        className={`invoice-drop-zone2 ${dragging ? 'dragging' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <span class="drop-zone-description2">Drag &amp; drop a logo file or click to upload</span>   
                        <input
                            type="file"
                            name="logo"
                            className='logo-input'
                            accept="image/*"
                            onChange={handleChange}
                        />
                        <img
                            src={URL.createObjectURL(invoiceData.logo)}
                            alt="Company Logo"
                            className='logo-placeholder'
                        />
                    </label>
                ) : (
                    <label
                        className={`invoice-drop-zone ${dragging ? 'dragging' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <span class="drop-zone-description">Drag &amp; drop a logo file or click to upload</span>   
                        <input
                            type="file"
                            name="logo"
                            className='logo-input'
                            accept="image/*"
                            onChange={handleChange}
                        />
                        <img
                            src=""
                            alt="Company Logo"
                            className='logo-placeholder-none'
                        />
                    </label>
                )}
                
                {/* Render validation errors */}
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
                
                <div className="invoice-header">
                    <div className="invoice-number">
                        <label>Invoice No: </label>
                        <input
                            type="text"
                            name="invoiceNumber"
                            className="number-input"
                            placeholder='####'
                            value={invoiceData.invoiceNumber || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="invoice-dates">
                        <label>Invoice Date: </label>
                        <DatePicker
                            selected={invoiceDate}
                            onChange={(date) => setStartDate(date)}
                        />
                    </div>
                    <div className="invoice-dates">
                        <label>Due Date: </label>
                        <DatePicker
                            selected={dueDate}
                            onChange={(date) => setDueDate(date)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderSection;
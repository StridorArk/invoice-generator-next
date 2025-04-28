import React from 'react';

const FooterSection = ({ invoiceData, handleChange, isExporting }) => {
    return (
        <div className='main-footer'>
            <div className="column-notes">
                <div className="invoice-notes">
                    <label className="notes-label">Notes:</label>
                    {isExporting ? (
                        // Render a div for PDF export
                        <div className="notes-textarea pdf-notes">
                            {invoiceData.notes || ''}
                        </div>
                    ) : (
                        // Render a textarea for user input
                        <textarea
                            name="notes"
                            className="notes-textarea"
                            value={invoiceData.notes || ''}
                            onChange={handleChange}
                            placeholder="Any additional comments"
                        />
                    )}
                </div>
            </div>    
            <div className="invoice-total">
                <div className='total-section'>
                    <div className='total-data'>
                        <label>Subtotal:</label>
                        <input
                            type="number"
                            name="subtotal"
                            className="subtotal-input"
                            value={invoiceData.items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)}
                            readOnly
                        />
                    </div>
                    <div className='total-data'>
                        <label>Tax:</label>
                        <div className='percent-div'>
                            <input
                                type="number"
                                name="tax"
                                className="percent-input"
                                value={invoiceData.tax || ''}
                                onChange={handleChange}
                                placeholder="0"
                            />
                            <span order="%" className="percent-span">%</span>
                        </div>
                    </div>
                    <div className='total-data'>
                        <label>Discount (%):</label>
                        <div className='percent-div'>
                            <input
                                type="number"
                                name="discount"
                                className="percent-input"
                                value={invoiceData.discount || ''}
                                onChange={handleChange}
                                placeholder="0"
                            />
                            <span order="%" className="percent-span">%</span>
                        </div>
                    </div>
                    <div className='separator'></div>
                    <div className='total-data'>
                        <label>Total:</label>
                        <input
                            type="number"
                            name="total"
                            className='total-input'
                            value={(() => {
                                const subtotal = invoiceData.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
                                const tax = (subtotal * (invoiceData.tax || 0)) / 100;
                                const discount = ((subtotal + tax)  * (invoiceData.discount || 0)) / 100;
                                return (subtotal + tax - discount).toFixed(2);
                            })()}
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterSection;
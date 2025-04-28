import React from 'react';
import { Overlay, Popover } from 'react-bootstrap';

const BodySection = ({
    invoiceData,
    setInvoiceData,
    handleItemChange,
    addItem,
    removeItem,
    isServiceBased,
    popoverTarget,
    showPopover,
    setShowPopover,
    handlePopoverChoice,
}) => {
    return (
        <div className='main-body'>
            <div className="items-section">
                <table className="items-table">
                    <thead className='item-head'>
                        <tr>
                            <th id="table-header-0" className='tab-head1'><span>ID</span></th>
                            <th id="table-header-1" className='tab-head1'><span>Description</span></th>
                            <th id="table-header-2" className='tab-head2 quantity-column'>
                                <span>
                                    {isServiceBased ? "Hours" : "Quantity"}
                                    <button
                                        type="button"
                                        className="popover-button"
                                        ref={popoverTarget}
                                        onClick={() => setShowPopover(!showPopover)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16" className='popover-icon' >
                                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                                        </svg>
                                    </button>
                                    <Overlay
                                        target={popoverTarget.current}
                                        show={showPopover}
                                        placement="top"
                                    >
                                        <Popover id="popover-basic">
                                            <Popover.Body className="popover-body">
                                                Are you a service-based company?<br />
                                                Switch to hours/rates:<br />
                                                <button
                                                    type="button"
                                                    onClick={() => handlePopoverChoice("yes")}
                                                    className="option-button"
                                                >
                                                    Yes
                                                </button>
                                                <span aria-hidden="true" class="popover-separator">/</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handlePopoverChoice("no")}
                                                    className="option-button"
                                                >
                                                    No
                                                </button>
                                            </Popover.Body>
                                        </Popover>
                                    </Overlay>
                                </span>
                            </th>
                            <th id="table-header-3" className='tab-head2'>
                                <span>{isServiceBased ? "Rates" : "Price"}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceData.items.map((item, index) => (
                            <tr key={index} className="item-row">
                                <td className='item-td'>
                                    <div className='item-div'>
                                        <input
                                            type="text"
                                            placeholder="00"
                                            className='item-string'
                                            value={item.id}
                                            onChange={(e) => handleItemChange(index, 'id', e.target.value)}
                                        />
                                    </div>
                                </td>
                                <td className='item-td'>
                                    <div className='item-div'>
                                        <input
                                            type="text"
                                            placeholder="item description"
                                            className='item-string'
                                            value={item.description}
                                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                        />
                                    </div>
                                </td>
                                <td className='item-td'>
                                    <div className='item-div-number'>
                                        <input
                                            type="number"
                                            placeholder="1"
                                            className='item-number'
                                            value={item.quantity}
                                            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                                        />
                                    </div>
                                </td>
                                <td className='item-td'>
                                    <div className='item-div-number'>
                                        <input
                                            type="number"
                                            placeholder="$0.00"
                                            className='item-number'
                                            value={item.price}
                                            onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                                        />
                                    </div>
                                    <button className='delete-item' type='button' onClick={() => removeItem(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16" className='delete-icon'>
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='add-item' type='button' onClick={addItem}>
                    <span>+ Add More</span>
                </button>
            </div>
        </div>
    );
};

export default BodySection;
import 'semantic-ui-css/semantic.min.css';
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Button,
    Modal
} from 'semantic-ui-react'
import { FormField, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from 'moment';


export const EditSalesModalComponent = ({ sale, sales, setSales }) => {

    const id = sale.id;
    const url = import.meta.env.VITE_EDIT_SALE+"?id=" + id;

    const [open, setOpen] = useState(false);
    const [dateSold, setDateSold] = useState(sale.dateSold);
    const [customerId, setCustomerId] = useState(sale.customerId);
    const [productId, setProductId] = useState(sale.productId);
    const [storeId, setStoreId] = useState(sale.storeId);

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([]);

    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        const customersUrl = import.meta.env.VITE_GET_ALL_CUSTOMERS;
        const productsUrl = import.meta.env.VITE_GET_ALL_PRODUCTS;
        const storesUrl = import.meta.env.VITE_GET_ALL_STORES;
        const fetchCData = async () => {
            try {
                const response = await axios.get(customersUrl);
                setCustomers(response.data);
            } catch (error) {
                console.log(error);
            }

        }
        const fetchPData = async () => {
            try {
                const response = await axios.get(productsUrl);
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            }

        }
        const fetchSData = async () => {
            try {
                const response = await axios.get(storesUrl);
                setStores(response.data);
            } catch (error) {
                console.log(error);
            }

        }
        fetchCData();
        fetchPData();
        fetchSData();

    }, []);

    const handleDateSoldChange = (event) => {
        setIsChanged(true);
        setDateSold(event.target.value)
    };

    const handleCustomerChange = (event) => {
       
        setCustomerId(event.target.value)
        console.log(isChanged);
        setIsChanged(true);
    }
    const handleProductChange = (event) => {
        setIsChanged(true);
        setProductId(event.target.value)
    };

    const handleStoreChange = (event) => {
        setStoreId(event.target.value)
        setIsChanged(true);
    }

    const handleEdit = async () => {

        try {
            const date = (new Date(dateSold)).toJSON();;
            console.log({id,
                customerId,
                productId,
                storeId,
                dateSold});
            const response = await axios.put(url,
                {
                    id,
                    customerId,
                    productId,
                    storeId,
                    dateSold
                });
            console.log(response.data);
            setSales([...sales, response.data]);
        } catch (error) {
            alert(error.code);
            console.log(error);
        }
        handleReset();
    };
    const handleReset = () => {
        setOpen(false);
        setIsChanged(false);
    }

    const handleCancel = () => {
        setCustomerId(sale.customerId);
        setProductId(sale.productId);
        setStoreId(sale.storeId);
        setDateSold(sale.dateSold);
    }

    return (
        <div>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<button className="ui right labeled icon button yellow">
                    <i className="edit icon" /> EDIT</button>}
            >
                <ModalHeader>Edit Sales</ModalHeader>
                <ModalContent >
                    <Form>
                        <FormField required>
                            <label>Date sold</label>
                            <input type='date' onChange={handleDateSoldChange}
                                value={moment(new Date(dateSold)).format("YYYY-MM-DD")} />
                        </FormField>
                        <Form.Field label="Customer" control='select'
                            onChange={handleCustomerChange} required defaultValue={sale.customerId}>
                                
                            {customers && customers.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}

                        </Form.Field>
                        <Form.Field label="Product" control='select'
                            onChange={handleProductChange} required defaultValue={sale.productId}>

                            {products && products.map((p) => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}

                        </Form.Field>
                        <Form.Field label="Store" control='select'
                            onChange={handleStoreChange} required defaultValue={sale.storeId}>

                            {stores && stores.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </Form.Field>
                    </Form>

                </ModalContent>
                <ModalActions>
                    <button className='ui black button' onClick={handleCancel}> cancel</button>
                    <Button
                        content="edit"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={handleEdit}
                        positive
                        disabled={!(isChanged &&
                            (dateSold.length > 0 && !isNaN(customerId) && 
                            !isNaN(productId) && !isNaN(storeId)))}
                    />      
                </ModalActions>
            </Modal>

        </div>
    )
}

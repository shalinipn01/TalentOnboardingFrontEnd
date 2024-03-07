import 'semantic-ui-css/semantic.min.css';
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Button,
    Modal,
    FormField, Form 
} from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from "axios";

export const CreateSalesModalComponent = ({ sales, setSales }) => {

    const url = import.meta.env.VITE_CREATE_SALE;

    const [open, setOpen] = useState(false);
    const [dateSold, setDateSold] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [productId, setProductId] = useState("");
    const [storeId, setStoreId] = useState("");

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([]);

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

    const handleCreate = async () => {

        try {
            const response = await axios.post(url,
                {
                    customerId,
                    productId,
                    storeId,
                    dateSold
                });
            console.log(response.data);
            setSales([...sales, response.data]);
        } catch (error) {
            console.log(error);
            alert(error.code);
        }
        handleCancel();
    };

    const handleCancel = () => {
        setOpen(false);
        setCustomerId("");
        setProductId("");
        setStoreId("");
        setDateSold("");
    }
    const validate = () => {
        return dateSold.length > 0 && customerId.length > 0 && 
        productId.length > 0 && storeId.length > 0;
         
      };
    return (
        <div>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<section className="createButtonSection">
                    <button className='ui primary button'> New Sale </button>
                </section>}
            >
                <ModalHeader>Create Sales</ModalHeader>
                <ModalContent >
                    <Form>
                        <FormField required>
                            <label>Date sold</label>
                            <input type='date' onChange={(event) => setDateSold(event.target.value)}
                                value={dateSold} />
                        </FormField>
                        <Form.Field label="Customer" control='select'
                            onChange={(e) => setCustomerId(e.target.value)} required defaultValue={'DEFAULT'}>

                            <option value="DEFAULT" disabled></option>
                            {customers && customers.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}

                        </Form.Field>
                        <Form.Field label="Product" control='select'
                            onChange={(e) => setProductId(e.target.value)} required defaultValue={'DEFAULT'}>

                            <option value="DEFAULT" disabled></option>
                            {products && products.map((p) => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}

                        </Form.Field>
                        <Form.Field label="Store" control='select'
                            onChange={(e) => setStoreId(e.target.value)} required defaultValue={'DEFAULT'}>

                            <option value="DEFAULT" disabled></option>
                            {stores && stores.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </Form.Field>
                    </Form>

                </ModalContent>
                <ModalActions>
                    <button className='ui black button' onClick={handleCancel}> cancel</button>
                    <Button
                        content="create"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={handleCreate}
                        positive
                        disabled = {!validate()}
                    />
                </ModalActions>
            </Modal>

        </div>
    )
}

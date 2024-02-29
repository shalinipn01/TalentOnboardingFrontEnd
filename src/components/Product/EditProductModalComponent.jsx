import 'semantic-ui-css/semantic.min.css';
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Button,
    Modal
} from 'semantic-ui-react'
import { FormField, Form } from 'semantic-ui-react'
import React, { useState } from 'react';
import axios from "axios";


export const EditProductModalComponent = ({ product, products, setProducts }) => {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const id = product.id;
    const url = import.meta.env.VITE_EDIT_PRODUCT+"?id="+id;
    
    const handleEdit = async () => {

        try {
            const response = await axios.put(url,
                {
                    id,
                    name,
                    price
                });
            console.log(response.data);
            setProducts([...products, response.data]);
        } catch (error) {
            alert(error.code);
            console.log(error);
        }
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
        setName(product.name);
        setPrice(product.price);
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
                <ModalHeader>Edit Product</ModalHeader>
                <ModalContent >
                    <Form>
                        <FormField required>
                            <label>NAME</label>
                            <input type='text' onChange={(event) => setName(event.target.value)} 
                             value={name} />
                        </FormField>
                        <FormField required>
                            <label>PRICE</label>
                            <input type='text' onChange={(event) => setPrice(event.target.value)} 
                            value={price} />
                        </FormField>
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
                    />
                </ModalActions>
            </Modal>

        </div>
    )
}

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


export const CreateProductModalComponent = ({ products, setProducts }) => {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const url = import.meta.env.VITE_CREATE_PRODUCT;

    const handleCreate = async () => {

        try {
            const response = await axios.post(url,
                {
                    name,
                    price
                });
            console.log(response.data);
            setProducts([...products, response.data]);
        } catch (error) {
            console.log(error);
            alert(error.code);
        }
        setOpen(false);
        setName("");
        setPrice("");
    };

    const handleCancel = () => {
        setOpen(false);
        setName("");
        setPrice("");
    }

    return (
        <div>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<section className="createButtonSection">
                    <button className='ui primary button'> New Product </button>
                </section>}
            >
                <ModalHeader>Create Product</ModalHeader>
                <ModalContent >
                    <Form>
                        <FormField required>
                            <label>NAME</label>
                            <input type='text' onChange={(event) => setName(event.target.value)} value={name} />
                        </FormField>
                        <FormField required>
                            <label>PRICE</label>
                            <input type='text' onChange={(event) => setPrice(event.target.value)} value={price} />
                        </FormField>
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

                    />
                </ModalActions>
            </Modal>

        </div>
    )
}

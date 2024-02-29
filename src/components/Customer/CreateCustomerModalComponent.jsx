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


export const CreateCustomerModalComponent = ({ customers, setCustomers }) => {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const url = import.meta.env.VITE_CREATE_CUSTOMER;


    const handleCreate = async () => {

        try {
            const response = await axios.post(url,
                {
                    name,
                    address
                });
            console.log(response.data);
            setCustomers([...customers, response.data]);
        } catch (error) {
            console.log(error);
            alert(error.code);
        }
        setOpen(false);
        setName("");
        setAddress("");
    };

    const handleCancel = () => {
        setOpen(false);
        setName("");
        setAddress("");
    }

    return (
        <div>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<section className="createButtonSection">
                    <button className='ui primary button'> New Customer </button>
                </section>}
            >
                <ModalHeader>Create Customer</ModalHeader>
                <ModalContent >
                    <Form>
                        <FormField required>
                            <label>NAME</label>
                            <input type='text' onChange={(event) => setName(event.target.value)} value={name} />
                        </FormField>
                        <FormField required>
                            <label>ADDRESS</label>
                            <input type='text' onChange={(event) => setAddress(event.target.value)} value={address} />
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

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


export const EditCustomerModalComponent = ({ customer, customers, setCustomers }) => {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState(customer.name);
    const [address, setAddress] = useState(customer.address);
    const id = customer.id;
    const url = import.meta.env.VITE_EDIT_CUSTOMER+"?id="+id;
    
    const handleEdit = async () => {

        try {
            const response = await axios.put(url,
                {
                    id,
                    name,
                    address
                });
            console.log(response.data);
            setCustomers(...customers, response.data);
        } catch (error) {
            alert(error.code);
            console.log(error);
        }
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
        setName(customer.name);
        setAddress(customer.address);
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
                <ModalHeader>Edit Customer</ModalHeader>
                <ModalContent >
                    <Form>
                        <FormField required>
                            <label>NAME</label>
                            <input type='text' onChange={(event) => setName(event.target.value)} 
                             value={name} />
                        </FormField>
                        <FormField required>
                            <label>ADDRESS</label>
                            <input type='text' onChange={(event) => setAddress(event.target.value)} 
                            value={address} />
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

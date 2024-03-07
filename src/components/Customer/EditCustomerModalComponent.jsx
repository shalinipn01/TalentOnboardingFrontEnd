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
    const [isChanged, setIsChanged] = useState(false);
    const id = customer.id;
    const url = import.meta.env.VITE_EDIT_CUSTOMER + "?id=" + id;


    const handleNameChange = (event) => {
        setIsChanged(true);
        setName(event.target.value)
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value)
        setIsChanged(true);
    }


    const handleEdit = async () => {

        try {
            const response = await axios.put(url,
                {
                    id,
                    name,
                    address
                });
            console.log(response.data);
            setCustomers([...customers, response.data]);
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
        handleReset();
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
                            <input type='text' onChange={handleNameChange}
                                value={name} />
                        </FormField>
                        <FormField required>
                            <label>ADDRESS</label>
                            <input type='text' onChange={handleAddressChange}
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
                        disabled={!(isChanged &&
                            (name.length > 0 && address.length > 0))}
                    />
                    
                </ModalActions>
            </Modal>

        </div>
    )
}

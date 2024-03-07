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


export const EditStoreModalComponent = ({ store, stores, setStores }) => {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState(store.name);
    const [address, setAddress] = useState(store.address);
    const [isChanged, setIsChanged]= useState(false);
    const id = store.id;
    const url = import.meta.env.VITE_EDIT_STORE+"?id="+id;
    
    const handleNameChange = (event) => {
        
        setName(event.target.value)
        setIsChanged(true);
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
            setStores(...stores, response.data);
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
        setName(store.name);
        setAddress(store.address);
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
                <ModalHeader>Edit Store</ModalHeader>
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
                        disabled={ !(isChanged &&
                            (name.length > 0 && address.length > 0))}
                    />
                </ModalActions>
            </Modal>

        </div>
    )
}

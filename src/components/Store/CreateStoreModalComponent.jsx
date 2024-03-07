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


export const CreateStoreModalComponent = ({ stores, setStores }) => {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const url = import.meta.env.VITE_CREATE_STORE;

    const handleCreate = async () => {

        try {
            const response = await axios.post(url,
                {
                    name,
                    address
                });
            console.log(response.data);
            setStores([...stores, response.data]);

        } catch (error) {
            console.log(error);
            alert(error.code);
        }
        handleCancel();
    };

    const handleCancel = () => {
        setOpen(false);
        setName("");
        setAddress("");
    }
    const validate = () => {
        return name.length >0 && address.length > 0;
      };
    return (
        <div>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<section className="createButtonSection">
                    <button className='ui primary button'> New Store </button>
                </section>}
            >
                <ModalHeader>Create Store</ModalHeader>
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
                        disabled = {!validate()}
                    />
                </ModalActions>
            </Modal>

        </div>
    )
}

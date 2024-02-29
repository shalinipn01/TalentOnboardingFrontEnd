import 'semantic-ui-css/semantic.min.css';
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    ModalDescription,
    Button,
    Modal
} from 'semantic-ui-react'
import React, { useState } from 'react';
import axios from "axios";

export const DeleteProductModalComponent = ({ product, setProducts }) => {

    const [open, setOpen] = useState(false);
    const url = import.meta.env.VITE_DELETE_PRODUCT+"?id="+product.id;


    const handleDelete = async () => {
        try {
            const response = await axios.delete(url);
            console.log(response.data);
            //force re render
            setProducts([]);

        } catch (error) {
            console.log(error);
            alert(error.code);
        }
        setOpen(false);
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<button className="ui right labeled icon button red">
                <i className="trash icon"></i> DELETE</button>}
        >
            <ModalHeader>Delete Product</ModalHeader>
            <ModalContent >
                <ModalDescription>
                    <p>Are you sure ?</p>
                </ModalDescription>
            </ModalContent>
            <ModalActions>
                <Button color='black' onClick={() => setOpen(false)}>
                    cancel
                </Button>
                <Button
                    content="delete"
                    labelPosition='right'
                    icon='remove'
                    onClick={handleDelete}
                    negative
                />
            </ModalActions>
        </Modal>
    )
}

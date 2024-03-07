import 'semantic-ui-css/semantic.min.css';
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Button,
    Modal,
    Label
} from 'semantic-ui-react'
import { FormField, Form } from 'semantic-ui-react'
import React, { useState } from 'react';
import axios from "axios";


export const CreateProductModalComponent = ({ products, setProducts }) => {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [priceError, setPriceError] = useState("");

    const url = import.meta.env.VITE_CREATE_PRODUCT;

    const handleCreate = async () => {
        let isValidForm = true;
        
        if(isNaN(+price)){
            isValidForm = false;
            setPriceError("Please enter a valid price.");
        }
        if(isValidForm){
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
            handleCancel();
        }        
    };

    const handleCancel = () => {
        setOpen(false);
        setName("");
        setPrice("");
        setPriceError("");
    }
    const validate = () => {
        return name.length > 0 && price.length > 0;
      };

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
                            {priceError && <Label basic color='red' pointing>
                            {priceError}
                            </Label>}
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

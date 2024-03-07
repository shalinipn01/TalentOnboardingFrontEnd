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


export const EditProductModalComponent = ({ product, products, setProducts }) => {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [isChanged, setIsChanged]= useState(false);
    const [priceError, setPriceError] = useState("");
    const id = product.id;
    const url = import.meta.env.VITE_EDIT_PRODUCT+"?id="+id;
    
    const handleNameChange = (event) => {    
        setIsChanged(true);        
        setName(event.target.value)        
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value)
        setIsChanged(true);
    }
    
    const handleEdit = async () => {

        let isValidForm = true;
        
        if(isNaN(+price)){
            isValidForm = false;
            setPriceError("Please enter a valid price.")
            setIsChanged(false);
        }
        if(isValidForm){
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
        handleReset();
    }
    };
    const handleReset = () => {
        setOpen(false);
        setPriceError("");
        setIsChanged(false);
    }
    const handleCancel = () => {
        handleReset();
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
                            <input type='text' onChange={handleNameChange} 
                             value={name} />
                        </FormField>
                        <FormField required>
                            <label>PRICE</label>
                            <input type='text' onChange={handlePriceChange} 
                            value={price} />
                            {priceError && <Label basic color='red' pointing>
                            {priceError}
                            </Label>}
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
                            (name.length > 0 && price.length > 0))}
                    />
                </ModalActions>
            </Modal>

        </div>
    )
}

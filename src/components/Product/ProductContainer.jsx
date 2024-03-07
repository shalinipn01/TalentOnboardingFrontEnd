import 'semantic-ui-css/semantic.min.css';
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableBody,
    Table,
    Container,
} from 'semantic-ui-react';
import "../componentprops.css";

import { ProductList } from './ProductList';
import { CreateProductModalComponent } from './CreateProductModalComponent';

export const ProductContainer = ({ currentPage, setCurrentPage, recordsPerPage, setPageCount, setShowPagination }) => {


    const url = import.meta.env.VITE_GET_ALL_PRODUCTS;

    const [productsList, setProductsList] = useState(null);
    //data variable - to reload the component after create/edit/delete
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setShowPagination(true);
        setCurrentPage(1);
    }, []);
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(url);
            setLoading(false);
            setProductsList(response.data.slice(((currentPage * recordsPerPage) - recordsPerPage),
                (currentPage * recordsPerPage)));
            setPageCount(Math.ceil(response.data.length / recordsPerPage));
        } catch (error) {
            setLoading(false);
            console.log(error);
            alert(error.code);
        }

    }, [data, currentPage, recordsPerPage])
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const renderProductList = (productsList && productsList.length > 0) ?
        productsList.map((product) => (
            <ProductList key={product.id} product={product} products={data} setProducts={setData} />
        )) : null;

    return (
        <>
            <Container fluid>

                <CreateProductModalComponent products={productsList} setProducts={setData} />

                <Table striped celled singleLine className='tableProps' unstackable>
                    <TableHeader >
                        <TableRow>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Price</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {renderProductList}
                    </TableBody>
                </Table>
                {loading && <p>Loading Products</p>}
            </Container>
        </>
    )
}

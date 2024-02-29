import 'semantic-ui-css/semantic.min.css';
import { useState, useEffect } from "react";
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

import { SaleList } from './SaleList';
import { CreateSalesModalComponent } from './CreateSalesModalComponent';

export const SalesContainer = ({ currentPage, setCurrentPage, recordsPerPage, setPageCount, setShowPagination }) => {


    const url = import.meta.env.VITE_GET_ALL_SALES;

    const [salesList, setSalesList] = useState(null);
    //data variable - to reload the component after create/edit/delete
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setShowPagination(true);
        setCurrentPage(1);
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url);
                setLoading(false);
                setSalesList(response.data.slice(((currentPage * recordsPerPage) - recordsPerPage),
                    (currentPage * recordsPerPage)));
                setPageCount(Math.ceil(response.data.length / recordsPerPage));
            } catch (error) {
                setLoading(false);
                console.log(error);
                alert(error.code);
            }

        }
        fetchData();

    }, [data, currentPage, recordsPerPage]);

    return (
        <>
            <Container fluid>
                <CreateSalesModalComponent sales={salesList} setSales={setData} />

                <Table striped celled singleLine className='tableProps' unstackable>
                    <TableHeader >
                        <TableRow>
                            <TableHeaderCell>Customer</TableHeaderCell>
                            <TableHeaderCell>Product</TableHeaderCell>
                            <TableHeaderCell>Store</TableHeaderCell>
                            <TableHeaderCell>Date Sold</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {salesList && salesList.map((sale) => (
                            <SaleList key={sale.id} sale={sale} sales={salesList} setSales={setData} />
                        ))}

                    </TableBody>
                </Table>
                {loading && <p>Loading Sales</p>}
            </Container>
        </>
    )
}

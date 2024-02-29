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
import { CreateStoreModalComponent } from './CreateStoreModalComponent';
import { StoreList } from './StoreList';

export const StoreContainer = ({ currentPage, setCurrentPage, recordsPerPage, setPageCount, setShowPagination }) => {

    const url = import.meta.env.VITE_GET_ALL_STORES;

    const [storesList, setStoresList] = useState(null);
    //data variable - to reload the component after create/edit/delete
    const [data, setData] = useState([]);
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
                setStoresList(response.data.slice(((currentPage * recordsPerPage) - recordsPerPage),
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
                <CreateStoreModalComponent stores={storesList} setStores={setData} />

                <Table striped celled singleLine className='tableProps' unstackable>
                    <TableHeader >
                        <TableRow>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Address</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {storesList && storesList.map((store) => (
                            <StoreList key={store.id} store={store} stores={data} setStores={setData} />
                        ))}

                    </TableBody>
                </Table>
                {loading && <p>Loading Stores</p>}
            </Container>
        </>
    )
}

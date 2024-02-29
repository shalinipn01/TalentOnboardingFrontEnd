import 'semantic-ui-css/semantic.min.css';
import { useState, useEffect } from "react";
import { CustomerList } from './CustomerList';
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableBody,
  Table,
  Container,
} from 'semantic-ui-react';
import axios from "axios";
import "../componentprops.css";
import { CreateCustomerModalComponent } from './CreateCustomerModalComponent';


const CustomerContainer = ({ currentPage, setCurrentPage, recordsPerPage, setPageCount, setShowPagination }) => {

  const url = import.meta.env.VITE_GET_ALL_CUSTOMERS;

  const [customersList, setCustomersList] = useState(null);
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
        setCustomersList(response.data.slice(((currentPage * recordsPerPage) - recordsPerPage),
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
        <CreateCustomerModalComponent customers={customersList} setCustomers={setData} />
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

            {customersList && customersList.map((customer) => (
              <CustomerList key={customer.id} customer={customer} customers={data} setCustomers={setData} />
            ))}

          </TableBody>
        </Table>
        {loading && <p>Loading Customers</p>}
      </Container>
    </>
  )
}

export default CustomerContainer;
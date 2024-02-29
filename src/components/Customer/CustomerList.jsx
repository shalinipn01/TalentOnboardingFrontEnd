import {
    TableRow,
    TableCell
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { EditCustomerModalComponent } from './EditCustomerModalComponent';
import { DeleteCustomerModalComponent } from './DeleteCustomerModalComponent';

export const CustomerList = ({ customer, customers, setCustomers }) => {
    return (
        <TableRow>
            <TableCell >{customer.name}</TableCell>
            <TableCell>{customer.address}</TableCell>
            <TableCell>
                <EditCustomerModalComponent customer={customer} customers={customers} setCustomers={setCustomers} />
            </TableCell>
            <TableCell>
                <DeleteCustomerModalComponent customer={customer} setCustomers={setCustomers} />
            </TableCell>
        </TableRow>
    )
}

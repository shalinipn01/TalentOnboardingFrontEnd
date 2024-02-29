import {
    TableRow,
    TableCell
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { EditSalesModalComponent } from './EditSalesModalComponent';
import { DeleteSaleModalComponent } from './DeleteSaleModalComponent';

export const SaleList = ({ sale , sales, setSales}) => {
    return (
        <TableRow>
            <TableCell >{sale.customerName}</TableCell>
            <TableCell>{sale.productName}</TableCell>
            <TableCell >{sale.storeName}</TableCell>
            <TableCell >{sale.dateSold}</TableCell>
            <TableCell>
                <EditSalesModalComponent sale={sale} sales={sales} setSales={setSales} />
            </TableCell>
            <TableCell>
                <DeleteSaleModalComponent sale={sale} setSales={setSales}/>
            </TableCell>
        </TableRow>
    )
}

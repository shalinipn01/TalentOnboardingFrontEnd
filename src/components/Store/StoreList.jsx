import {
    TableRow,
    TableCell
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { EditStoreModalComponent } from './EditStoreModalComponent';
import { DeleteStoreModalComponent } from './DeleteStoreModalComponent';

export const StoreList = ({ store, stores, setStores }) => {
    return (
        <TableRow>
            <TableCell >{store.name}</TableCell>
            <TableCell>{store.address}</TableCell>
            <TableCell>
                <EditStoreModalComponent store={store} stores={stores} setStores={setStores}/>
            </TableCell>
            <TableCell>
                <DeleteStoreModalComponent store={store} setStores={setStores}/>
            </TableCell>
        </TableRow>
    )
}

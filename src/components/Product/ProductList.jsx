import {
    TableRow,
    TableCell
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { EditProductModalComponent } from './EditProductModalComponent';
import { DeleteProductModalComponent } from './DeleteProductModalComponent';

export const ProductList = ({ product, products, setProducts }) => {
    return (
        <TableRow>
            <TableCell >{product.name}</TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell>
                <EditProductModalComponent product={product} products={products} setProducts={setProducts}/>
            </TableCell>
            <TableCell>
                <DeleteProductModalComponent product={product} setProducts={setProducts}/>
            </TableCell>
        </TableRow>
    )
}

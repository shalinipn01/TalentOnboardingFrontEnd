import { TabPane, Tab, Container, } from 'semantic-ui-react'
import { ReactContainer } from './ReactContainer';
import CustomerContainer from './Customer/CustomerContainer';
import { ProductContainer } from './Product/ProductContainer';
import { StoreContainer } from './Store/StoreContainer';
import { SalesContainer } from './Sale/SalesContainer';


export const HeaderTab = ({currentPage, setCurrentPage, recordsPerPage, setPageCount, setShowPagination}) => {
  const props = {currentPage, setCurrentPage, recordsPerPage, setPageCount, setShowPagination};
    const panes = [
        { menuItem: 'React', render: () => <TabPane attached='top' ><ReactContainer setShowPagination={setShowPagination}/></TabPane> },
        { menuItem: 'Customers', render: () => <TabPane attached='top' ><CustomerContainer {...props}/></TabPane> },
        { menuItem: 'Products', render: () => <TabPane attached='top' ><ProductContainer {...props}/></TabPane> },
        { menuItem: 'Stores', render: () => <TabPane attached='top' ><StoreContainer {...props}/></TabPane> },
        { menuItem: 'Sales', render: () => <TabPane attached='top' ><SalesContainer {...props}/></TabPane> },

      ]
    const color = 'black';
  return (
    <Container fluid>
    <Tab menu={{color, inverted: true }} panes={panes} />
    </Container>
    
  )
}

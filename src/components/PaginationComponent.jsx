import { Pagination } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export const PaginationComponent = ({currentPage, setCurrentPage, pageCount, showPagination}) => {
    const totalPages=20;
    
    const handlePageChange = (event, pageInfo) =>{       
        setCurrentPage(pageInfo.activePage);       
    }
    return (
        <>
        {showPagination &&
        <div className="ui right aligned segment small">
            <Pagination  activePage={currentPage} size='mini'
            boundaryRange={0} 
            totalPages={pageCount} onPageChange={handlePageChange}/>
        </div>}
        </>
    )
}

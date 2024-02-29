import { useState } from 'react'
import './App.css'
import { FooterComponent } from './components/FooterComponent'

import 'semantic-ui-css/semantic.min.css';
import { PaginationComponent } from './components/PaginationComponent'
import { HeaderTab } from './components/HeaderTab'
import {
  Input,
  Select, FormField, Form
} from 'semantic-ui-react'

function App() {

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(10);
  const [showPagination, setShowPagination] = useState(true);
  const recordsPerPageList = [1,2,3,4,5,6,7,8,9,10];
  
  return (
    <>
      <main >

        <HeaderTab currentPage={currentPage} setCurrentPage={setCurrentPage}
          recordsPerPage={recordsPerPage} setPageCount={setPageCount} setShowPagination={setShowPagination} />
        
        {showPagination && 
        <Form.Field control='select' defaultValue={recordsPerPage} onChange={(event) => setRecordsPerPage(event.target.value)} >

          {recordsPerPageList && recordsPerPageList.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </Form.Field>}

        <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage}
          pageCount={pageCount} showPagination={showPagination} />
      </main>
      <FooterComponent />

    </>
  )
}

export default App

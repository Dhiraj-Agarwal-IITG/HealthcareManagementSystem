import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Patient ID', width: 100 },
  { field: 'Name', headerName: 'Name', width: 100 },
  { field: 'age', headerName: 'Age',type:'number', width: 100 },
  { field: 'gender', headerName: 'Gender', width: 100 },
  { field: 'dob', headerName: 'Date of Birth', width: 100 },
  { field: 'mob', headerName: 'Mobile Number', width: 100 },
  { field: 'visits', headerName: 'Visits',type:'number', width: 100 },
];

const rows = [
  { id: 1,Name : 'Dhiraj' , dob: '11-10-2001', age:45,gender:'Male',mob:9566778891,visits:12 },
  { id: 2,Name: 'Cersei', dob: '11-10-2001', age:45,gender:'Male',mob:9566778891,visits:12 },
  { id: 3,Name: 'Jaime', dob: '11-10-2001', age:45,gender:'Male',mob:9566778891,visits:12  },
  { id: 4,Name: 'Arya', dob: '11-10-2001' , age:45,gender:'Male',mob:9566778891,visits:12 },
  { id: 5,Name: 'Daenerys', dob: null, age:'Fe09:23' ,gender:'Male',mob:9566778891,visits:12 },
  { id: 6, Name: null, dob: '11-10-2001' , age:45,gender:'Male',mob:9566778891,visits:12 },
  { id: 7, Name: 'Ferrara', dob:'11-10-2001', age:'Fe09:23',gender:'Male',mob:9566778891,visits:12  },
  { id: 8, Name: 'Rossini', dob: '11-10-2001', age:45,gender:'Male',mob:9566778891,visits:12  },
  { id: 9, Name: 'Harvey', dob: '11-10-2001', age:45,gender:'Male',mob:9566778891,visits:12  },
];

export default function PatientRecords() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pdob: 0, pdobSize: 5 },
          },
        }}
        pdobSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
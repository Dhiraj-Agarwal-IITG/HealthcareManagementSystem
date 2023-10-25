import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Patient ID', width: 100 },
  { field: 'Name', headerName: 'Name', width: 100 },
  { field: 'time', headerName: 'Time', width: 100 },
  { field: 'doctor', headerName: 'Doctor', width: 100 },
  { field: 'reason', headerName: 'Reason', width: 100 },
  { field: 'status', headerName: 'Status', width: 100 },
  { field: 'token', headerName: 'Token No', width: 100 },
];

const rows = [
  { id: 1,Name : 'Dhiraj' , reason: 'Fever and cold', time:'09:23',doctor:'Dr Dhiraj Agarwal',status:'Approved',token:1234 },
  { id: 2,Name: 'Cersei', reason: 42, time:'09:23',doctor:'Dr Dhiraj Agarwal',status:'Approved',token:1234 },
  { id: 3,Name: 'Jaime', reason: 45, time:'09:23',doctor:'Dr Dhiraj Agarwal',status:'Approved',token:1234  },
  { id: 4,Name: 'Arya', reason: 16 , time:'09:23',doctor:'Dr Dhiraj Agarwal',status:'Approved',token:1234 },
  { id: 5,Name: 'Daenerys', reason: null, time:'Fe09:23' ,doctor:'Dr Dhiraj Agarwal',status:'Approved',token:1234 },
  { id: 6, Name: null, reason: 150 , time:'09:23',doctor:'Dr Dhiraj Agarwal',status:'Approved',token:1234 },
  { id: 7, Name: 'Ferrara', reason: 44, time:'Fe09:23',doctor:'Dr Dhiraj Agarwal',status:'Approved',token:1234  },
  { id: 8, Name: 'Rossini', reason: 36, time:'09:23',doctor:'Dr Dhiraj Agarwal',status:'Approved',token:1234  },
  { id: 9, Name: 'Harvey', reason: 65, time:'Fe09:23',doctor:'Dr Dhiraj Agarwal',status:'Approved',token:1234  },
];

export default function DoctorAppoints() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { preason: 0, preasonSize: 5 },
          },
        }}
        preasonSizeOptions={[5,10]}
        checkboxSelection
      />
    </div>
  );
}
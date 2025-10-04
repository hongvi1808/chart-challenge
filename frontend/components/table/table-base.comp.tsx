'use client'
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DataGridProps } from '@mui/x-data-grid';


export default function TableBase(props: DataGridProps) {
  return (
      <DataGrid
        // rows={rows}
        // columns={columns}
        disableColumnMenu
        disableAutosize
        disableColumnResize
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        {...props}
      />
  );
}
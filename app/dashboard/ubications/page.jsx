'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import Swal from 'sweetalert2';
import Title from '@/app/ui/templates/dashboard/Title';

import DarkTitle from '@/app/ui/titles/DarkTitle';

export default function Orders() {
  const [ubicationData, setUbicationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/ubications");
        const data = await response.json();

        // Asume que la respuesta es una matriz de ubicaciones
        if (Array.isArray(data)) {
          setUbicationData(data);
        } else {
          setError('Invalid data format');
        }
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleDeleteUbication = async (ubicationId) => {
    try {
      await axios.delete(`http://localhost:8000/api/ubications/${ubicationId}`);
      setUbicationData(ubicationData.filter(ubication => ubication.id !== ubicationId));
    } catch (error) {
      console.error('Error deleting ubication:', error);
    }
  };

  const confirmDeleteUbication = (ubicationId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5680c1',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUbication(ubicationId);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <React.Fragment>
      <div className='flex justify-between mb-3'>
        <DarkTitle text={'Ubicaciones'} />
        <Link href="/dashboard/ubications/create" className='no-underline'>
          <div className='bg-primary-600 text-white py-1 px-4 rounded'>Crear</div>
        </Link>
      </div>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell className='font-bold'>ID</TableCell>
            <TableCell className='font-bold'>Place</TableCell>
            <TableCell className='font-bold'>Address</TableCell>
            <TableCell className='font-bold'>Capacity</TableCell>
            <TableCell className='font-bold'>Opens At</TableCell>
            <TableCell className='font-bold'>Closes At</TableCell>
            <TableCell className='font-bold'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ubicationData.map((ubication) => (
            <TableRow key={ubication.id}>
              <TableCell className='w-4'>{ubication.id}</TableCell>
              <TableCell className=''>{ubication.place}</TableCell>
              <TableCell className=''>{ubication.address}</TableCell>
              <TableCell className='w-6'>{ubication.capacity}</TableCell>
              <TableCell className='w-1/12'>{ubication.opens_at}</TableCell>
              <TableCell className='w-1/12'>{ubication.closes_at}</TableCell>
              <TableCell className='w-1/12'>
                <div>
                  <div className='bg-primary-400 border my-1 text-center rounded-md '>
                    <Link className='text-white no-underline' href={`/dashboard/ubications/edit/${ubication.id}`}>Editar</Link>
                  </div>
                  <div
                    className='text-white bg-danger-500 border my-1 text-center rounded-md cursor-pointer'
                    onClick={() => confirmDeleteUbication(ubication.id)}>
                    Delete
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

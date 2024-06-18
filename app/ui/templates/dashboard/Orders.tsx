import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DarkTitle from '@/app/ui/titles/DarkTitle';
import axios from 'axios';
import Swal from 'sweetalert2';

interface EventData {
  id: number;
  code: string;
  title: string;
  description: string;
  organizator: string;
  available_at: string;
  finish_at: string;
  capacity: number;
  ubication_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  imageURL: string;
  media: any[];
}

// Function to prevent default link behavior
function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  const [eventData, setEventData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  async function fetchData(page: number) {
    try {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/api/event?page=${page}`);
      const data = response.data;

      if (Array.isArray(data)) {
        setEventData(prevData => [...prevData, ...data]);

        // Assuming the API returns fewer events than a full page when there are no more events
        if (data.length < 10) {
          setHasMore(false);
        }
      } else {
        setError('Invalid data format');
      }
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteEvent = async (eventId: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/event/${eventId}`);
      setEventData(eventData.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const confirmDeleteEvent = (eventId: number) => {
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
        handleDeleteEvent(eventId);
        Swal.fire(
          'Deleted!',
          'Your event has been deleted.',
          'success'
        );
      }
    });
  };

  if (loading && currentPage === 1) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <React.Fragment>
      <div className='flex justify-between mb-3'>
        <DarkTitle text={'Eventos'} />
        <Link href="/dashboard/events/create" className='no-underline'>
          <div className='bg-primary-600 text-white py-1 px-4 rounded'>Crear</div>
        </Link>
      </div>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Organizator</TableCell>
            <TableCell>Available At</TableCell>
            <TableCell>Finish At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventData.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{new Date(event.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{event.title}</TableCell>
              <TableCell>{event.organizator}</TableCell>
              <TableCell className='w-1/12'>{new Date(event.available_at).toLocaleString()}</TableCell>
              <TableCell className='w-1/12'>{new Date(event.finish_at).toLocaleString()}</TableCell>
              <TableCell className='w-1/12'>
                <div>
                  <div className='bg-primary-400 border my-1 text-center rounded-md'>
                    <Link className='text-white no-underline' href={`/dashboard/events/edit/${event.id}`}>Edit</Link>
                  </div>
                  <div
                    className='text-white bg-danger-500 border my-1 text-center rounded-md cursor-pointer'
                    onClick={() => confirmDeleteEvent(event.id)}
                  >
                    Delete
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {hasMore && (
        <Link color="primary" href="#" onClick={(e) => { preventDefault(e); setCurrentPage(prevPage => prevPage + 1); }} sx={{ mt: 3 }}>
          See more events
        </Link>
      )}
    </React.Fragment>
  );
}

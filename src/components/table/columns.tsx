import { ColumnDef } from '@tanstack/react-table';
import { VehicleType, deleteVehicle } from '@/api/vehicle';
import { Button } from '../primitives/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { VehicleForm } from './vehicle-form';
import toast, { Toaster } from 'react-hot-toast';

export const columns: ColumnDef<VehicleType>[] = [
  {
    accessorKey: 'name',
    header: 'VEHICLE',
  },
  {
    accessorKey: 'manufacturer',
    header: 'MANUFACTURER',
  },
  {
    accessorKey: 'type',
    header: 'TYPE',
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: (cell) => {
      return (
        <div className='flex items-center justify-end'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='ghost' className='p-0 mx-2 w-5 h-5'>
                <Pencil />
              </Button>
            </DialogTrigger>
            <VehicleForm isUpdating={true} vehicle={cell.row.original} />
          </Dialog>
          <Button
            variant='ghost'
            className='p-0 mx-2 w-5 h-5'
            onClick={() => {
              console.log('Deleted vehicle with ID: ', cell.row.original.id);
              deleteVehicle(cell.row.original.id);
              toast.success('Vehicle Deleted Succesfully');
              window.location.reload();
            }}
          >
            <Trash color='red' />
            <Toaster position='bottom-right' />
          </Button>
        </div>
      );
    },
  },
];

import { VehicleType } from '@/types/vehicle';
import { ColumnDef } from '@tanstack/react-table';
import { Trash } from 'lucide-react';
import { EditVehicleModal } from '../modals/edit-vehicle';
import { Button } from '../primitives/ui/button';
import { TableOptions } from './table-options';

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
        <div className='flex gap-2 items-center justify-end'>
          <EditVehicleModal vehicle={cell.row.original} />
          <Button
            variant='ghost' size='sm'
          >
            <Trash color='red' className="w-5 h-5" />
          </Button>
        </div>
      );
    },
  },
];

import { VehicleType } from '@/types/vehicle';
import { ColumnDef } from '@tanstack/react-table';
import { EditVehicleModal } from '../modals/edit-vehicle';
import { DeleteVehicle } from '../modals/delete-vehicle';

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
          <DeleteVehicle id={cell.row.original.id} />
        </div>
      );
    },
  },
];

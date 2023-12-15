import { ColumnDef } from '@tanstack/react-table';
import { VehicleType } from '@/api/vehicle';

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
    accessorKey: 'id',
    header: (row) => <></>,
    enableHiding: true,
    cell: (row) => <></>,
  },
];

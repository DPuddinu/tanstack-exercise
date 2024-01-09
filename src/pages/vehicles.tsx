import { vehiclesQueryOptions } from '@/api/vehicle';
import { columns } from '@/components/table/columns';
import { DataTable } from '@/components/table/data-table';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

const Vehicles = () => {
  const vehiclesQuery = useSuspenseQuery(vehiclesQueryOptions);
  const prefetchedVehicles = vehiclesQuery.data;
  const {data: vehicles} = useQuery(vehiclesQueryOptions);

  return (
    <div className='flex flex-col gap-2'>
      <DataTable columns={columns} data={vehicles ?? prefetchedVehicles}></DataTable>
    </div>
  );
};

export default Vehicles;

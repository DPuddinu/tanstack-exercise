import { vehiclesQueryOptions, vehicleQueryOptions } from '@/api/vehicle';
import { columns } from '@/components/table/columns';
import { DataTable } from '@/components/table/data-table';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

const Vehicles = () => {
  const vehiclesQuery = useSuspenseQuery(vehiclesQueryOptions);
  const vehicles = vehiclesQuery.data;
  console.log(vehicles);

  return (
    <div className='flex flex-col gap-2'>
      {/* {vehicles.map((v) => (
        <Link
          key={v.id}
          to='/vehicle/$id'
          params={{ id: v.id }}
          className='pointer'
        >
          {v.name}
        </Link>
      ))} */}
      <DataTable columns={columns} data={vehicles}></DataTable>
    </div>
  );
};

export default Vehicles;
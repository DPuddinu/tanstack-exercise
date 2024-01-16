import { Trash } from 'lucide-react';
import { Button } from '../primitives/ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteVehicle, vehiclesQueryOptions } from '@/api/vehicle';
import { toast } from 'sonner';

interface DeleteVehicleProps {
  id: string;
}

export const DeleteVehicle = ({ id }: DeleteVehicleProps) => {
  const { refetch } = useQuery(vehiclesQueryOptions);
  const { isPending, mutate } = useMutation({
    mutationFn: () => deleteVehicle(id),
    onSuccess: () => {
      toast.success('Vehicle deleted succesfully', {
        position: 'bottom-right',
      });
      refetch();
    },
    onError: () => {
      toast.error('Ooops! Something went wrong', {
        position: 'bottom-right',
      });
    },
  });

  return (
    <Button variant='ghost' size='sm' disabled={isPending}>
      <Trash color='red' className='w-5 h-5' onClick={() => mutate()} />
    </Button>
  );
};

import { CreateVehicleType, createVehicle, updateVehicle, vehiclesQueryOptions } from '@/api/vehicle';
import { VehicleSchema, VehicleType } from '@/types/vehicle';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../primitives/ui/button';
import {
  DialogFooter
} from '../primitives/ui/dialog';
import { Input } from '../primitives/ui/input';
import { Spinner } from '../primitives/ui/spinner';

interface VehicleFormProps {
  vehicle?: VehicleType;
  onSubmitted: () => void;
}

export const VehicleForm = ({ vehicle, onSubmitted }: VehicleFormProps) => {

  const { mutate, error, isPending, isSuccess } = useMutation({
    mutationFn: (data: CreateVehicleType) => {
      return vehicle ? updateVehicle({
        id: vehicle.id,
        ...data
      }) : createVehicle(data)
    }
  });

  const { refetch } = useQuery(vehiclesQueryOptions);

  if (isSuccess) {
    onSubmitted()
    refetch()
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleType>({
    resolver: zodResolver(VehicleSchema),
    values: vehicle
  });

  const onSubmit: SubmitHandler<VehicleType> = (data) => {
    mutate(data)
  };

  return <form onSubmit={handleSubmit(onSubmit, () => console.log(errors))}>
    <Input
      label='Name'
      id='name'
      {...register('name')}
      className='col-span-4 my-4'
    />
    {errors.name && (
      <span style={{ color: 'red', fontSize: '12px' }}>
        {errors.name.message}
      </span>
    )}
    <Input
      label='Type'
      id='type'
      {...register('type')}
      className='col-span-4 my-4'
    />
    {errors.type && (
      <span style={{ color: 'red', fontSize: '12px' }}>
        {errors.type.message}
      </span>
    )}
    <Input
      label='Fuel'
      id='fuel'
      {...register('fuel')}
      className='col-span-4 my-4'
    />
    {errors.fuel && (
      <span style={{ color: 'red', fontSize: '12px' }}>
        {errors.fuel.message}
      </span>
    )}
    <Input
      label='Color'
      id='color'
      {...register('color')}
      className='col-span-4 my-4'
    />
    {errors.color && (
      <span style={{ color: 'red', fontSize: '12px' }}>
        {errors.color.message}
      </span>
    )}
    <Input
      label='Vrm'
      id='vrm'
      {...register('vrm')}
      className='col-span-4 my-4'
    />
    {errors.vrm && (
      <span style={{ color: 'red', fontSize: '12px' }}>
        {errors.vrm.message}
      </span>
    )}
    <Input
      label='Manufacturer'
      id='manufacturer'
      {...register('manufacturer')}
      className='col-span-4 my-4'
    />
    {errors.manufacturer && (
      <span style={{ color: 'red', fontSize: '12px' }}>
        {errors.manufacturer.message}
      </span>
    )}
    <DialogFooter>
      <Button className='w-28' type='submit'>{isPending ? <Spinner /> : 'Submit'}</Button>
    </DialogFooter>
  </form>
};

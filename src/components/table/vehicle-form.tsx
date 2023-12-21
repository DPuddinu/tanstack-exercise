import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../primitives/ui/dialog';
import { Button } from '../primitives/ui/button';
import { Input } from '../primitives/ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { faker } from '@faker-js/faker';
import { VehicleType, createVehicle, updateVehicle } from '@/api/vehicle';
const VehicleSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, { message: 'This field should be at least 3 characters' }),
  type: z
    .string()
    .min(3, { message: 'This field should be at least 3 characters' }),
  fuel: z
    .string()
    .min(3, { message: 'This field should be at least 3 characters' }),
  color: z
    .string()
    .min(3, { message: 'This field should be at least 3 characters' }),
  vrm: z
    .string()
    .min(3, { message: 'This field should be at least 3 characters' }),
  manufacturer: z
    .string()
    .min(3, { message: 'This field should be at least 3 characters' }),
});

type VehicleSchemaType = z.infer<typeof VehicleSchema>;

interface VehicleFormProps {
  isUpdating?: boolean;
  vehicle?: VehicleType;
}

export const VehicleForm = ({ isUpdating, vehicle }: VehicleFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VehicleSchemaType>({
    resolver: zodResolver(VehicleSchema),
  });
  const onCreateSubmit: SubmitHandler<VehicleSchemaType> = (data) => {
    data.id = faker.string.uuid();
    const newVehicle: VehicleType = {
      id: data.id,
      name: data.name,
      color: data.color,
      manufacturer: data.manufacturer,
      fuel: data.fuel,
      type: data.type,
      vrm: data.vrm,
    };
    console.log('Dati del form: ', data);
    console.log('Errori dello schema: ', errors);
    createVehicle(newVehicle);
    reset();
  };
  const onUpdateSubmit: SubmitHandler<VehicleSchemaType> = (data) => {
    const updatedVehicle: VehicleType = {
      id: data.id!,
      name: data.name,
      color: data.color,
      manufacturer: data.manufacturer,
      fuel: data.fuel,
      type: data.type,
      vrm: data.vrm,
    };
    console.log('Dati del form: ', data);
    console.log('Errori dello schema: ', errors);
    updateVehicle(updatedVehicle);
  };
  return isUpdating ? (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Vehicle</DialogTitle>
      </DialogHeader>
      WIP
    </DialogContent>
  ) : (
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle>Add New Vehicle</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onCreateSubmit, () => console.log(errors))}>
        <Input
          id='name'
          placeholder='NAME'
          {...register('name')}
          className='col-span-4 my-4'
        />
        {errors.name && (
          <span style={{ color: 'red', fontSize: '12px' }}>
            {errors.name.message}
          </span>
        )}

        <Input
          id='type'
          placeholder='TYPE'
          {...register('type')}
          className='col-span-4 my-4'
        />
        {errors.type && (
          <span style={{ color: 'red', fontSize: '12px' }}>
            {errors.type.message}
          </span>
        )}

        <Input
          id='fuel'
          placeholder='FUEL'
          {...register('fuel')}
          className='col-span-4 my-4'
        />
        {errors.fuel && (
          <span style={{ color: 'red', fontSize: '12px' }}>
            {errors.fuel.message}
          </span>
        )}

        <Input
          id='color'
          placeholder='COLOR'
          {...register('color')}
          className='col-span-4 my-4'
        />
        {errors.color && (
          <span style={{ color: 'red', fontSize: '12px' }}>
            {errors.color.message}
          </span>
        )}

        <Input
          id='vrm'
          placeholder='VRM'
          {...register('vrm')}
          className='col-span-4 my-4'
        />
        {errors.vrm && (
          <span style={{ color: 'red', fontSize: '12px' }}>
            {errors.vrm.message}
          </span>
        )}

        <Input
          id='manufacturer'
          placeholder='MANUFACTURER'
          {...register('manufacturer')}
          className='col-span-4 my-4'
        />
        {errors.manufacturer && (
          <span style={{ color: 'red', fontSize: '12px' }}>
            {errors.manufacturer.message}
          </span>
        )}

        <DialogFooter>
          <Button type='submit'>Submit</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

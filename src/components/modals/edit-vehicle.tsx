import { VehicleType } from "@/types/vehicle";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "../primitives/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../primitives/ui/dialog";
import { VehicleForm } from "../table/vehicle-form";

type TableOptionsProps = {
  vehicle?: VehicleType
}
export const EditVehicleModal = ({ vehicle }: TableOptionsProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {vehicle ?
          <Button variant='ghost' size='sm' onClick={() => setOpen(true)}>
            <Pencil className="h-5 w-5" />
          </Button> :
          <Button variant='outline' className=''>
            Add New Vehicle
          </Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{vehicle ? 'Update Vehicle' : 'Create Vehicle'}</DialogTitle>
        </DialogHeader>
        <VehicleForm vehicle={vehicle} onSubmitted={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
};


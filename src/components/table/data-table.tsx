import * as React from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/primitives/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/primitives/ui/dropdown-menu';

import { Link } from '@tanstack/react-router';
import { Button } from '../primitives/ui/button';
import { Input } from '@/components/primitives/ui/input';
import { VehicleType } from '@/api/vehicle';
import { ChevronsUpDown } from 'lucide-react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const rowsPerPage = [5, 10, 15, 20];

export function DataTable<TData extends VehicleType, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [filterValue, setFilterValue] = React.useState('name');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div>
      <div className='flex items-center'>
        <div className='flex items-center'>
          <span>Filter vehicles by</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                className='flex justify-between capitalize p-0 px-1 mx-4 gap-2'
              >
                {filterValue}
                <ChevronsUpDown className='w-3 h-3' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {table.getAllColumns().map((column) => {
                return (
                  <DropdownMenuItem
                    key={column.id}
                    className='capitalize'
                    onClick={() => setFilterValue(column.id)}
                  >
                    {column.id}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className='flex items-center py-4'>
            <Input
              placeholder='Search'
              onChange={(event) =>
                table.getColumn(filterValue)?.setFilterValue(event.target.value)
              }
              className='max-w-sm'
            />
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <Link
                        to='/vehicle/$id'
                        params={{ id: row.original.id }}
                        className='pointer'
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Link>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex gap-2'>
              <span>Rows per Page: </span>
              <Button
                className='flex justify-between h-6 p-0 px-1 mx-4 gap-2'
                variant='outline'
              >
                <div className='w-6'>
                  {table.getState().pagination.pageSize}
                </div>
                <ChevronsUpDown className='w-3 h-3' />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {rowsPerPage.map((el) => {
              return (
                <DropdownMenuItem
                  key={el}
                  onClick={() => table.setPageSize(el)}
                >
                  {el}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

'use client'
import { ListParams } from "@/base/models/common";
import { MetricsModel } from "@/base/models/metrics";
import { RootState, useAppDispatch, useAppSelector } from "@/base/store";
import { createMetricsThunk, deleteMetricsThunk, getMetricsThunk, updateMetricsThunk } from "@/base/store/thunks/metrics.thunk";
import { formatDate, formatDateToInput, validRequire } from "@/base/utils/func";
import { TextFiledControlBase } from "@/components/input/textfield.comp";
import TableBase from "@/components/table/table-base.comp";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material"
import { GridPaginationModel } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid";
import { FloppyDisk, NotePencil, Plus, Trash, X } from "phosphor-react";
import { useEffect, useState } from "react";

export default function MetricsPage() {
    const { loading, items, total } = useAppSelector((state: RootState) => state.metrics)
    const dispatchAsyn = useAppDispatch()
    const [openDiag, setOpenDiag] = useState(false);
    const [item, setItem] = useState<MetricsModel | null>(null);
    const [paginationModel, setPaginationModel] = useState<ListParams>({ page: 0, limit: 5 })

    useEffect(() => {
        dispatchAsyn(getMetricsThunk({ page: 1, limit: 5 }))
    }, [])

    const onToggleDiaglog = (selectedItem: MetricsModel | null) => {
        setItem(selectedItem)
        setOpenDiag(!openDiag)
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries())
        if (item) {
            const result = await dispatchAsyn(updateMetricsThunk({ ...data, id: item.id, date: data.date ? new Date((data.date as string)).getTime() : 0 }))
            if (updateMetricsThunk.fulfilled.match(result)) {
                onToggleDiaglog(null)
            }
        }
        else {
            const result = await dispatchAsyn(createMetricsThunk({ ...data, date: data.date ? new Date((data.date as string)).getTime() : 0 }))
            if (createMetricsThunk.fulfilled.match(result)) {
                onToggleDiaglog(null)
            }
        }
    }
    const handleOnPageChange = (model: GridPaginationModel) => {
        console.log('lo', model)
        setPaginationModel({ page: model.page, limit: model.pageSize })
        dispatchAsyn(getMetricsThunk({ page: model.page + 1, limit: model.pageSize }))
    }
    const handleDelete = async (selectedItem: MetricsModel) => {
        const result = dispatchAsyn(deleteMetricsThunk(selectedItem.id))
    }
    const columns: GridColDef[] = [
        { field: 'pos', headerName: 'Pos Revenue', flex: 0.25 },
        { field: 'eatclub', headerName: 'Eatclub Revenue', flex: 0.25 },
        { field: 'labourCosts', headerName: 'Labour Costs', flex: 0.25 },
        {
            field: 'date', headerName: 'Date', flex: 0.25, renderCell(params) {
                return <Box>{formatDate(params.row.date)}</Box>
            },
        },
        { field: 'impact', headerName: 'Impact', flex: 0.25 },
        {
            field: "action",
            headerName: "", flex: 0.25,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        color="primary" size="medium"
                        onClick={() => onToggleDiaglog(params.row)} >
                        <NotePencil size={24} weight="fill" />
                    </IconButton>
                    <IconButton
                        color="error" size="medium"
                        onClick={() => handleDelete(params.row.id)} >
                        <Trash size={24} weight="fill" />
                    </IconButton>

                </Box>
            ),
        },
    ];
    return (
        <Stack direction={'column'} spacing={4} sx={{ marginLeft: 2 }}>
            <Typography component={'h1'} variant="h6">{'Metrics Management'}</Typography>
            <Stack direction={'row'} spacing={2} justifyContent={'space-between'} sx={{ marginLeft: 2, marginBottom: 2 }}>
                <Typography component={'h1'} variant="h4">{''}</Typography>
                <Stack direction={'row'} spacing={2}>
                    <Button onClick={() => onToggleDiaglog(null)} variant="outlined" startIcon={<Plus />}>
                        {'Add metrics'}
                    </Button>
                </Stack>
            </Stack>

            <TableBase paginationMode="server"
                rowCount={total || 0}
                loading={loading} rows={items} columns={columns}
                onPaginationModelChange={handleOnPageChange}
                paginationModel={{ page: paginationModel.page, pageSize: paginationModel.limit }}
            />
            <Dialog fullWidth maxWidth={'md'} open={openDiag} onClose={() => onToggleDiaglog(null)}>
                <DialogTitle>{item ? 'Update metrics' : 'Add new metrics'}</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        id="metrics-form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}
                    >
                        <TextFiledControlBase
                            name='pos'
                            label="Pos Revenue*"
                            inputProps={{ required: true, defaultValue: item?.pos, type: 'number' }}
                            getErrorMessage={validRequire}
                        />
                        <TextFiledControlBase
                            name='eatclub'
                            label="Eatclub Revenue*"
                            inputProps={{ required: true, defaultValue: item?.eatclub, type: 'number' }}
                            getErrorMessage={validRequire}
                        />
                        <TextFiledControlBase
                            name='labourCosts'
                            label="Labour Costs*"
                            inputProps={{ required: true, defaultValue: item?.labourCosts, type: 'number' }}
                            getErrorMessage={validRequire}
                        />
                        <TextFiledControlBase
                            name='date'
                            label="Date*"
                            inputProps={{ required: true, defaultValue: item ? formatDateToInput(item?.date) : formatDateToInput(new Date()), type: 'date' }}
                            getErrorMessage={validRequire}
                        />

                    </Box>
                </DialogContent>
                <DialogActions sx={{ margin: 2 }} >
                    <Button onClick={() => onToggleDiaglog(null)} variant="outlined" color="error" startIcon={<X />}>
                        {'Cancel'}
                    </Button>
                    <Button type="submit" loading={loading} form={'metrics-form'} variant="contained" color="primary" startIcon={<FloppyDisk />}>
                        {'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}

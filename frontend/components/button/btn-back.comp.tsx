'use client';
import { ButtonProps, IconButton, Stack } from '@mui/material';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'phosphor-react';

export function ButtonBack(props: ButtonProps) {
    const router = useRouter()
    return (
        <Stack width={36} height={28}>
            <IconButton size={'medium'} onClick={() => router.back()}>
                <ArrowLeft />
            </IconButton>
        </Stack>
    );
}



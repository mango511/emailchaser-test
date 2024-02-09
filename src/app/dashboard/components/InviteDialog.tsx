import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import React from 'react'

type Props = {
    open: boolean,
    setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export const InviteDialog = ({ open, setOpen }: Props) => {
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData as any).entries());
                    const email = formJson.email;
                    handleClose();
                },
            }}
        >
            <DialogTitle>Invitation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To invite a co-worker into your team, please enter his/her email address here. We will send invitation occasionally.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant='outlined'>Cancel</Button>
                <Button type="submit" variant='contained'>Invite</Button>
            </DialogActions>
        </Dialog>
    )
}
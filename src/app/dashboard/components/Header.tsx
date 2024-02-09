"use client";
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { resetUser } from '@/features/user';
import { Button, Fab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { InviteDialog } from './InviteDialog';

type Props = {}

const Header = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const dispatch = useAppDispatch();
  const { logoutUser } = useAuth();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  const handleInviteClick = () => {
    // Api request for inviting team mate!!!!

    setOpen(true);
  }

  const handleLogoutClick = () => {
    try {
      logoutUser();
      dispatch(resetUser());
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='p-6 flex flex-row justify-between content-center border-b-2 border-red'>
      <Typography variant='subtitle2'>Emailchaser</Typography>
      <div className='flex flex-row gap-2'>
        <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={handleInviteClick}>Invite your team</Button>
        {user.user.email}
        <Button variant='outlined' color='primary' onClick={handleLogoutClick}>Log Out</Button>
      </div>
      <InviteDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Header
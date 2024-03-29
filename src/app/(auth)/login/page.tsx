"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { UserData } from "@/types/user";
import { Input } from "@/components/input/input";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import {Snackbar} from "@mui/material";
import { LoginFormValues } from "@/types/user";
import Alert from "@/components/alert";
import loginSchema from "./schema";
import { useAppDispatch } from "@/redux/hooks";
import { resetUser, setUser } from "@/features/user";

export default function LoginPage() {
  const router = useRouter();
  const [openAlert, setOpenAlert] = React.useState(false);
  const { register, watch, handleSubmit, formState: { errors }, reset } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { loginUser } = useAuth();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoading(true);
      
      // const respond: any = await axios.get(`${process.env.API_URL}/users?email=${encodeURIComponent(watch('email'))}&password=${encodeURIComponent(watch('password'))}`)
      // const user: UserData[] = respond.data;
      // if (user.length > 0) {
      //   loginUser();
      //   dispatch(setUser(user[0]));
      //   router.push("/dashboard");
      //   return;
      // } else {
      //   reset();
      //   dispatch(resetUser());
      //   setOpenAlert(true);
      // }
      
      loginUser();
      router.push('./dashboard');
    } catch (e) {
      console.log(e);
      setOpenAlert(true);
    } finally {
      setLoading(false);
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Link href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
      </Link>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6 flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
            <Input
              // ref={inputRef}
              id="email"
              type="text"
              {...register('email')}
              label="Email"
              error={errors.email?.message}
              required
              autoFocus
            />

            <Input
              id="password"
              type="password"
              {...register('password')}
              label="Password"
              error={errors.password?.message}
              required
            />

            <Button
              type="submit"
              variant="contained"
              disabled={buttonDisabled}
            >
              Login
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <Link href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
            </p>
          </form>
          <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
              Login Failed
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  )
}

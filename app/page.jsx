"use client";

import { useEffect } from "react";
import Link from "next/link";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Logo from '@/public/img/10code_logo.jpg';
import WhiteLogo from '@/public/img/logo-blanco.png';
import fondo from '@/public/img/fondo_login.jpg';


export default function Login() {

  return (
    <div className="mx-auto w-screen h-screen">
          <Image
            src={fondo}
            alt="Logo de la empresa 10Code"
            fill={true}
            className="mx-auto -z-50"
          />

      <div className=" flex flex-col justify-evenly z-5 w-screen h-screen">

        <div className="flex justify-center ">
            <div className="bg-white bg-opacity-70 py-10 px-16 rounded-3xl">
              <Image
                  src={Logo}
                  alt="Logo de la empresa 10Code"
                  width={244}
                  height={67}
                  className="mx-auto mb-9"
                />

              <div className="card-body w-80">
                <form method="POST" action="/login">
                  {/* CSRF token */}
                  {/* <input type="hidden" name="_token" value={{ csrf_token() }} /> */}

                  <div className="mb-3">
                    <label htmlFor="email" className="block">
                      <strong>Correo electrónico</strong>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full border border-gray-300 rounded-md"
                      name="email"
                      required
                      autoComplete="email"
                      autoFocus
                    />
                    {/* Error handling */}
                    {/* @error('email') */}
                    {/* <span className="invalid-feedback" role="alert"> */}
                    {/* <strong>{{ $message }}</strong> */}
                    {/* </span> */}
                    {/* @enderror */}
                  </div>

                  <div className="position-relative mb-3 w-auto">
                    <label htmlFor="password" className="block">
                      <strong>Contraseña</strong>
                    </label>
                    <div className="flex aling-center w-full">
                      <input
                        id="password"
                        type="password"
                        className="w-full border border-gray-300 border-e-0 rounded-s-md"
                        name="password"
                        required
                        autoComplete="current-password"
                      />
                      <div className="bg-white border border-gray-300 border-s-0 rounded-e-md flex items-center justify-center">
                        <FontAwesomeIcon icon={faEyeSlash} className="px-2" />
                      </div>

                    </div>


                    {/* Error handling */}
                    {/* @error('password') */}
                    {/* <span className="invalid-feedback" role="alert"> */}
                    {/* <strong>{{ $message }}</strong> */}
                    {/* </span> */}
                    {/* @enderror */}
                  </div>

                  <div className="form-group form-check mb-3 flex items-center justify-between my-5">
                    <div className="flex items-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="remember"
                        id="remember"
                      />
                      <label className="form-check-label" htmlFor="remember">
                        Recuérdame
                      </label>
                    </div>

                    <p href="/forgot-password">
                      <a className="btn btn-link ml-auto text-title-color-900 font-semibold underline">
                        Olvidé mi contraseña
                      </a>
                    </p>
                  </div>

                  <div className="my-5">
                    <button
                      id="boton_login"
                      type="submit"
                      className="btn btn-primary w-full py-[10px] my-[15px 0px 30px 0px] bg-primary-600 text-white rounded-md"
                    >
                      Iniciar sesión
                    </button>

                  </div>

                </form>
                <div className="text-center">
                  No tengo cuenta. <Link href="/register" className="text-secondary-400">Regístrate aquí</Link>
                </div>
              </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
              src={WhiteLogo}
              alt="Logo de la empresa 10Code"
              width={244}
              height={67}
              className="mx-auto my-[35px 0px 15px 0px]"
            />
        </div>

      </div>





    </div>
  );

}

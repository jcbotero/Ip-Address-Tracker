
'use client' // next por default trabaja desde el lado del servidor y asi no me deja usar usestate... por eso con esta linea trabajo desde el lado del client

import styles from './page.module.css'
import React, { useEffect, useRef, useState } from 'react';
//import { useHistory, useNavigate } from 'react-router-dom'
import { useRouter } from 'next/navigation';

export default function Home() {

  const [ ip , setIp] = useState()
  const [ locations , setLocation] = useState()
  const [ timezone , setTimezone] = useState()
  const [ isp , setIsp] = useState()
 
  const ipNumber = useRef(null);
  const ipActual = "ipAddress=5.6.7.8"

  const router = useRouter();

async function getData() { /* una async function por que toma tiempo sacar la data y es un proceso temporal de varios pasos*/

//let navigate = useNavigate();
//const history = useHistory();

const apiURL = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_CTtcyBJW9Jl8XrGXE8kxVpVKsC9ZM&' // el link de la api ... normalmente lo señalan como "making request"
const apiKey = 'at_CTtcyBJW9Jl8XrGXE8kxVpVKsC9ZM'; // mi apy key... es como la consrtaseña que me dan para poder hacerle request a la api y traer la info.. no la debo usar por que al revisar esta escrita link de arriba



const response = await fetch(window.history.pushState(ipActual, "", apiURL)); /* el await hace parte de la async function y me dice que se ejecute una vez se complete esta parte, el fetch() da la interfaz para manipular data de la api*/
const data = await response.json(); /* le pongo el json()*/


const {ip, location, isp} = data /* saco el object de la api que el que tiene la info, lo saco poniendo en el browser la url de la appi para mirar como esta codeado*/
   setIp( data.ip )
   setLocation(data.location.city + ", " + data.location.region) // aqui declaro los usestates para tomar la info de la api
   setTimezone(data.location.timezone)
   setIsp(data.isp) 
}

  // mirar ultimo fav
  // buscar append text input to url react

  return (
    <main className={styles.main}>
        <section className={styles.header}>
           <h1>IP Address Tracker</h1>
           <article className='input'>
               <input ref={ipNumber} placeholder='Search for any address or domain'></input>
               <button onClick={getData}></button>
           </article>
        </section>
        <section className={styles.ipptracker}>
        <div>
           <p>{ip}</p>  
           <p>{locations}</p>  
           <p>{timezone}</p>  
           <p>{isp}</p>  
       </div>
        </section>
    </main>
  )
}

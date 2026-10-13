//DEFINICION DE VARIABLES GLOBALES
const formulario = document.querySelector("#form");
const depositoInput = document.querySelector("#depositoInput");
const porcentajeInput = document.querySelector("#porcentajeInput");
const rolloverInput = document.querySelector("#rolloverInput");
const tipoBonoInput = document.querySelector("#tipoBonoInput");
const monedaInput = document.querySelector("#monedaInput");
const speech = document.querySelector("#speech1");
const speech2 = document.querySelector("#speech2");
const speech3 = document.querySelector("#speech3");
const BonosNomenclatura = document.querySelector("#nomenclatura");
const speechContainer = document.querySelector("#showSpeech");

//Maximos de acreditación
const maximoVES = 7305;
const maximoCLP = 250000;
const maximoPEN = 750;
const maximoUSD = 250;
const maximoARS = 293000;
const maximoCRC = 126250;
const maximoGTQ = 1924;
const maximoHNL = 6480;
const maximoMXN = 4900;
const maximoBOB = 1727;
const maximoProactiveVES = 2500;
const maximoProactiveCLP = 80000;
const maximoProactivePEN = 340;
const maximoProactiveUSD = 100;
const maximoProactiveMXN = 3000;
const maximoProactiveBOB = 50;
const maximoProactiveARS = 95000;
const maximoProactiveCRC = 50200;
const maximoProactiveGTQ = 770;
const maximoProactiveHNL = 2530;

//Montos maximos de apuesta para bonos proactive
const apuestaMaximaVES = 6200 + " VES";
const apuestaMaximaCLP = 50000 + " CLP";
const apuestaMaximaPEN = 200 + " PEN";
const apuestaMaximaUSD = 50 + " USD";
const apuestaMaximaCRC = 25000 + " CRC";
const apuestaMaximaMXN = 1000 + " MXN";
const apuestaMaximaHNL = 1300 + " HNL";
const apuestaMaximaARS = 60000 + " ARS";
const apuestaMaximaBOB = 350 + " BOB";
const apuestaMaximaGTQ = 500 + " GTQ";
const apuestaMaximaCAD = 50 + " CAD";

//Nomenclaturas
let nomenclaturas = {
  CASINOVIP: "BONO CASINOVIP 50% ROLLOVERX17 - ID ",
  SPORTVIP: "BONO SPORTVIP 55% ROLLOVERX18 - ID ",
  ENVIVOVIP: "BONO ENVIVOVIP 45% ROLLOVERX35 - ID ",
  FINVIPCASINO: "BONO FINVIP 50% ROLLOVERX21 - ID ",
  FINVIPDEPORTES: "BONO FINVIP 50% ROLLOVERX19 - ID ",
  COPAVIP: "BONO COPAVIP 60% ROLLOVERX19 - ID ",
  PROACTIVE: "BONO NOMBRE PORCENTAJE% ROLLOVERX21 - ID ",
  MICUMPLEVIP4: "BONO MICUMPLEVIP4 140% ROLLOVERX21 - ID ",
  MICUMPLEVIP5: "BONO MICUMPLEVIP5 150% ROLLOVERX21 - ID ",
};

/*******************IMPORTS DE COPAVIP*********************/
import { speechCopaVIP, maximosCopaVIP } from "../data/speech.COPAVIP.js";
import {
  maximosCUMPLEVIP,
  speechCumpleVIP150,
  speechCumpleVIP140,
} from "../data/CUMPLEVIP/speech.CUMPLEVIP.js";

/*******************-------------------*********************/

//Se usan en la función obtenerMeta()
let total = 0;
let acumulado = 0;
///No se visualiza un maximo de acreditación para las monedas: CRC, HNL y GTQ

/***********DEFINICIÓN DE EVENTOS*************/

//Cada que el formulario cambia, se obtiene el tipo de bono. Se actualiza el % y el rollover
formulario.addEventListener("change", () => {
  actualizarInput(tipoBonoInput.value); //cada que se actualiza, obtiene el nuevo valor del input
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  //Obtención de valores
  let deposito = parseFloat(depositoInput.value);
  let porcentaje = parseFloat(porcentajeInput.value);
  let rollover = parseFloat(rolloverInput.value);

  obtenerMeta(deposito, porcentaje, rollover);
  slowDown();
});
/***********----------------------------*************/

//DEFINICIÓN DE FUNCIONES

//Logica para obtener el monto depositado, bonificacion a acreditar y rollover
function obtenerMeta(deposito, porcentaje, rollover) {
  porcentaje = porcentaje / 100;
  acumulado = deposito * porcentaje; //Lo que se le acreditará al usuario como bonificación
  total = (acumulado + deposito) * rollover;

  speechBono(tipoBonoInput.value, deposito, acumulado, total, rollover);
}

//Funcion para Mostrar los TyC por pantalla
function speechBono(bono, deposito, acumulado, total, rollover) {
  //SPEECH DE CADA BONO
  let speechs = {
    //Casinovip
    casinovipVES: `Con el código CASINOVIP, ¡puedes reclamar 50% adicional con un depósito mínimo de 300.00 VES! Con un rollover X17 para tu entretenimiento en la sección de CASINO Slot, dicho bono tendrá un máximo de acreditación de 7,305.00 VES. 
        `,
    casinovipCLP: `
        Con el código CASINOVIP, ¡Puedes reclamar 50% adicional con un depósito mínimo de 20,000.00 CLP! Con un rollover X17 para tu entretenimiento en la sección de CASINO Slot, dicho bono tendrá un máximo de acreditación de 250,000.00 CLP. 
        `,
    casinovipPEN: `
        Con el código CASINOVIP, ¡Puedes reclamar 50% adicional con un depósito mínimo de 15.00 PEN! Con un rollover X17 para tu entretenimiento en la sección de CASINO Slot, dicho bono tendrá un máximo de awcreditación de 750,00 PEN. 
        `,
    casinovipUSD: `
        Con el código CASINOVIP, ¡Puedes obtener el 50% adicional con un depósito mínimo de 20.00 USD! Con un rollover X17 para tu entretenimiento en la sección de CASINO Slot, dicho bono tendrá un máximo de acreditación de 250.00 USD. 
        `,
    casinovipARS: `
        Con el código CASINOVIP, ¡Puedes reclamar el 50% adicional con un depósito mínimo de 23.500,00 ARS! Con un rollover X17 para tu entretenimiento en la sección de Casino Slot, dicho bono tendrá un máximo de acreditación de 293.000,00 ARS.
        `,
    casinovipCRC: `
        Con el código CASINOVIP, ¡Puedes reclamar el 50% adicional con un depósito mínimo de 10.100,00 CRC! Con un rollover X17 para tu entretenimiento en la sección de Casino Slot, dicho bono tendrá un máximo de acreditación de 126.250,00 CRC.
        `,
    casinovipGTQ: `
        Con el código CASINOVIP, ¡Puedes reclamar el 50% adicional con un depósito mínimo de 155,00 GTQ! Con un rollover X17 para tu entretenimiento en la sección de Casino Slot, dicho bono tendrá un máximo de acreditación de 1924,00 GTQ.
        `,
    casinovipHNL: `
        Con el código CASINOVIP, ¡Puedes reclamar el 50% adicional con un depósito mínimo de 520,00 HNL! Con un rollover X17 para tu entretenimiento en la sección de Casino Slot, dicho bono tendrá un máximo de acreditación de 6.480,00 HNL.
        `,
    casinovipMXN: `
        Con el código CASINOVIP, ¡Puedes reclamar el 50% adicional con un depósito mínimo de 395,00 MXN! Con un rollover X17 para tu entretenimiento en la sección de Casino Slot, dicho bono tendrá un máximo de acreditación de 4.900,00 MXN.
        `,
    casinovipBOB: `
        Con el código CASINOVIP, ¡Puedes reclamar el 50% adicional con un depósito mínimo de 138,00 BOB! Con un rollover X17 para tu entretenimiento en la sección de Casino Slots, dicho bono tendrá un máximo de acreditación de 1727,00 BOB.
        `,

    //-----------DEPORTES------------
    sportvipVES: `
        Con el código SPORTVIP, ¡Puedes reclamar el 55% adicional con un depósito mínimo de 300.00 VES! Con un rollover X18 para tu entretenimiento en la sección de Deportes, dicho bono tendrá un máximo de acreditación de 7,305.00 VES.
        `,
    sportvipCLP: `
        Con el código SPORTVIP, ¡Puedes reclamar el 55% adicional con un depósito mínimo de 20,000.00 CLP! Con un rollover X18 para tu entretenimiento en la sección de Deportes, dicho bono tendrá un máximo de acreditación de 250,000.00 CLP.
        `,
    sportvipPEN: `
        Con el código SPORTVIP, ¡Puedes reclamar el 55% adicional con un depósito mínimo de 15.00 PEN! Con un rollover X18 para tu entretenimiento en la sección de Deportes, dicho bono tendrá un máximo de acreditación de 750,00 PEN.
        `,
    sportvipUSD: `
        Con el código SPORTVIP, ¡Puedes reclamar el 55% adicional con un depósito mínimo de 20.00 USD! Con un rollover X18 para tu entretenimiento en la sección de Deportes, dicho bono tendrá un máximo de acreditación de 250.00 USD. 
        `,
    sportvipARS: `
        con el código SPORTVIP, ¡Puedes reclamar el 55% adicional con un depósito mínimo de 23.500,00 ARS! Con un rollover X18 para tu entretenimiento en la sección de Deportes, dicho bono tendrá un máximo de acreditación de 293.000,00 ARS. ¡
        `,
    sportvipCRC: `
        con el código SPORTVIP, ¡Puedes reclamar el 55% adicional con un depósito mínimo de 10.100,00 CRC! Con un rollover X18 para tu entretenimiento en la sección de Deportes, dicho bono tendrá un máximo de acreditación de 126.250,00 CRC. 
        `,
    sportvipGTQ: `
        con el código SPORTVIP, ¡Puedes reclamar el 55% adicional con un depósito mínimo de 155,00 GTQ! Con un rollover X18 para tu entretenimiento en la sección de Deportes, dicho bono tendrá un máximo de acreditación de 1924,00 GTQ. 
        `,
    sportvipHNL: `
        con el código SPORTVIP, ¡Puedes reclamar el 55% adicional con un depósito mínimo de 520,00 HNL! Con un rollover X18 para tu entretenimiento en la sección de Deportes, dicho bono tendrá un máximo de acreditación de 6.480,00 HNL.
        `,
    sportvipMXN: `
        con el código SPORTVIP, ¡Puedes reclamar el 55% adicional con un depósito mínimo de 395,00 MXN! Con un rollover X18 para tu entretenimiento en la sección de Deportes, dicho bono tendrá un máximo de acreditación de 4.900,00 MXN. 
        `,
    sportvipBOB: `
        Con el código SPORTVIP, ¡Puedes reclamar el 55% adicional con un depósito mínimo de 138,00 BOB! Con un rollover X18 para tu entretenimiento en la sección de Deportes, dicho bono tendrá un máximo de acreditación de 1727,00 BOB.
        `,

    //ENVIVOVIP
    envivovipVES: `
        Con el código ENVIVOVIP, ¡Puedes reclamar 45% adicional con un depósito mínimo de 1,000.00 VES! Con un rollover X35 para tu entretenimiento en la sección de CASINO EN VIVO, dicho bono tendrá un máximo de acreditación de 7,305.00 VES. 
        `,
    envivovipCLP: `
        Con el código ENVIVOVIP, ¡Puedes reclamar 45% adicional con un depósito mínimo de 50,000.00 CLP! Con un rollover X35 para tu entretenimiento en la sección de CASINO EN VIVO, dicho bono tendrá un máximo de acreditación de 250,000.00 CLP. 
        `,
    envivovipPEN: `
        Con el código ENVIVOVIP, ¡Puedes reclamar 45% adicional con un depósito mínimo de 100.00 PEN! Con un rollover X35 para tu entretenimiento en la sección de CASINO EN VIVO, dicho bono tendrá un máximo de acreditación de 750.00 PEN. 
        `,
    envivovipUSD: `
        Con el código ENVIVOVIP, ¡Puedes reclamar 45% adicional con un depósito mínimo de 45.00 USD! Con un rollover X35 para tu entretenimiento en la sección de CASINO EN VIVO, dicho bono tendrá un máximo de acreditación de 250.00 USD.
        `,
    envivovipARS: `
        Con el código ENVIVOVIP, ¡Puedes reclamar el 45% adicional con un depósito mínimo de 52.800,00 ARS! Con un rollover X35 para tu entretenimiento en la sección de CASINO EN VIVO, dicho bono tendrá un máximo de acreditación de 293.000,00 ARS.
        `,
    envivovipCRC: `
        Con el código ENVIVOVIP, ¡Puedes reclamar el 45% adicional con un depósito mínimo de 22.750,00 CRC! Con un rollover X35 para tu entretenimiento en la sección de CASINO EN VIVO, dicho bono tendrá un máximo de acreditación de 126.250,00 CRC. 
        `,
    envivovipGTQ: `
        Con el código ENVIVOVIP, ¡Puedes reclamar el 45% adicional con un depósito mínimo de 350,00 GTQ! Con un rollover X35 para tu entretenimiento en la sección de CASINO EN VIVO, dicho bono tendrá un máximo de acreditación de 1924,00 GTQ. 
        `,
    envivovipHNL: `
        Con el código ENVIVOVIP, ¡Puedes reclamar el 45% adicional con un depósito mínimo de 1170,00 HNL! Con un rollover X35 para tu entretenimiento en la sección de CASINO EN VIVO, dicho bono tendrá un máximo de acreditación de 6.480,00 HNL. 
        `,
    envivovipMXN: `
        Con el código ENVIVOVIP, ¡Puedes reclamar el 45% adicional con un depósito mínimo de 890,00 MXN! Con un rollover X35 para tu entretenimiento en la sección de CASINO EN VIVO, dicho bono tendrá un máximo de acreditación de 4.900,00 MXN. 
        `,
    envivovipBOB: `
        Con el código ENVIVOVIP, ¡Puedes reclamar el 45% adicional con un depósito mínimo de 310,00 BOB! Con un rollover X35 para tu entretenimiento en la sección de Casino en Vivo, dicho bono tendrá un máximo de acreditación de 1727,00 BOB.
        `,

    //FINVIP CASINO ROLLOVERX21
    CasinoFINVIPVES: `
        Con el código FINVIP, ¡Puedes reclamar el 50% adicional con un depósito mínimo de 300,00 VES! Con un rollover X21 para tu entretenimiento en la sección de Casino Slot, dicho bono tendrá un máximo de acreditación de 7,305.00 VES. 
        `,
    CasinoFINVIPCLP: `
        Con el código FINVIP, ¡Puedes reclamar el 50% adicional con un depósito mínimo de 10.000,00 CLP! Con un rollover X21 para tu entretenimiento en la sección de Casino Slot, dicho bono tendrá un máximo de acreditación de 250,000.00 CLP. 
        `,
    CasinoFINVIPPEN: `
        Con el código FINVIP, ¡Puedes reclamar el 50% adicional con un depósito mínimo de 15,00 PEN! Con un rollover X21 para tu entretenimiento en la sección de Casino Slot, dicho bono tendrá un máximo de acreditación de 750,00 PEN.
        `,
    CasinoFINVIPUSD: `
        Con el código FINVIP, ¡Puedes reclamar el 50% adicional con un depósito mínimo de 10,00 USD! Con un rollover X21 para tu entretenimiento en la sección de Casino Slot, dicho bono tendrá un máximo de acreditación de 250.00 USD.
        `,
    CasinoFINVIPCRC: `
        Con el código FINVIP, ¡Puedes reclamar el 50% adicional con un depósito mínimo de 5.000,00 CRC! Con un rollover X21 para tu entretenimiento en la sección de Casino Slot, dicho bono tendrá un máximo de acreditación de 126.250,00 CRC. 
        `,
    CasinoFINVIPARS: `
        Con el código FINVIP, ¡puedes reclamar el 50% adicional con un depósito mínimo de 12.000,00 ARS! Con un rollover X21 para tu entretenimiento en la sección de Casino Slot, dicho bono tendrá un máximo de acreditación de 293.000,00 ARS. 
        `,
    CasinoFINVIPGTQ: `
        con el código FINVIP, ¡puedes reclamar el 50% adicional con un depósito mínimo de 80,00 GTQ! Con un rollover X21 para tu entretenimiento en la sección de Casino Slot, dicho bono tendrá un máximo de acreditación de 1924,00 GTQ.
        `,
    CasinoFINVIPHNL: `
        Con el código FINVIP, ¡puedes reclamar el 50% adicional con un depósito mínimo de 260,00 HNL! Con un rollover X21 para tu entretenimiento en la sección de Casino Slot, dicho bono tendrá un máximo de acreditación de 6.480,00 HNL.
        `,
    CasinoFINVIPMXN: `
        Con el código FINVIP, ¡puedes reclamar el 50% adicional con un depósito mínimo de 200,00 MXN! Con un rollover X21 para tu entretenimiento en la sección de Casino Slot, dicho bono tendrá un máximo de acreditación de 4.900,00 MXN. 
        `,

    //FINVIP DEPORTES ROLLOVERX19
    DeporteFINVIPVES: `
        Con el código FINVIP, ¡Puedes reclamar el 50% adicional con un depósito mínimo de 300,00 VES! Con un rollover X19 para tu entretenimiento en la sección de Deportes, dicho bono tendrá un máximo de acreditación de 7.305,00 VES. 
        `,
    DeporteFINVIPCLP: `
        Con el código FINVIP, ¡Puedes reclamar el 50% adicional con un depósito mínimo de 10.000,00 CLP! Con un rollover X19 para tu entretenimiento en la sección de Deportes, dicho bono tendrá un máximo de acreditación de 250.000,00 CLP. 
        `,
    DeporteFINVIPPEN: `
        Con el código FINVIP, ¡Puedes reclamar el 50% adicional con un depósito mínimo de 15,00 PEN! Con un rollover X19 para tu entretenimiento en la sección de Deportes, dicho bono tendrá un máximo de acreditación de 750,00 PEN. 
        `,
    DeporteFINVIPUSD: `
        Con el código FINVIP, ¡Puedes reclamar el 50% adicional con un depósito mínimo de 10,00 USD! Con un rollover X19 para tu entretenimiento en la sección de Deportes, dicho bono tendrá un máximo de acreditación de 250,00 USD.
        `,
    DeporteFINVIPCRC: `
        Con el código FINVIP, ¡Puedes reclamar el 50% adicional con un depósito mínimo de 5.000,00 CRC! Con un rollover X19 para tu entretenimiento en la sección de Deportes, dicho bono tendrá un máximo de acreditación de 126.250,00 CRC. 
        `,
    DeporteFINVIPARS: `
        Con el código FINVIP, ¡puedes reclamar el 50% adicional con un depósito mínimo de 12.000,00 ARS! Con un rollover X19 para tu entretenimiento en la sección de Deportes, dicho bono tendrá un máximo de acreditación de 293.000,00 ARS. 
        `,
    DeporteFINVIPGTQ: `
        Con el código FINVIP, ¡puedes reclamar el 50% adicional con un depósito mínimo de 80,00 GTQ! Con un rollover X19 para tu entretenimiento en la sección de Deportes, dicho bono tendrá un máximo de acreditación de 1924,00 GTQ. 
        `,
    DeporteFINVIPHNL: `
        Con el código FINVIP, ¡puedes reclamar el 50% adicional con un depósito mínimo de 260,00 HNL! Con un rollover X19 para tu entretenimiento en la sección de Deportes, dicho bono tendrá un máximo de acreditación de 6.480,00 HNL.
        `,
    DeporteFINVIPMXN: `
        Con el código FINVIP, ¡puedes reclamar el 50% adicional con un depósito mínimo de 200,00 MXN! Con un rollover X19 para tu entretenimiento en la sección de Deportes, dicho bono tendrá un máximo de acreditación de 4.900,00 MXN. 
        `,
  };

  let depositoMod = deposito.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let acumuladoMod = acumulado.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let totalMod = total.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  //TyC DE CASINO SLOTS PARA BONOS VIP
  let speechCasinoVIP = `
    Para los bonos que sean exclusivos para la sección de CASINO únicamente disponibles para los SLOTS Y TRAGAMONEDAS las jugadas rollback no cuentan para los requisitos de apuesta y esté no se puede usar en Deporte ni Casino en Vivo u otro tipo de concursos. El mismo tiene una vigencia de 7 días. El rollover a cumplir (Depósito (${depositoMod}) + Bono (${acumuladoMod}) X Rollover (${rollover}) = (${totalMod}) ¿Está de acuerdo con la activación del bono?
    `;

  //TyC DE APUESTAS DEPORTIVAS PARA BONOS VIP
  let speechDeporteVIP = `
    Los bonos exclusivos de la sección DEPORTIVA no se aceptan para el rollover del mismo; apuestas a hándicap, mayores/menores, ambos equipos marcarán, “cashout”, apuestas en vivo, ni apuestas complejas. Tampoco cuentan las apuestas en eventos virtuales y en hipismo. Solo se consideran pronósticos con apuestas simples y combinadas con cuota superior a 1.50 en eventos Pre-Live. El bono es válido por 7 días. El rollover a cumplir (Depósito (${depositoMod}) + Bono (${acumuladoMod}) X Rollover (${rollover}) = (${totalMod}) ¿Está de acuerdo con la activación del bono?

    `;

  //TyC DE CASINO EN VIVO PARA BONOS VIP
  let speechCasinoEnVivoVIP = `
    Para bonos exclusivos en la sección de CASINO EN VIVO no contarán las jugadas de los juegos de slots y/o tragamonedas, así como también las apuestas deportivas, asimismo las apuestas en la modalidad de rojo/negro y par/impar no calificarán para el cumplimiento del rollover. El mismo tiene una vigencia de 7 días. El rollover a cumplir (Depósito (${depositoMod}) + Bono (${acumuladoMod}) X Rollover (${rollover}) = (${totalMod}) ¿Está de acuerdo con la activación del bono?    
    `;

  //TyC DE CUMPLEVIP
  let TycCumpleVIPCasino = `
    Para bonos exclusivos en la sección de Casino Slots no contarán las jugadas de los juegos de slots y/o tragamonedas, así como también las apuestas deportivas, asimismo las apuestas en la modalidad de rojo/negro y par/impar no calificarán para el cumplimiento del rollover. El mismo tiene una vigencia de 30 días. El rollover a cumplir (Depósito (${depositoMod}) + Bono (${acumuladoMod}) X Rollover (${rollover}) = (${totalMod}) ¿Está de acuerdo con la activación del bono?    
    `;

  let TycCumpleVIPDeportes = `
    Para bonos exclusivos en la sección de Apuestas Deportivas no contarán las jugadas de los juegos de slots y/o tragamonedas, así como también las apuestas deportivas, asimismo las apuestas en la modalidad de rojo/negro y par/impar no calificarán para el cumplimiento del rollover. El mismo tiene una vigencia de 30 días. El rollover a cumplir (Depósito (${depositoMod}) + Bono (${acumuladoMod}) X Rollover (${rollover}) = (${totalMod}) ¿Está de acuerdo con la activación del bono?    
    `;

  //BONOS PROACTIVE CASINO SLOTS
  if (bono === "proactive") {
    limpiarHTML();
    if (monedaInput.value === "VES") {
      if (acumulado >= maximoProactiveVES) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactiveVES,
          apuestaMaximaVES
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactiveVES,
          apuestaMaximaVES
        );
      }
    }

    if (monedaInput.value === "CLP") {
      if (acumulado >= maximoProactiveCLP) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactiveCLP,
          apuestaMaximaCLP
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactiveCLP,
          apuestaMaximaCLP
        );
      }
    }

    if (monedaInput.value === "PEN") {
      if (acumulado >= maximoProactivePEN) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactivePEN,
          apuestaMaximaPEN
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactivePEN,
          apuestaMaximaPEN
        );
      }
    }

    if (monedaInput.value === "USD") {
      if (acumulado >= maximoProactiveUSD) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactiveUSD,
          apuestaMaximaUSD
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactiveUSD,
          apuestaMaximaUSD
        );
      }
    }

    if (monedaInput.value === "ARS") {
      if (acumulado >= maximoProactiveARS) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactiveARS,
          apuestaMaximaARS
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactiveARS,
          apuestaMaximaARS
        );
      }
    }

    if (monedaInput.value === "CRC") {
      if (acumulado >= maximoProactiveCRC) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactiveCRC,
          apuestaMaximaCRC
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactiveCRC,
          apuestaMaximaCRC
        );
      }
    }

    if (monedaInput.value === "MXN") {
      if (acumulado >= maximoProactiveMXN) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactiveMXN,
          apuestaMaximaMXN
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactiveMXN,
          apuestaMaximaMXN
        );
      }
    }

    if (monedaInput.value === "HNL") {
      if (acumulado >= maximoProactiveHNL) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactiveHNL,
          apuestaMaximaHNL
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactiveHNL,
          apuestaMaximaHNL
        );
      }
    }

    if (monedaInput.value === "GTQ") {
      if (acumulado >= maximoProactiveGTQ) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactiveGTQ,
          apuestaMaximaGTQ
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactiveGTQ,
          apuestaMaximaGTQ
        );
      }
    }

    if (monedaInput.value === "BOB") {
      if (acumulado >= maximoProactiveBOB) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactiveBOB,
          apuestaMaximaBOB,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoProactiveBOB,
          apuestaMaximaBOB,
          "cumplevip"
        );
      }
    }
  }

  //MUESTRA DE SPEECH PARA CASINOVIP
  if (bono === "casinovip") {
    limpiarHTML();
    if (monedaInput.value === "VES") {
      if (acumulado >= maximoVES) {
        actualizarMetaCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoVES
        );
        speech.textContent = speechs.casinovipVES;
      } else {
        speech.textContent = speechs.casinovipVES; //Muestra el speech del bono en especifico
        speech2.textContent = speechCasinoVIP; //Muestra los tyc
      }
    }

    if (monedaInput.value === "CLP") {
      if (acumulado >= maximoCLP) {
        actualizarMetaCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoCLP
        );
        speech.textContent = speechs.casinovipCLP;
      } else {
        speech.textContent = speechs.casinovipCLP;
        speech2.textContent = speechCasinoVIP;
      }
    }

    if (monedaInput.value === "PEN") {
      if (acumulado >= maximoPEN) {
        actualizarMetaCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoPEN
        );
        speech.textContent = speechs.casinovipPEN;
      } else {
        speech.textContent = speechs.casinovipPEN;
        speech2.textContent = speechCasinoVIP;
      }
    }

    if (monedaInput.value === "USD") {
      if (acumulado >= maximoUSD) {
        actualizarMetaCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoUSD
        );
        speech.textContent = speechs.casinovipUSD;
      } else {
        speech.textContent = speechs.casinovipUSD;
        speech2.textContent = speechCasinoVIP;
      }
    }

    if (monedaInput.value === "ARS") {
      if (acumulado >= maximoARS) {
        actualizarMetaCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoARS
        );
        speech.textContent = speechs.casinovipARS;
      } else {
        speech.textContent = speechs.casinovipARS;
        speech2.textContent = speechCasinoVIP;
      }
    }

    if (monedaInput.value === "CRC") {
      if (acumulado >= maximoCRC) {
        actualizarMetaCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoCRC
        );
        speech.textContent = speechs.casinovipCRC;
      } else {
        speech.textContent = speechs.casinovipCRC;
        speech2.textContent = speechCasinoVIP;
      }
    }

    if (monedaInput.value === "GTQ") {
      if (acumulado >= maximoGTQ) {
        actualizarMetaCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoGTQ
        );
        speech.textContent = speechs.casinovipGTQ;
      } else {
        speech.textContent = speechs.casinovipGTQ;
        speech2.textContent = speechCasinoVIP;
      }
    }

    if (monedaInput.value === "MXN") {
      if (acumulado >= maximoMXN) {
        actualizarMetaCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoMXN
        );
        speech.textContent = speechs.casinovipMXN;
      } else {
        speech.textContent = speechs.casinovipMXN;
        speech2.textContent = speechCasinoVIP;
      }
    }

    if (monedaInput.value === "HNL") {
      if (acumulado >= maximoHNL) {
        actualizarMetaCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoHNL
        );
        speech.textContent = speechs.casinovipHNL;
      } else {
        speech.textContent = speechs.casinovipHNL;
        speech2.textContent = speechCasinoVIP;
      }
    }

    if (monedaInput.value === "BOB") {
      if (acumulado >= maximoBOB) {
        actualizarMetaCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoBOB
        );
        speech.textContent = speechs.casinovipBOB;
      } else {
        speech.textContent = speechs.casinovipBOB;
        speech2.textContent = speechCasinoVIP;
      }
    }

    BonosNomenclatura.textContent = nomenclaturas.CASINOVIP;
  }

  //MUESTRA DE SPEECH PARA SPORTVIP
  if (bono === "sportvip") {
    limpiarHTML();
    if (monedaInput.value === "VES") {
      if (acumulado >= maximoVES) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximoVES
        );
        speech.textContent = speechs.sportvipVES;
      } else {
        speech.textContent = speechs.sportvipVES; //Muestra el speech del bono en especifico
        speech2.textContent = speechDeporteVIP; //Muestra los tyc
      }
    }

    if (monedaInput.value === "CLP") {
      if (acumulado >= maximoCLP) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximoCLP
        );
        speech.textContent = speechs.sportvipCLP;
      } else {
        speech.textContent = speechs.sportvipCLP;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "PEN") {
      if (acumulado >= maximoPEN) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximoPEN
        );
        speech.textContent = speechs.sportvipPEN;
      } else {
        speech.textContent = speechs.sportvipPEN;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "USD") {
      if (acumulado >= maximoUSD) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximoUSD
        );
        speech.textContent = speechs.sportvipUSD;
      } else {
        speech.textContent = speechs.sportvipUSD;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "ARS") {
      if (acumulado >= maximoARS) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximoARS
        );
        speech.textContent = speechs.sportvipARS;
      } else {
        speech.textContent = speechs.sportvipARS;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "CRC") {
      if (acumulado >= maximoCRC) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximoCRC
        );
        speech.textContent = speechs.sportvipCRC;
      } else {
        speech.textContent = speechs.sportvipCRC;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "GTQ") {
      if (acumulado >= maximoGTQ) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximoGTQ
        );
        speech.textContent = speechs.sportvipGTQ;
      } else {
        speech.textContent = speechs.sportvipGTQ;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "MXN") {
      if (acumulado >= maximoMXN) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximoMXN
        );
        speech.textContent = speechs.sportvipMXN;
      } else {
        speech.textContent = speechs.sportvipMXN;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "HNL") {
      if (acumulado >= maximoHNL) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximoHNL
        );
        speech.textContent = speechs.sportvipHNL;
      } else {
        speech.textContent = speechs.sportvipHNL;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "BOB") {
      if (acumulado >= maximoBOB) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximoBOB
        );
        speech.textContent = speechs.sportvipBOB;
      } else {
        speech.textContent = speechs.sportvipBOB;
        speech2.textContent = speechDeporteVIP;
      }
    }

    BonosNomenclatura.textContent = nomenclaturas.SPORTVIP;
  }

  //MUESTRA POR PANTALLA EL ENVIVOVIP
  if (bono === "envivovip") {
    limpiarHTML();
    if (monedaInput.value === "VES") {
      if (acumulado >= maximoVES) {
        actualizarMetaCasinoENVIVO(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoEnVivoVIP,
          maximoVES
        );
        speech.textContent = speechs.envivovipVES;
      } else {
        speech.textContent = speechs.envivovipVES; //Muestra el speech del bono en especifico
        speech2.textContent = speechCasinoEnVivoVIP; //Muestra los tyc
      }
    }

    if (monedaInput.value === "CLP") {
      if (acumulado >= maximoCLP) {
        actualizarMetaCasinoENVIVO(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoEnVivoVIP,
          maximoCLP
        );
        speech.textContent = speechs.envivovipCLP;
      } else {
        speech.textContent = speechs.envivovipCLP;
        speech2.textContent = speechCasinoEnVivoVIP;
      }
    }

    if (monedaInput.value === "PEN") {
      if (acumulado >= maximoPEN) {
        actualizarMetaCasinoENVIVO(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoEnVivoVIP,
          maximoPEN
        );
        speech.textContent = speechs.envivovipPEN;
      } else {
        speech.textContent = speechs.envivovipPEN;
        speech2.textContent = speechCasinoEnVivoVIP;
      }
    }

    if (monedaInput.value === "USD") {
      if (acumulado >= maximoUSD) {
        actualizarMetaCasinoENVIVO(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoEnVivoVIP,
          maximoUSD
        );
        speech.textContent = speechs.envivovipUSD;
      } else {
        speech.textContent = speechs.envivovipUSD;
        speech2.textContent = speechCasinoEnVivoVIP;
      }
    }

    if (monedaInput.value === "ARS") {
      if (acumulado >= maximoARS) {
        actualizarMetaCasinoENVIVO(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoEnVivoVIP,
          maximoARS
        );
        speech.textContent = speechs.envivovipARS;
      } else {
        speech.textContent = speechs.envivovipARS;
        speech2.textContent = speechCasinoEnVivoVIP;
      }
    }

    if (monedaInput.value === "CRC") {
      if (acumulado >= maximoCRC) {
        actualizarMetaCasinoENVIVO(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoEnVivoVIP,
          maximoCRC
        );
        speech.textContent = speechs.envivovipCRC;
      } else {
        speech.textContent = speechs.envivovipCRC;
        speech2.textContent = speechCasinoEnVivoVIP;
      }
    }

    if (monedaInput.value === "GTQ") {
      if (acumulado >= maximoGTQ) {
        actualizarMetaCasinoENVIVO(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoEnVivoVIP,
          maximoGTQ
        );
        speech.textContent = speechs.envivovipGTQ;
      } else {
        speech.textContent = speechs.envivovipGTQ;
        speech2.textContent = speechCasinoEnVivoVIP;
      }
    }

    if (monedaInput.value === "MXN") {
      if (acumulado >= maximoMXN) {
        actualizarMetaCasinoENVIVO(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoEnVivoVIP,
          maximoMXN
        );
        speech.textContent = speechs.envivovipMXN;
      } else {
        speech.textContent = speechs.envivovipMXN;
        speech2.textContent = speechCasinoEnVivoVIP;
      }
    }

    if (monedaInput.value === "HNL") {
      if (acumulado >= maximoHNL) {
        actualizarMetaCasinoENVIVO(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoEnVivoVIP,
          maximoHNL
        );
        speech.textContent = speechs.envivovipHNL;
      } else {
        speech.textContent = speechs.envivovipHNL;
        speech2.textContent = speechCasinoEnVivoVIP;
      }
    }

    if (monedaInput.value === "BOB") {
      if (acumulado >= maximoBOB) {
        actualizarMetaCasinoENVIVO(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoEnVivoVIP,
          maximoBOB
        );
        speech.textContent = speechs.envivovipBOB;
      } else {
        speech.textContent = speechs.envivovipBOB;
        speech2.textContent = speechCasinoEnVivoVIP;
      }
    }
    BonosNomenclatura.textContent = nomenclaturas.ENVIVOVIP;
  }

  //MUESTRA POR PANTALLA EL COPAVIP
  if (bono === "copavip") {
    limpiarHTML();
    if (monedaInput.value === "VES") {
      //Acumulado mayor al maximo de acreditacion:
      if (acumulado >= maximosCopaVIP.maximoCopaVES) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximosCopaVIP.maximoCopaVES
        );
        speech.textContent = speechCopaVIP.copavipVES;
      } else {
        speech.textContent = speechCopaVIP.copavipVES; //Muestra el speech del bono en especifico
        speech2.textContent = speechDeporteVIP; //Muestra los tyc
      }
    }

    if (monedaInput.value === "CLP") {
      if (acumulado >= maximosCopaVIP.maximoCopaCLP) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximosCopaVIP.maximoCopaCLP
        );
        speech.textContent = speechCopaVIP.copavipCLP;
      } else {
        speech.textContent = speechCopaVIP.copavipCLP;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "PEN") {
      if (acumulado >= maximosCopaVIP.maximoCopaPEN) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximosCopaVIP.maximoCopaPEN
        );
        speech.textContent = speechCopaVIP.copavipPEN;
      } else {
        speech.textContent = speechCopaVIP.copavipPEN;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "USD") {
      if (acumulado >= maximosCopaVIP.maximoCopaUSD) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximosCopaVIP.maximoCopaUSD
        );
        speech.textContent = speechCopaVIP.copavipUSD;
      } else {
        speech.textContent = speechCopaVIP.copavipUSD;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "ARS") {
      if (acumulado >= maximosCopaVIP.maximoCopaARS) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximosCopaVIP.maximoCopaARS
        );
        speech.textContent = speechCopaVIP.copavipARS;
      } else {
        speech.textContent = speechCopaVIP.copavipARS;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "CRC") {
      if (acumulado >= maximosCopaVIP.maximoCopaCRC) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximosCopaVIP.maximoCopaCRC
        );
        speech.textContent = speechCopaVIP.copavipCRC;
      } else {
        speech.textContent = speechCopaVIP.copavipCRC;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "GTQ") {
      if (acumulado >= maximosCopaVIP.maximoCopaGTQ) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximosCopaVIP.maximoCopaGTQ
        );
        speech.textContent = speechCopaVIP.copavipGTQ;
      } else {
        speech.textContent = speechCopaVIP.copavipGTQ;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "HNL") {
      if (acumulado >= maximosCopaVIP.maximoCopaHNL) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximosCopaVIP.maximoCopaHNL
        );
        speech.textContent = speechCopaVIP.copavipHNL;
      } else {
        speech.textContent = speechCopaVIP.copavipHNL;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "MXN") {
      if (acumulado >= maximosCopaVIP.maximoCopaMXN) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximosCopaVIP.maximoCopaMXN
        );
        speech.textContent = speechCopaVIP.copavipMXN;
      } else {
        speech.textContent = speechCopaVIP.copavipMXN;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "BOB") {
      if (acumulado >= maximosCopaVIP.maximoCopaBOB) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximosCopaVIP.maximoCopaBOB
        );
        speech.textContent = speechCopaVIP.copavipBOB;
      } else {
        speech.textContent = speechCopaVIP.copavipBOB;
        speech2.textContent = speechDeporteVIP;
      }
    }

    BonosNomenclatura.textContent = nomenclaturas.COPAVIP;
  }

  //MUESTRA DE SPEECH PARA FINVIPX21 (CASINO SLOTS)
  if (bono === "finvipx21") {
    limpiarHTML();
    if (monedaInput.value === "VES") {
      if (acumulado >= maximoVES) {
        actualizarMetaCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoVES
        );
        speech.textContent = speechs.CasinoFINVIPVES;
      } else {
        speech.textContent = speechs.CasinoFINVIPVES; //Muestra el speech del bono en especifico
        speech2.textContent = speechCasinoVIP; //Muestra los tyc
      }
    }

    if (monedaInput.value === "CLP") {
      if (acumulado >= maximoCLP) {
        actualizarMetaCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoCLP
        );
        speech.textContent = speechs.CasinoFINVIPCLP;
      } else {
        speech.textContent = speechs.CasinoFINVIPCLP;
        speech2.textContent = speechCasinoVIP;
      }
    }

    if (monedaInput.value === "PEN") {
      if (acumulado >= maximoPEN) {
        actualizarMetaCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoPEN
        );
        speech.textContent = speechs.CasinoFINVIPPEN;
      } else {
        speech.textContent = speechs.CasinoFINVIPPEN;
        speech2.textContent = speechCasinoVIP;
      }
    }

    if (monedaInput.value === "USD") {
      if (acumulado >= maximoUSD) {
        actualizarMetaCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoUSD
        );
        speech.textContent = speechs.CasinoFINVIPUSD;
      } else {
        speech.textContent = speechs.CasinoFINVIPUSD;
        speech2.textContent = speechCasinoVIP;
      }
    }

    if (monedaInput.value === "CRC") {
      if (acumulado >= maximoCRC) {
        actualizarMetaCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoCRC
        );
        speech.textContent = speechs.CasinoFINVIPCRC;
      } else {
        speech.textContent = speechs.CasinoFINVIPCRC;
        speech2.textContent = speechCasinoVIP;
      }
    }

    if (monedaInput.value === "ARS") {
      if (acumulado >= maximoARS) {
        actualizarMetaCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoARS
        );
        speech.textContent = speechs.CasinoFINVIPARS;
      } else {
        speech.textContent = speechs.CasinoFINVIPARS;
        speech2.textContent = speechCasinoVIP;
      }
    }

    if (monedaInput.value === "GTQ") {
      if (acumulado >= maximoGTQ) {
        actualizarMetaCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoGTQ
        );
        speech.textContent = speechs.CasinoFINVIPGTQ;
      } else {
        speech.textContent = speechs.CasinoFINVIPGTQ;
        speech2.textContent = speechCasinoVIP;
      }
    }

    if (monedaInput.value === "HNL") {
      if (acumulado >= maximoHNL) {
        actualizarMetaCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoHNL
        );
        speech.textContent = speechs.CasinoFINVIPHNL;
      } else {
        speech.textContent = speechs.CasinoFINVIPHNL;
        speech2.textContent = speechCasinoVIP;
      }
    }

    if (monedaInput.value === "MXN") {
      if (acumulado >= maximoMXN) {
        actualizarMetaCasino(
          deposito,
          acumulado,
          rollover,
          total,
          speechCasinoVIP,
          maximoMXN
        );
        speech.textContent = speechs.CasinoFINVIPMXN;
      } else {
        speech.textContent = speechs.CasinoFINVIPMXN;
        speech2.textContent = speechCasinoVIP;
      }
    }
    BonosNomenclatura.textContent = nomenclaturas.FINVIPCASINO;
  }

  //MUESTRA DE SPEECH PARA FINVIPX19 (APUESTAS DEPORTIVAS)
  if (bono === "finvipx19") {
    limpiarHTML();
    if (monedaInput.value === "VES") {
      if (acumulado >= maximoVES) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximoVES
        );
        speech.textContent = speechs.DeporteFINVIPVES;
      } else {
        speech.textContent = speechs.DeporteFINVIPVES; //Muestra el speech del bono en especifico
        speech2.textContent = speechDeporteVIP; //Muestra los tyc
      }
    }

    if (monedaInput.value === "CLP") {
      if (acumulado >= maximoCLP) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximoCLP
        );
        speech.textContent = speechs.DeporteFINVIPCLP;
      } else {
        speech.textContent = speechs.DeporteFINVIPCLP;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "PEN") {
      if (acumulado >= maximoPEN) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximoPEN
        );
        speech.textContent = speechs.DeporteFINVIPPEN;
      } else {
        speech.textContent = speechs.DeporteFINVIPPEN;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "USD") {
      if (acumulado >= maximoUSD) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximoUSD
        );
        speech.textContent = speechs.DeporteFINVIPUSD;
      } else {
        speech.textContent = speechs.DeporteFINVIPUSD;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "CRC") {
      if (acumulado >= maximoCRC) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximoCRC
        );
        speech.textContent = speechs.DeporteFINVIPCRC;
      } else {
        speech.textContent = speechs.DeporteFINVIPCRC;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "ARS") {
      if (acumulado >= maximoARS) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximoARS
        );
        speech.textContent = speechs.DeporteFINVIPARS;
      } else {
        speech.textContent = speechs.DeporteFINVIPARS;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "GTQ") {
      if (acumulado >= maximoGTQ) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximoGTQ
        );
        speech.textContent = speechs.DeporteFINVIPGTQ;
      } else {
        speech.textContent = speechs.DeporteFINVIPGTQ;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "HNL") {
      if (acumulado >= maximoHNL) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximoHNL
        );
        speech.textContent = speechs.DeporteFINVIPHNL;
      } else {
        speech.textContent = speechs.DeporteFINVIPHNL;
        speech2.textContent = speechDeporteVIP;
      }
    }

    if (monedaInput.value === "MXN") {
      if (acumulado >= maximoMXN) {
        actualizarMetaDeporte(
          deposito,
          acumulado,
          rollover,
          total,
          speechDeporteVIP,
          maximoMXN
        );
        speech.textContent = speechs.DeporteFINVIPMXN;
      } else {
        speech.textContent = speechs.DeporteFINVIPMXN;
        speech2.textContent = speechDeporteVIP;
      }
    }

    BonosNomenclatura.textContent = nomenclaturas.FINVIPDEPORTES;
  }

  //MUESTRA DE SPEECH PARA CUMPLEVIP4 (APUESTAS DEPORTIVAS y CASINO SLOTS)
  if (bono === "cumplevip4") {
    limpiarHTML();
    if (monedaInput.value === "VES") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLEVES) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEVES,
          apuestaMaximaVES,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEVES,
          apuestaMaximaVES,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP150.CasinoMICUMPLEVIP5VES;
    }

    if (monedaInput.value === "CLP") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLECLP) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLECLP,
          apuestaMaximaCLP,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLECLP,
          apuestaMaximaCLP,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP140.CasinoMICUMPLEVIP4CLP;
    }

    if (monedaInput.value === "PEN") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLEPEN) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEPEN,
          apuestaMaximaPEN,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEPEN,
          apuestaMaximaPEN,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP140.CasinoMICUMPLEVIP4PEN;
    }

    if (monedaInput.value === "USD") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLEUSD) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEUSD,
          apuestaMaximaUSD,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEUSD,
          apuestaMaximaUSD,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP140.CasinoMICUMPLEVIP4USD;
    }

    if (monedaInput.value === "CRC") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLECRC) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLECRC,
          apuestaMaximaCRC,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLECRC,
          apuestaMaximaCRC,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP140.CasinoMICUMPLEVIP4CRC;
    }

    if (monedaInput.value === "MXN") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLEMXN) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEMXN,
          apuestaMaximaMXN,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEMXN,
          apuestaMaximaMXN,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP140.CasinoMICUMPLEVIP4MXN;
    }

    if (monedaInput.value === "ARS") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLEARS) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEARS,
          apuestaMaximaARS,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEARS,
          apuestaMaximaARS,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP140.CasinoMICUMPLEVIP4ARS;
    }

    if (monedaInput.value === "GTQ") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLEGTQ) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEGTQ,
          apuestaMaximaGTQ,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEGTQ,
          apuestaMaximaGTQ,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP140.CasinoMICUMPLEVIP4GTQ;
    }

    if (monedaInput.value === "HNL") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLEHNL) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEHNL,
          apuestaMaximaHNL,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEHNL,
          apuestaMaximaHNL,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP140.CasinoMICUMPLEVIP4HNL;
    }

    if (monedaInput.value === "BOB") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLEBOB) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEBOB,
          apuestaMaximaBOB,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEBOB,
          apuestaMaximaBOB,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP140.CasinoMICUMPLEVIP4BOB;
    }
    BonosNomenclatura.textContent = nomenclaturas.MICUMPLEVIP4;
  }

  //MUESTRA DE SPEECH PARA CUMPLEVIP5 (APUESTAS DEPORTIVAS y CASINO SLOTS)
  if (bono === "cumplevip5") {
    limpiarHTML();
    if (monedaInput.value === "VES") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLEVES) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEVES,
          apuestaMaximaVES,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEVES,
          apuestaMaximaVES,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP150.CasinoMICUMPLEVIP5VES;
    }

    if (monedaInput.value === "CLP") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLECLP) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLECLP,
          apuestaMaximaCLP,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLECLP,
          apuestaMaximaCLP,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP150.CasinoMICUMPLEVIP5CLP;
    }

    if (monedaInput.value === "PEN") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLEPEN) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEPEN,
          apuestaMaximaPEN,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEPEN,
          apuestaMaximaPEN,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP150.CasinoMICUMPLEVIP5PEN;
    }

    if (monedaInput.value === "USD") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLEUSD) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEUSD,
          apuestaMaximaUSD,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEUSD,
          apuestaMaximaUSD,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP150.CasinoMICUMPLEVIP5USD;
    }

    if (monedaInput.value === "CRC") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLECRC) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLECRC,
          apuestaMaximaCRC,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLECRC,
          apuestaMaximaCRC,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP150.CasinoMICUMPLEVIP5CRC;
    }

    if (monedaInput.value === "MXN") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLEMXN) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEMXN,
          apuestaMaximaMXN,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEMXN,
          apuestaMaximaMXN,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP150.CasinoMICUMPLEVIP5MXN;
    }

    if (monedaInput.value === "ARS") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLEARS) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEARS,
          apuestaMaximaARS,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEARS,
          apuestaMaximaARS,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP150.CasinoMICUMPLEVIP5ARS;
    }

    if (monedaInput.value === "GTQ") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLEGTQ) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEGTQ,
          apuestaMaximaGTQ,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEGTQ,
          apuestaMaximaGTQ,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP150.CasinoMICUMPLEVIP5GTQ;
    }

    if (monedaInput.value === "HNL") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLEHNL) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEHNL,
          apuestaMaximaHNL,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEHNL,
          apuestaMaximaHNL,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP150.CasinoMICUMPLEVIP5HNL;
    }

    if (monedaInput.value === "BOB") {
      if (acumulado >= maximosCUMPLEVIP.maximoCUMPLEBOB) {
        actualizarMetaProactiveCasino(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEBOB,
          apuestaMaximaBOB,
          "cumplevip"
        );
      } else {
        mostrarSpeechProactive(
          deposito,
          acumulado,
          rollover,
          total,
          TycCumpleVIPCasino,
          maximosCUMPLEVIP.maximoCUMPLEBOB,
          apuestaMaximaBOB,
          "cumplevip"
        );
      }
      speech.textContent = speechCumpleVIP150.CasinoMICUMPLEVIP5BOB;
    }
    BonosNomenclatura.textContent = nomenclaturas.MICUMPLEVIP5;
  }
}

//Funcion para actualizar el valor de los input
function actualizarInput(bono) {
  //Validacion CASINOVIP
  if (bono === "casinovip") {
    porcentajeInput.disabled = true;
    porcentajeInput.value = 50;
    rolloverInput.value = 17;
    rolloverInput.disabled = false;
  }

  //Validaciones SPORTVIP
  if (bono === "sportvip") {
    porcentajeInput.disabled = true;
    porcentajeInput.value = 55;

    rolloverInput.value = 18;
    rolloverInput.disabled = false;
  }

  //Validaciones ENVIVPVIP
  if (bono === "envivovip") {
    porcentajeInput.disabled = true;
    porcentajeInput.value = 45;

    rolloverInput.value = 35;
    rolloverInput.disabled = true;
  }

  //Validaciones FINVIPX21 CASINO
  if (bono === "finvipx21") {
    porcentajeInput.disabled = true;
    porcentajeInput.value = 50;

    rolloverInput.value = 21;
    rolloverInput.disabled = true;
  }
  //Validaciones FINVIPX19 DEPORTES
  if (bono === "finvipx19") {
    porcentajeInput.disabled = true;
    porcentajeInput.value = 50;

    rolloverInput.value = 19;
    rolloverInput.disabled = true;
  }

  //Validaciones COPAVIP DEPORTES
  if (bono === "copavip") {
    porcentajeInput.disabled = true;
    porcentajeInput.value = 60;

    rolloverInput.value = 19;
    rolloverInput.disabled = true;
  }

  //Validaciones PROACTIVES
  if (bono === "proactive") {
    porcentajeInput.disabled = false;
    rolloverInput.value = 21;
    rolloverInput.disabled = true;
  }

  //Validaciones CUMPLEVIP140
  if (bono === "cumplevip4") {
    porcentajeInput.disabled = false;
    porcentajeInput.value = 140;

    rolloverInput.value = 21;
    rolloverInput.disabled = true;
  }

  //Validaciones CUMPLEVIP150
  if (bono === "cumplevip5") {
    porcentajeInput.disabled = false;
    porcentajeInput.value = 150;

    rolloverInput.value = 21;
    rolloverInput.disabled = true;
  }
}

//Funciones para actualizar las metas
function actualizarMetaCasino(
  deposito,
  acumulado,
  rollover,
  total,
  tyc,
  maximoAcreditacion
) {
  acumulado = maximoAcreditacion;
  total = (acumulado + deposito) * rollover;

  let depositoMod = deposito.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let acumuladoMod = acumulado.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let totalMod = total.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  tyc = `
     Para los bonos que sean exclusivos para la sección de CASINO únicamente disponibles para los SLOTS Y TRAGAMONEDAS las jugadas rollback no cuentan para los requisitos de apuesta y esté no se puede usar en Deporte ni Casino en Vivo u otro tipo de concursos. El mismo tiene una vigencia de 7 días. El rollover a cumplir (Depósito (${depositoMod}) + Bono (${acumuladoMod}) X Rollover (${rollover}) = (${totalMod}) ¿Está de acuerdo con la activación del bono?
     El maximo a obtener como ganancias es de 5.000$ al cambio de su moneda local.
    `;

  speech2.textContent = tyc; //Muestra los tyc
}

function actualizarMetaDeporte(
  deposito,
  acumulado,
  rollover,
  total,
  tyc,
  maximoAcreditacion
) {
  acumulado = maximoAcreditacion;
  total = (acumulado + deposito) * rollover;

  let depositoMod = deposito.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let acumuladoMod = acumulado.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let totalMod = total.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  tyc = `
    Los bonos exclusivos de la sección DEPORTIVA no se aceptan para el rollover del mismo; apuestas a hándicap, mayores/menores, ambos equipos marcarán, “cashout”, apuestas en vivo, ni apuestas complejas. Tampoco cuentan las apuestas en eventos virtuales y en hipismo. Solo se consideran pronósticos con apuestas simples y combinadas con cuota superior a 1.50 en eventos Pre-Live. El bono es válido por 7 días. El rollover a cumplir (Depósito (${depositoMod}) + Bono (${acumuladoMod}) X Rollover (${rollover}) = (${totalMod}) ¿Está de acuerdo con la activación del bono?
    El maximo a obtener como ganancias es de 5.000$ al cambio de su moneda local.
    `;

  speech2.textContent = tyc; //Muestra los tyc
}

function actualizarMetaCasinoENVIVO(
  deposito,
  acumulado,
  rollover,
  total,
  tyc,
  maximoAcreditacion
) {
  acumulado = maximoAcreditacion;
  total = (acumulado + deposito) * rollover;

  let depositoMod = deposito.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let acumuladoMod = acumulado.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let totalMod = total.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  tyc = `
    Para bonos exclusivos en la sección de CASINO EN VIVO no contarán las jugadas de los juegos de slots y/o tragamonedas, así como también las apuestas deportivas, asimismo las apuestas en la modalidad de rojo/negro y par/impar no calificarán para el cumplimiento del rollover. El mismo tiene una vigencia de 7 días. El rollover a cumplir (Depósito (${depositoMod}) + Bono (${acumuladoMod}) X Rollover (${rollover}) = (${totalMod}) ¿Está de acuerdo con la activación del bono?. El maximo a obtener como ganancias es de 5.000$ al cambio de su moneda local.
    `;

  speech2.textContent = tyc; //Muestra los tyc
}

//Funcion para mover el scroll al fondo de la pantalla
function slowDown() {
  window.scrollTo({
    top: 1000,
    left: 0,
    behavior: "smooth",
  });
}

//PROACTIVES y CUMPLEVIP
function actualizarMetaProactiveCasino(
  deposito,
  acumulado,
  rollover,
  total,
  tyc,
  maximoAcreditacion,
  maxJugada,
  changer = "proactive"
) {
  acumulado = maximoAcreditacion;
  total = (acumulado + deposito) * rollover;

  let depositoMod = deposito.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let acumuladoMod = acumulado.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let totalMod = total.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (changer === "cumplevip") {
    let tyc = `
       Para los bonos que sean exclusivos para la sección de CASINO únicamente disponibles para los SLOTS Y TRAGAMONEDAS las jugadas rollback no cuentan para los requisitos de apuesta y esté no se puede usar en Deporte ni Casino en Vivo u otro tipo de concursos. La apuesta maxima es de ${maxJugada}. El mismo tiene una vigencia de 30 días. El rollover a cumplir (Depósito (${depositoMod}) + Bono (${acumuladoMod}) X Rollover (${rollover}) = (${totalMod}) ¿Está de acuerdo con la activación del bono?
  
      `;

    let deporte = `Para los bonos que sean exclusivos para la sección de DEPORTES únicamente disponibles para las Apuestas Deportivas, solo apuestas simples y combinadas únicamente en el mercado 1x2 con una cuota mayor a 1.50, deben ser PRELIVE (antes de que comience el evento), las apuestas retiradas, es decir, a las que usted realice CashOut, no son validas, debe tener en cuenta que una vez realice una apuesta combinada todos los pronósticos deben tener una cuota mayor o igual a 1.50, todas deben ser PRELIVE y únicamente en el mercado 1x2. Dicha bonificacion tiene 30 días de vigencia.  La apuesta maxima es de ${maxJugada}. El mismo tiene una vigencia de 30 días. El rollover a cumplir (Depósito (${depositoMod}) + Bono (${acumuladoMod}) X Rollover (${rollover}) = (${totalMod}) ¿Está de acuerdo con la activación del bono?`;

    speech2.textContent = tyc; //Muestra el speech
    speech3.textContent = deporte; //Muestra los tyc
    return;
  }

  tyc = `
     Para los bonos que sean exclusivos para la sección de CASINO únicamente disponibles para los SLOTS Y TRAGAMONEDAS las jugadas rollback no cuentan para los requisitos de apuesta y esté no se puede usar en Deporte ni Casino en Vivo u otro tipo de concursos. La apuesta maxima es de ${maxJugada}. El mismo tiene una vigencia de 7 días. El rollover a cumplir (Depósito (${depositoMod}) + Bono (${acumuladoMod}) X Rollover (${rollover}) = (${totalMod}) ¿Está de acuerdo con la activación del bono?

    `;

  let deporte = `Las condiciones son las siguientes:  solo apuestas simples y combinadas únicamente en el mercado 1x2 con una cuota mayor a 1.50, deben ser PRELIVE (antes de que comience el evento), las apuestas retiradas, es decir, a las que usted realice CashOut, no son validas, debe tener en cuenta que una vez realice una apuesta combinada todos los pronósticos deben tener una cuota mayor o igual a 1.50, todas deben ser PRELIVE y únicamente en el mercado 1x2. Dicha bonificacion tiene 7 días de vigencia.  La apuesta maxima es de ${maxJugada}. El mismo tiene una vigencia de 7 días. El rollover a cumplir (Depósito (${depositoMod}) + Bono (${acumuladoMod}) X Rollover (${rollover}) = (${totalMod}) ¿Está de acuerdo con la activación del bono?`;

  speech2.textContent = tyc; //Muestra los tyc
  speech3.textContent = deporte;
}

function mostrarSpeechProactive(
  deposito,
  acumulado,
  rollover,
  total,
  tyc,
  maximoAcreditacion,
  maxJugada,
  changer = "proactive"
) {
  total = (acumulado + deposito) * rollover;

  let depositoMod = deposito.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let acumuladoMod = acumulado.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let totalMod = total.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (changer === "cumplevip") {
    tyc = `
       Para los bonos que sean exclusivos para la sección de CASINO únicamente disponibles para los SLOTS Y TRAGAMONEDAS las jugadas rollback no cuentan para los requisitos de apuesta y esté no se puede usar en Deporte ni Casino en Vivo u otro tipo de concursos. La apuesta maxima es de ${maxJugada}. El mismo tiene una vigencia de 30 días. El rollover a cumplir (Depósito (${depositoMod}) + Bono (${acumuladoMod}) X Rollover (${rollover}) = (${totalMod}) ¿Está de acuerdo con la activación del bono?
  
      `;

    let deporte = `Para los bonos que sean exclusivos para la sección de DEPORTES únicamente disponibles para las Apuestas Deportivas, solo apuestas simples y combinadas únicamente en el mercado 1x2 con una cuota mayor a 1.50, deben ser PRELIVE (antes de que comience el evento), las apuestas retiradas, es decir, a las que usted realice CashOut, no son validas, debe tener en cuenta que una vez realice una apuesta combinada todos los pronósticos deben tener una cuota mayor o igual a 1.50, todas deben ser PRELIVE y únicamente en el mercado 1x2. Dicha bonificacion tiene 30 días de vigencia.  La apuesta maxima es de ${maxJugada}. El mismo tiene una vigencia de 30 días. El rollover a cumplir (Depósito (${depositoMod}) + Bono (${acumuladoMod}) X Rollover (${rollover}) = (${totalMod}) ¿Está de acuerdo con la activación del bono?`;

    speech2.textContent = tyc; //Muestra los tyc
    speech3.textContent = deporte; //Muestra los tyc

    BonosNomenclatura.textContent = nomenclaturas.MICUMPLEVIP4; // Muestra la nomenclatura

    return;
  }

  tyc = `
     Para los bonos que sean exclusivos para la sección de CASINO únicamente disponibles para los SLOTS Y TRAGAMONEDAS las jugadas rollback no cuentan para los requisitos de apuesta y esté no se puede usar en Deporte ni Casino en Vivo u otro tipo de concursos. La apuesta maxima es de ${maxJugada}. El mismo tiene una vigencia de 7 días. El rollover a cumplir (Depósito (${depositoMod}) + Bono (${acumuladoMod}) X Rollover (${rollover}) = (${totalMod}) ¿Está de acuerdo con la activación del bono?

    `;

  let deporte = `Las condiciones son las siguientes:  solo apuestas simples y combinadas únicamente en el mercado 1x2 con una cuota mayor a 1.50, deben ser PRELIVE (antes de que comience el evento), las apuestas retiradas, es decir, a las que usted realice CashOut, no son validas, debe tener en cuenta que una vez realice una apuesta combinada todos los pronósticos deben tener una cuota mayor o igual a 1.50, todas deben ser PRELIVE y únicamente en el mercado 1x2. Dicha bonificacion tiene 7 días de vigencia.  La apuesta maxima es de ${maxJugada}. El mismo tiene una vigencia de 7 días. El rollover a cumplir (Depósito (${depositoMod}) + Bono (${acumuladoMod}) X Rollover (${rollover}) = (${totalMod}) ¿Está de acuerdo con la activación del bono?`;

  speech2.textContent = tyc; //Muestra los tyc
  speech3.textContent = deporte; //Muestra los tyc
  BonosNomenclatura.textContent = nomenclaturas.PROACTIVE; // Muestra la nomenclatura
}

//Limpiar HTML
function limpiarHTML() {
  speech.textContent = "";
  speech2.textContent = "";
  speech3.textContent = "";
}

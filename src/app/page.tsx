"use client"

import * as React from "react"
import Image from "next/image"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarWithHolidays, Holiday, UserDate } from "@/components/CalendarWithHolidays"
import { HolidayDetails } from "@/components/HolidayDetails"
import { UserDateDetails } from "@/components/UserDateDetails"
import { AddUserDateForm } from "@/components/AddUserDateForm"
import { GreetingGenerator } from "@/components/GreetingGenerator"
import { PostcardViewer } from "@/components/PostcardViewer"
import { PostcardGallery } from "@/components/PostcardGallery"
import { AuthModal, UserData } from "@/components/AuthModal"
import { EmailPostcardModal } from "@/components/EmailPostcardModal"
import { EmailHistory } from "@/components/EmailHistory"
import { TodayHolidayNotification } from "@/components/TodayHolidayNotification"
import { getRelativeDate, getDaysUntilString } from "@/lib/date-utils"

// Функция для генерации праздников на несколько лет
const generateHolidaysForYears = (startYear: number, endYear: number): Holiday[] => {
  const holidays: Holiday[] = []
  let idCounter = 1

  for (let year = startYear; year <= endYear; year++) {
    // ЯНВАРЬ
    holidays.push(
      {
        id: `${year}-jan-1-${idCounter++}`,
        date: new Date(year, 0, 1),
        name: "Новый год",
        description: "Новый год — главный календарный праздник, наступающий в момент перехода с последнего дня текущего года в первый день следующего года.",
        type: "national",
      },
      {
        id: `${year}-jan-7-${idCounter++}`,
        date: new Date(year, 0, 7),
        name: "Рождество Христово",
        description: "Рождество Христово — один из главных христианских праздников, установленный в честь рождения Иисуса Христа.",
        type: "religious",
      },
      {
        id: `${year}-jan-11-${idCounter++}`,
        date: new Date(year, 0, 11),
        name: "День заповедников и национальных парков",
        description: "День заповедников и национальных парков — экологический праздник России.",
        type: "professional",
      },
      {
        id: `${year}-jan-13-${idCounter++}`,
        date: new Date(year, 0, 13),
        name: "День российской печати",
        description: "День российской печати — профессиональный праздник работников печатных СМИ.",
        type: "professional",
      },
      {
        id: `${year}-jan-21-${idCounter++}`,
        date: new Date(year, 0, 21),
        name: "День инженерных войск",
        description: "День инженерных войск — профессиональный праздник военных инженеров.",
        type: "professional",
      },
      {
        id: `${year}-jan-25-${idCounter++}`,
        date: new Date(year, 0, 25),
        name: "День российского студенчества",
        description: "День российского студенчества (Татьянин день) — день всех студентов России.",
        type: "professional",
      },
      {
        id: `${year}-jan-27-${idCounter++}`,
        date: new Date(year, 0, 27),
        name: "День снятия блокады Ленинграда",
        description: "День воинской славы России — День снятия блокады города Ленинграда (1944 год).",
        type: "national",
      }
    )

    // ФЕВРАЛЬ
    holidays.push(
      {
        id: `${year}-feb-2-${idCounter++}`,
        date: new Date(year, 1, 2),
        name: "День воинской славы России",
        description: "День разгрома советскими войсками немецко-фашистских войск в Сталинградской битве (1943 год).",
        type: "national",
      },
      {
        id: `${year}-feb-8-${idCounter++}`,
        date: new Date(year, 1, 8),
        name: "День российской науки",
        description: "День российской науки — праздник, посвящённый научным достижениям России.",
        type: "professional",
      },
      {
        id: `${year}-feb-9-${idCounter++}`,
        date: new Date(year, 1, 9),
        name: "День гражданской авиации",
        description: "День гражданской авиации — профессиональный праздник работников авиации.",
        type: "professional",
      },
      {
        id: `${year}-feb-10-${idCounter++}`,
        date: new Date(year, 1, 10),
        name: "День дипломатического работника",
        description: "День дипломатического работника — профессиональный праздник дипломатов.",
        type: "professional",
      },
      {
        id: `${year}-feb-15-${idCounter++}`,
        date: new Date(year, 1, 15),
        name: "День памяти о россиянах, исполнявших служебный долг за пределами Отечества",
        description: "День памяти о россиянах, исполнявших служебный долг за пределами Отечества.",
        type: "national",
      },
      {
        id: `${year}-feb-17-${idCounter++}`,
        date: new Date(year, 1, 17),
        name: "День спонтанного проявления доброты",
        description: "Международный день спонтанного проявления доброты.",
        type: "international",
      },
      {
        id: `${year}-feb-21-${idCounter++}`,
        date: new Date(year, 1, 21),
        name: "Международный день родного языка",
        description: "Международный день родного языка — праздник языкового разнообразия.",
        type: "international",
      },
      {
        id: `${year}-feb-23-${idCounter++}`,
        date: new Date(year, 1, 23),
        name: "День защитника Отечества",
        description: "День защитника Отечества — праздник, отмечаемый 23 февраля в России, посвященный защитникам Родины.",
        type: "national",
      }
    )

    // МАРТ
    holidays.push(
      {
        id: `${year}-mar-1-${idCounter++}`,
        date: new Date(year, 2, 1),
        name: "День эксперта-криминалиста МВД России",
        description: "День эксперта-криминалиста МВД России — профессиональный праздник.",
        type: "professional",
      },
      {
        id: `${year}-mar-3-${idCounter++}`,
        date: new Date(year, 2, 3),
        name: "Всемирный день писателя",
        description: "Всемирный день писателя — международный праздник литераторов.",
        type: "international",
      },
      {
        id: `${year}-mar-8-${idCounter++}`,
        date: new Date(year, 2, 8),
        name: "Международный женский день",
        description: "Международный женский день — праздник, который отмечается ежегодно 8 марта в честь женщин.",
        type: "international",
      },
      {
        id: `${year}-mar-11-${idCounter++}`,
        date: new Date(year, 2, 11),
        name: "День работника органов наркоконтроля",
        description: "День работника органов наркоконтроля — профессиональный праздник.",
        type: "professional",
      },
      {
        id: `${year}-mar-12-${idCounter++}`,
        date: new Date(year, 2, 12),
        name: "День работников уголовно-исполнительной системы",
        description: "День работников уголовно-исполнительной системы — профессиональный праздник.",
        type: "professional",
      },
      {
        id: `${year}-mar-15-${idCounter++}`,
        date: new Date(year, 2, 15),
        name: "Всемирный день защиты прав потребителей",
        description: "Всемирный день защиты прав потребителей — международный праздник.",
        type: "international",
      },
      {
        id: `${year}-mar-18-${idCounter++}`,
        date: new Date(year, 2, 18),
        name: "День воссоединения Крыма с Россией",
        description: "День воссоединения Крыма с Россией — памятная дата России, отмечаемая 18 марта.",
        type: "national",
      },
      {
        id: `${year}-mar-19-${idCounter++}`,
        date: new Date(year, 2, 19),
        name: "День моряка-подводника",
        description: "День моряка-подводника — профессиональный праздник подводников.",
        type: "professional",
      },
      {
        id: `${year}-mar-21-${idCounter++}`,
        date: new Date(year, 2, 21),
        name: "Всемирный день поэзии",
        description: "Всемирный день поэзии — международный праздник поэтов.",
        type: "international",
      },
      {
        id: `${year}-mar-22-${idCounter++}`,
        date: new Date(year, 2, 22),
        name: "Всемирный день водных ресурсов",
        description: "Всемирный день водных ресурсов — экологический праздник.",
        type: "international",
      },
      {
        id: `${year}-mar-23-${idCounter++}`,
        date: new Date(year, 2, 23),
        name: "Всемирный метеорологический день",
        description: "Всемирный метеорологический день — международный праздник метеорологов.",
        type: "international",
      },
      {
        id: `${year}-mar-25-${idCounter++}`,
        date: new Date(year, 2, 25),
        name: "День работника культуры России",
        description: "День работника культуры России — профессиональный праздник.",
        type: "professional",
      },
      {
        id: `${year}-mar-27-${idCounter++}`,
        date: new Date(year, 2, 27),
        name: "Всемирный день театра",
        description: "Всемирный день театра — международный праздник театральных деятелей.",
        type: "international",
      }
    )

    // АПРЕЛЬ
    holidays.push(
      {
        id: `${year}-apr-1-${idCounter++}`,
        date: new Date(year, 3, 1),
        name: "День смеха",
        description: "День смеха — международный праздник юмора и веселья.",
        type: "international",
      },
      {
        id: `${year}-apr-2-${idCounter++}`,
        date: new Date(year, 3, 2),
        name: "Всемирный день распространения информации о проблеме аутизма",
        description: "Всемирный день распространения информации о проблеме аутизма.",
        type: "international",
      },
      {
        id: `${year}-apr-7-${idCounter++}`,
        date: new Date(year, 3, 7),
        name: "Всемирный день здоровья",
        description: "Всемирный день здоровья — международный праздник здравоохранения.",
        type: "international",
      },
      {
        id: `${year}-apr-12-${idCounter++}`,
        date: new Date(year, 3, 12),
        name: "День космонавтики",
        description: "День космонавтики — памятная дата, отмечаемая 12 апреля в ознаменование первого полёта человека в космос.",
        type: "national",
      },
      {
        id: `${year}-apr-15-${idCounter++}`,
        date: new Date(year, 3, 15),
        name: "День специалиста по радиоэлектронной борьбе",
        description: "День специалиста по радиоэлектронной борьбе — профессиональный праздник.",
        type: "professional",
      },
      {
        id: `${year}-apr-18-${idCounter++}`,
        date: new Date(year, 3, 18),
        name: "День воинской славы России",
        description: "День победы русских воинов князя Александра Невского над немецкими рыцарями на Чудском озере (Ледовое побоище, 1242 год).",
        type: "national",
      },
      {
        id: `${year}-apr-22-${idCounter++}`,
        date: new Date(year, 3, 22),
        name: "Международный день Земли",
        description: "Международный день Земли — экологический праздник.",
        type: "international",
      },
      {
        id: `${year}-apr-23-${idCounter++}`,
        date: new Date(year, 3, 23),
        name: "Всемирный день книги и авторского права",
        description: "Всемирный день книги и авторского права — международный праздник книг.",
        type: "international",
      },
      {
        id: `${year}-apr-26-${idCounter++}`,
        date: new Date(year, 3, 26),
        name: "День участников ликвидации последствий радиационных аварий и катастроф",
        description: "День участников ликвидации последствий радиационных аварий и катастроф и памяти жертв этих аварий и катастроф.",
        type: "national",
      },
      {
        id: `${year}-apr-28-${idCounter++}`,
        date: new Date(year, 3, 28),
        name: "Всемирный день охраны труда",
        description: "Всемирный день охраны труда — международный праздник безопасности труда.",
        type: "international",
      },
      {
        id: `${year}-apr-30-${idCounter++}`,
        date: new Date(year, 3, 30),
        name: "День пожарной охраны",
        description: "День пожарной охраны — профессиональный праздник пожарных.",
        type: "professional",
      }
    )

    // МАЙ
    holidays.push(
      {
        id: `${year}-may-1-${idCounter++}`,
        date: new Date(year, 4, 1),
        name: "Праздник Весны и Труда",
        description: "Праздник Весны и Труда — отмечается во многих странах мира 1 мая.",
        type: "national",
      },
      {
        id: `${year}-may-3-${idCounter++}`,
        date: new Date(year, 4, 3),
        name: "Всемирный день свободы печати",
        description: "Всемирный день свободы печати — международный праздник журналистов.",
        type: "international",
      },
      {
        id: `${year}-may-7-${idCounter++}`,
        date: new Date(year, 4, 7),
        name: "День радио",
        description: "День радио — профессиональный праздник работников радиосвязи.",
        type: "professional",
      },
      {
        id: `${year}-may-9-${idCounter++}`,
        date: new Date(year, 4, 9),
        name: "День Победы",
        description: "День Победы — праздник победы в Великой Отечественной войне 1941—1945 годов.",
        type: "national",
      },
      {
        id: `${year}-may-12-${idCounter++}`,
        date: new Date(year, 4, 12),
        name: "Международный день медицинской сестры",
        description: "Международный день медицинской сестры — профессиональный праздник медсестер.",
        type: "international",
      },
      {
        id: `${year}-may-15-${idCounter++}`,
        date: new Date(year, 4, 15),
        name: "Международный день семьи",
        description: "Международный день семьи — праздник, посвященный семейным ценностям.",
        type: "international",
      },
      {
        id: `${year}-may-17-${idCounter++}`,
        date: new Date(year, 4, 17),
        name: "Всемирный день электросвязи и информационного общества",
        description: "Всемирный день электросвязи и информационного общества.",
        type: "international",
      },
      {
        id: `${year}-may-18-${idCounter++}`,
        date: new Date(year, 4, 18),
        name: "Международный день музеев",
        description: "Международный день музеев — праздник работников музеев.",
        type: "international",
      },
      {
        id: `${year}-may-21-${idCounter++}`,
        date: new Date(year, 4, 21),
        name: "День военного переводчика",
        description: "День военного переводчика — профессиональный праздник военных переводчиков.",
        type: "professional",
      },
      {
        id: `${year}-may-24-${idCounter++}`,
        date: new Date(year, 4, 24),
        name: "День славянской письменности и культуры",
        description: "День славянской письменности и культуры — российский государственный праздник.",
        type: "national",
      },
      {
        id: `${year}-may-25-1-${idCounter++}`,
        date: new Date(year, 4, 25),
        name: "Международный день пропавших детей",
        description: "Международный день, посвященный проблеме пропавших детей. Символом дня является синяя незабудка.",
        type: "international",
      },
      {
        id: `${year}-may-25-2-${idCounter++}`,
        date: new Date(year, 4, 25),
        name: "День филолога в России",
        description: "Профессиональный праздник филологов, учителей русского языка и литературы, работников библиотек.",
        type: "professional",
      },
      {
        id: `${year}-may-25-3-${idCounter++}`,
        date: new Date(year, 4, 25),
        name: "День химика",
        description: "Профессиональный праздник работников химической и нефтехимической промышленности.",
        type: "professional",
      },
      {
        id: `${year}-may-26-${idCounter++}`,
        date: new Date(year, 4, 26),
        name: "День российского предпринимательства",
        description: "Профессиональный праздник российских предпринимателей и бизнесменов.",
        type: "professional",
      },
      {
        id: `${year}-may-27-${idCounter++}`,
        date: new Date(year, 4, 27),
        name: "Общероссийский день библиотек",
        description: "Профессиональный праздник работников библиотек и всех любителей книг.",
        type: "professional",
      },
      {
        id: `${year}-may-28-${idCounter++}`,
        date: new Date(year, 4, 28),
        name: "День пограничника",
        description: "День пограничника — профессиональный праздник российских пограничников.",
        type: "professional",
      },
      {
        id: `${year}-may-29-${idCounter++}`,
        date: new Date(year, 4, 29),
        name: "День военного автомобилиста",
        description: "День военного автомобилиста — профессиональный праздник военных водителей.",
        type: "professional",
      },
      {
        id: `${year}-may-31-${idCounter++}`,
        date: new Date(year, 4, 31),
        name: "Всемирный день без табака",
        description: "Всемирный день без табака — международный день борьбы с курением.",
        type: "international",
      }
    )

    // ИЮНЬ
    holidays.push(
      {
        id: `${year}-jun-1-${idCounter++}`,
        date: new Date(year, 5, 1),
        name: "Международный день защиты детей",
        description: "Международный день защиты детей — праздник, посвящённый детям.",
        type: "international",
      },
      {
        id: `${year}-jun-4-${idCounter++}`,
        date: new Date(year, 5, 4),
        name: "Международный день невинных детей — жертв агрессии",
        description: "Международный день невинных детей — жертв агрессии.",
        type: "international",
      },
      {
        id: `${year}-jun-5-${idCounter++}`,
        date: new Date(year, 5, 5),
        name: "День эколога",
        description: "День эколога — профессиональный праздник всех российских защитников природы.",
        type: "professional",
      },
      {
        id: `${year}-jun-6-${idCounter++}`,
        date: new Date(year, 5, 6),
        name: "Пушкинский день России",
        description: "Пушкинский день России — памятная дата России, отмечаемая ежегодно 6 июня.",
        type: "national",
      },
      {
        id: `${year}-jun-8-${idCounter++}`,
        date: new Date(year, 5, 8),
        name: "Всемирный день океанов",
        description: "Всемирный день океанов — экологический праздник.",
        type: "international",
      },
      {
        id: `${year}-jun-9-${idCounter++}`,
        date: new Date(year, 5, 9),
        name: "Международный день друзей",
        description: "Международный день друзей — праздник дружбы.",
        type: "international",
      },
      {
        id: `${year}-jun-12-${idCounter++}`,
        date: new Date(year, 5, 12),
        name: "День России",
        description: "День России — государственный праздник Российской Федерации, отмечаемый 12 июня.",
        type: "national",
      },
      {
        id: `${year}-jun-14-${idCounter++}`,
        date: new Date(year, 5, 14),
        name: "Всемирный день донора крови",
        description: "Всемирный день донора крови — международный праздник доноров.",
        type: "international",
      },
      {
        id: `${year}-jun-15-${idCounter++}`,
        date: new Date(year, 5, 15),
        name: "Всемирный день ветра",
        description: "Всемирный день ветра — экологический праздник.",
        type: "international",
      },
      {
        id: `${year}-jun-17-${idCounter++}`,
        date: new Date(year, 5, 17),
        name: "Всемирный день борьбы с опустыниванием и засухой",
        description: "Всемирный день борьбы с опустыниванием и засухой — экологический праздник.",
        type: "international",
      },
      {
        id: `${year}-jun-20-${idCounter++}`,
        date: new Date(year, 5, 20),
        name: "Всемирный день беженцев",
        description: "Всемирный день беженцев — международный день солидарности с беженцами.",
        type: "international",
      },
      {
        id: `${year}-jun-21-${idCounter++}`,
        date: new Date(year, 5, 21),
        name: "Международный день йоги",
        description: "Международный день йоги — праздник здорового образа жизни.",
        type: "international",
      },
      {
        id: `${year}-jun-22-${idCounter++}`,
        date: new Date(year, 5, 22),
        name: "День памяти и скорби",
        description: "День памяти и скорби — памятная дата России, день начала Великой Отечественной войны.",
        type: "national",
      },
      {
        id: `${year}-jun-23-${idCounter++}`,
        date: new Date(year, 5, 23),
        name: "Международный Олимпийский день",
        description: "Международный Олимпийский день — праздник олимпийского движения.",
        type: "international",
      },
      {
        id: `${year}-jun-25-${idCounter++}`,
        date: new Date(year, 5, 25),
        name: "День дружбы и единения славян",
        description: "День дружбы и единения славян — праздник славянских народов.",
        type: "international",
      },
      {
        id: `${year}-jun-26-${idCounter++}`,
        date: new Date(year, 5, 26),
        name: "Международный день борьбы с наркоманией",
        description: "Международный день борьбы с наркоманией и незаконным оборотом наркотиков.",
        type: "international",
      },
      {
        id: `${year}-jun-27-${idCounter++}`,
        date: new Date(year, 5, 27),
        name: "День молодёжи России",
        description: "День молодёжи России — российский государственный праздник.",
        type: "national",
      },
      {
        id: `${year}-jun-29-${idCounter++}`,
        date: new Date(year, 5, 29),
        name: "День партизан и подпольщиков",
        description: "День партизан и подпольщиков — памятная дата России.",
        type: "national",
      }
    )

    // ИЮЛЬ
    holidays.push(
      {
        id: `${year}-jul-1-${idCounter++}`,
        date: new Date(year, 6, 1),
        name: "День ветеринарного работника",
        description: "День ветеринарного работника — профессиональный праздник ветеринаров.",
        type: "professional",
      },
      {
        id: `${year}-jul-3-${idCounter++}`,
        date: new Date(year, 6, 3),
        name: "День ГИБДД МВД России",
        description: "День ГИБДД МВД России — профессиональный праздник сотрудников ГИБДД.",
        type: "professional",
      },
      {
        id: `${year}-jul-7-${idCounter++}`,
        date: new Date(year, 6, 7),
        name: "День воинской славы России",
        description: "День победы русского флота над турецким флотом в Чесменском сражении (1770 год).",
        type: "national",
      },
      {
        id: `${year}-jul-8-${idCounter++}`,
        date: new Date(year, 6, 8),
        name: "День семьи, любви и верности",
        description: "День семьи, любви и верности — российский праздник, отмечаемый 8 июля.",
        type: "national",
      },
      {
        id: `${year}-jul-10-${idCounter++}`,
        date: new Date(year, 6, 10),
        name: "День воинской славы России",
        description: "День победы русской армии под командованием Петра Первого над шведами в Полтавском сражении (1709 год).",
        type: "national",
      },
      {
        id: `${year}-jul-11-${idCounter++}`,
        date: new Date(year, 6, 11),
        name: "Всемирный день народонаселения",
        description: "Всемирный день народонаселения — международный праздник.",
        type: "international",
      },
      {
        id: `${year}-jul-17-${idCounter++}`,
        date: new Date(year, 6, 17),
        name: "День этнографа",
        description: "День этнографа — профессиональный праздник этнографов.",
        type: "professional",
      },
      {
        id: `${year}-jul-18-${idCounter++}`,
        date: new Date(year, 6, 18),
        name: "Международный день Нельсона Манделы",
        description: "Международный день Нельсона Манделы — день борьбы за права человека.",
        type: "international",
      },
      {
        id: `${year}-jul-20-${idCounter++}`,
        date: new Date(year, 6, 20),
        name: "Международный день шахмат",
        description: "Международный день шахмат — праздник шахматистов.",
        type: "international",
      },
      {
        id: `${year}-jul-26-${idCounter++}`,
        date: new Date(year, 6, 26),
        name: "День парашютиста",
        description: "День парашютиста — профессиональный праздник парашютистов.",
        type: "professional",
      },
      {
        id: `${year}-jul-28-${idCounter++}`,
        date: new Date(year, 6, 28),
        name: "День крещения Руси",
        description: "День крещения Руси — памятная дата России, отмечаемая 28 июля.",
        type: "national",
      },
      {
        id: `${year}-jul-30-${idCounter++}`,
        date: new Date(year, 6, 30),
        name: "Международный день дружбы",
        description: "Международный день дружбы — праздник дружбы между народами.",
        type: "international",
      },
      {
        id: `${year}-jul-31-${idCounter++}`,
        date: new Date(year, 6, 31),
        name: "День системного администратора",
        description: "День системного администратора — профессиональный праздник IT-специалистов.",
        type: "professional",
      }
    )

    // АВГУСТ
    holidays.push(
      {
        id: `${year}-aug-1-${idCounter++}`,
        date: new Date(year, 7, 1),
        name: "День памяти российских воинов, погибших в Первой мировой войне",
        description: "День памяти российских воинов, погибших в Первой мировой войне 1914-1918 годов.",
        type: "national",
      },
      {
        id: `${year}-aug-2-${idCounter++}`,
        date: new Date(year, 7, 2),
        name: "День воздушно-десантных войск",
        description: "День воздушно-десантных войск — профессиональный праздник десантников.",
        type: "professional",
      },
      {
        id: `${year}-aug-12-${idCounter++}`,
        date: new Date(year, 7, 12),
        name: "День военно-воздушных сил",
        description: "День военно-воздушных сил — профессиональный праздник военных лётчиков.",
        type: "professional",
      },
      {
        id: `${year}-aug-22-${idCounter++}`,
        date: new Date(year, 7, 22),
        name: "День Государственного флага Российской Федерации",
        description: "День Государственного флага Российской Федерации — памятная дата России.",
        type: "national",
      },
      {
        id: `${year}-aug-23-${idCounter++}`,
        date: new Date(year, 7, 23),
        name: "День воинской славы России",
        description: "День разгрома советскими войсками немецко-фашистских войск в Курской битве (1943 год).",
        type: "national",
      },
      {
        id: `${year}-aug-27-${idCounter++}`,
        date: new Date(year, 7, 27),
        name: "День российского кино",
        description: "День российского кино — профессиональный праздник кинематографистов.",
        type: "professional",
      }
    )

    // СЕНТЯБРЬ
    holidays.push(
      {
        id: `${year}-sep-1-${idCounter++}`,
        date: new Date(year, 8, 1),
        name: "День знаний",
        description: "День знаний — российский государственный праздник, отмечаемый 1 сентября.",
        type: "national",
      },
      {
        id: `${year}-sep-2-${idCounter++}`,
        date: new Date(year, 8, 2),
        name: "День окончания Второй мировой войны",
        description: "День окончания Второй мировой войны (1945 год) — памятная дата России.",
        type: "national",
      },
      {
        id: `${year}-sep-3-${idCounter++}`,
        date: new Date(year, 8, 3),
        name: "День солидарности в борьбе с терроризмом",
        description: "День солидарности в борьбе с терроризмом — памятная дата России.",
        type: "national",
      },
      {
        id: `${year}-sep-8-${idCounter++}`,
        date: new Date(year, 8, 8),
        name: "День Бородинского сражения",
        description: "День воинской славы России — День Бородинского сражения русской армии под командованием М.И. Кутузова с французской армией (1812 год).",
        type: "national",
      },
      {
        id: `${year}-sep-11-${idCounter++}`,
        date: new Date(year, 8, 11),
        name: "День воинской славы России",
        description: "День победы русской эскадры под командованием Ф.Ф. Ушакова над турецкой эскадрой у мыса Тендра (1790 год).",
        type: "national",
      },
      {
        id: `${year}-sep-21-${idCounter++}`,
        date: new Date(year, 8, 21),
        name: "День воинской славы России",
        description: "День победы русских полков во главе с великим князем Дмитрием Донским над монголо-татарскими войсками в Куликовской битве (1380 год).",
        type: "national",
      },
      {
        id: `${year}-sep-27-${idCounter++}`,
        date: new Date(year, 8, 27),
        name: "День воспитателя и всех дошкольных работников",
        description: "День воспитателя и всех дошкольных работников — профессиональный праздник.",
        type: "professional",
      }
    )

    // ОКТЯБРЬ
    holidays.push(
      {
        id: `${year}-oct-1-${idCounter++}`,
        date: new Date(year, 9, 1),
        name: "День пожилых людей",
        description: "Международный день пожилых людей — праздник, отмечаемый 1 октября.",
        type: "international",
      },
      {
        id: `${year}-oct-4-${idCounter++}`,
        date: new Date(year, 9, 4),
        name: "День космических войск",
        description: "День космических войск — профессиональный праздник военнослужащих космических войск.",
        type: "professional",
      },
      {
        id: `${year}-oct-5-${idCounter++}`,
        date: new Date(year, 9, 5),
        name: "День учителя",
        description: "День учителя — профессиональный праздник работников сферы образования.",
        type: "professional",
      },
      {
        id: `${year}-oct-25-${idCounter++}`,
        date: new Date(year, 9, 25),
        name: "День таможенника Российской Федерации",
        description: "День таможенника Российской Федерации — профессиональный праздник.",
        type: "professional",
      },
      {
        id: `${year}-oct-30-${idCounter++}`,
        date: new Date(year, 9, 30),
        name: "День памяти жертв политических репрессий",
        description: "День памяти жертв политических репрессий — памятная дата России.",
        type: "national",
      }
    )

    // НОЯБРЬ
    holidays.push(
      {
        id: `${year}-nov-4-${idCounter++}`,
        date: new Date(year, 10, 4),
        name: "День народного единства",
        description: "День народного единства — государственный праздник Российской Федерации.",
        type: "national",
      },
      {
        id: `${year}-nov-7-${idCounter++}`,
        date: new Date(year, 10, 7),
        name: "День Октябрьской революции 1917 года",
        description: "День Октябрьской революции 1917 года — памятная дата России.",
        type: "national",
      },
      {
        id: `${year}-nov-10-${idCounter++}`,
        date: new Date(year, 10, 10),
        name: "День сотрудника органов внутренних дел",
        description: "День сотрудника органов внутренних дел Российской Федерации — профессиональный праздник.",
        type: "professional",
      },
      {
        id: `${year}-nov-19-${idCounter++}`,
        date: new Date(year, 10, 19),
        name: "День ракетных войск и артиллерии",
        description: "День ракетных войск и артиллерии — профессиональный праздник военнослужащих.",
        type: "professional",
      },
      {
        id: `${year}-nov-20-${idCounter++}`,
        date: new Date(year, 10, 20),
        name: "День правовой помощи детям",
        description: "Всероссийский день правовой помощи детям — памятная дата России.",
        type: "national",
      }
    )

    // ДЕКАБРЬ
    holidays.push(
      {
        id: `${year}-dec-1-${idCounter++}`,
        date: new Date(year, 11, 1),
        name: "День воинской славы России",
        description: "День победы русской эскадры под командованием П.С. Нахимова над турецкой эскадрой у мыса Синоп (1853 год).",
        type: "national",
      },
      {
        id: `${year}-dec-3-${idCounter++}`,
        date: new Date(year, 11, 3),
        name: "День Неизвестного Солдата",
        description: "День Неизвестного Солдата — памятная дата России.",
        type: "national",
      },
      {
        id: `${year}-dec-5-${idCounter++}`,
        date: new Date(year, 11, 5),
        name: "День начала контрнаступления советских войск под Москвой",
        description: "День воинской славы России — День начала контрнаступления советских войск против немецко-фашистских войск в битве под Москвой (1941 год).",
        type: "national",
      },
      {
        id: `${year}-dec-9-${idCounter++}`,
        date: new Date(year, 11, 9),
        name: "День Героев Отечества",
        description: "День Героев Отечества — памятная дата России.",
        type: "national",
      },
      {
        id: `${year}-dec-12-${idCounter++}`,
        date: new Date(year, 11, 12),
        name: "День Конституции Российской Федерации",
        description: "День Конституции Российской Федерации — государственный праздник России.",
        type: "national",
      },
      {
        id: `${year}-dec-24-${idCounter++}`,
        date: new Date(year, 11, 24),
        name: "День взятия турецкой крепости Измаил",
        description: "День воинской славы России — День взятия турецкой крепости Измаил русскими войсками под командованием А.В. Суворова (1790 год).",
        type: "national",
      },
      {
        id: `${year}-dec-27-${idCounter++}`,
        date: new Date(year, 11, 27),
        name: "День спасателя Российской Федерации",
        description: "День спасателя Российской Федерации — профессиональный праздник.",
        type: "professional",
      }
    )
  }

  return holidays
}

// Генерируем праздники с 2024 по 2030 год
const mockHolidays: Holiday[] = generateHolidaysForYears(2024, 2030)

const mockUserDates: UserDate[] = [
  {
    id: "1",
    userId: "user1",
    date: new Date(2024, 6, 15),
    name: "День рождения Ивана",
    description: "Не забыть купить подарок!",
    type: "birthday",
  },
  {
    id: "2",
    userId: "user1",
    date: new Date(2024, 8, 1),
    name: "Годовщина свадьбы",
    description: "5 лет вместе",
    type: "anniversary",
  },
];

export default function Home() {
  const [selectedHoliday, setSelectedHoliday] = React.useState<Holiday | null>(null)
  const [selectedUserDate, setSelectedUserDate] = React.useState<UserDate | null>(null)
  const [showGreetingGenerator, setShowGreetingGenerator] = React.useState(false)
  const [showPostcardViewer, setShowPostcardViewer] = React.useState(false)
  const [showPostcardGallery, setShowPostcardGallery] = React.useState(false)
  const [showAuthModal, setShowAuthModal] = React.useState(false)
  const [showEmailModal, setShowEmailModal] = React.useState(false)
  const [showEmailHistory, setShowEmailHistory] = React.useState(false)
  const [showTodayNotification, setShowTodayNotification] = React.useState(true)
  const [userData, setUserData] = React.useState<UserData | null>(null)
  const [userDates, setUserDates] = React.useState<UserDate[]>(mockUserDates)

  // Загрузка данных пользователя из localStorage при загрузке компонента
  React.useEffect(() => {
    const savedUserData = localStorage.getItem('userData')
    if (savedUserData) {
      try {
        const parsedUserData = JSON.parse(savedUserData)
        setUserData(parsedUserData)
      } catch (error) {
        console.error('Ошибка при загрузке данных пользователя:', error)
      }
    }
  }, [])

  // Обработчик выбора праздника
  const handleHolidaySelect = (holiday: Holiday) => {
    setSelectedHoliday(holiday)
    setSelectedUserDate(null)
  }

  // Обработчик выбора пользовательской даты
  const handleUserDateSelect = (userDate: UserDate) => {
    setSelectedUserDate(userDate)
    setSelectedHoliday(null)
  }

  // Обработчик добавления пользовательской даты
  const handleAddUserDate = (newUserDate: Omit<UserDate, "id" | "userId">) => {
    const userDate: UserDate = {
      ...newUserDate,
      id: `user-date-${Date.now()}`,
      userId: "user1", // В реальном приложении здесь будет ID текущего пользователя
    }
    setUserDates([...userDates, userDate])
  }

  // Обработчик удаления пользовательской даты
  const handleDeleteUserDate = (userDate: UserDate) => {
    setUserDates(userDates.filter(date => date.id !== userDate.id))
    setSelectedUserDate(null)
  }

  // Обработчик для кнопки "Поделиться"
  const handleShare = (item: Holiday | UserDate | string) => {
    if (typeof item === "string") {
      // Поделиться поздравлением
      alert(`Поздравление скопировано в буфер обмена: ${item}`)
    } else if ("type" in item && (item.type === "birthday" || item.type === "anniversary")) {
      // Поделиться пользовательской датой
      alert(`Поделиться пользовательской датой: ${item.name}`)
    } else {
      // Поделиться праздником
      alert(`Поделиться праздником: ${item.name}`)
    }
  }

  // Обработчик для просмотра открыток
  const handleViewPostcard = (item: Holiday | UserDate) => {
    if ("type" in item && (item.type === "birthday" || item.type === "anniversary")) {
      // Открытка для пользовательской даты
      setSelectedUserDate(item)
      setSelectedHoliday(null)
    } else {
      // Открытка для праздника
      setSelectedHoliday(item as Holiday)
      setSelectedUserDate(null)
    }
    setShowPostcardGallery(true)
  }

  // Обработчик авторизации
  const handleLogin = (newUserData: UserData) => {
    setUserData(newUserData)
  }

  // Обработчик выхода
  const handleLogout = () => {
    localStorage.removeItem('userData')
    setUserData(null)
  }

  // Обработчик отправки открытки на email
  const handleSendEmailPostcard = () => {
    if (!userData) {
      setShowAuthModal(true)
      return
    }
    setShowEmailModal(true)
  }

  // Обработчик отправки открытки из уведомления
  const handleSendHolidayEmail = (holiday: Holiday) => {
    setSelectedHoliday(holiday)
    setSelectedUserDate(null)
    handleSendEmailPostcard()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Календарь праздников</h1>
          <div className="flex items-center gap-4">
            {userData ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Привет, {userData.name}!
                </span>
                <button
                  onClick={handleSendEmailPostcard}
                  className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Отправить открытку на почту
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Выйти
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Войти / Регистрация
              </button>
            )}
            <AddUserDateForm onAddUserDate={handleAddUserDate} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
        {/* Левая колонка - Календарь */}
        <div className="space-y-6">
          <CalendarWithHolidays
            holidays={mockHolidays}
            userDates={userDates}
            onHolidaySelect={handleHolidaySelect}
            onUserDateSelect={handleUserDateSelect}
            className="rounded-lg border shadow-sm"
          />

          {/* Легенда календаря */}
          <div className="rounded-lg border p-4 bg-muted/30">
            <h3 className="text-sm font-medium mb-3">Обозначения в календаре:</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded border-b-2 border-primary bg-primary/10"></div>
                <span>Государственные праздники</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded border-b-2 border-red-500 bg-red-50"></div>
                <span className="text-red-700 font-medium">Ваши важные даты</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="size-1.5 rounded-full bg-primary"></div>
                  <div className="size-1.5 rounded-full bg-red-500"></div>
                </div>
                <span>Индикаторы событий</span>
              </div>
            </div>
          </div>

          {/* Детали праздника или пользовательской даты */}
          {selectedHoliday && (
            <HolidayDetails
              holiday={selectedHoliday}
              onClose={() => setSelectedHoliday(null)}
              onShare={handleShare}
              onViewPostcard={handleViewPostcard}
            />
          )}

          {selectedUserDate && (
            <UserDateDetails
              userDate={selectedUserDate}
              onClose={() => setSelectedUserDate(null)}
              onEdit={() => alert("Редактирование пользовательской даты")}
              onDelete={handleDeleteUserDate}
              onShare={handleShare}
              onViewPostcard={handleViewPostcard}
            />
          )}

          {/* Генератор поздравлений */}
          {showGreetingGenerator && (
            <GreetingGenerator
              holiday={selectedHoliday || undefined}
              userDate={selectedUserDate || undefined}
              onClose={() => setShowGreetingGenerator(false)}
              onShare={handleShare}
            />
          )}

          {/* Просмотр открыток */}
          {showPostcardViewer && (
            <PostcardViewer
              holiday={selectedHoliday || undefined}
              userDate={selectedUserDate || undefined}
              onClose={() => setShowPostcardViewer(false)}
              onShare={handleShare}
            />
          )}
        </div>

        {/* Правая колонка - Ближайшие праздники и важные даты */}
        <div className="space-y-6">
          {/* Уведомление о праздниках сегодня */}
          {showTodayNotification && (
            <TodayHolidayNotification
              holidays={mockHolidays}
              onSendEmail={handleSendHolidayEmail}
              onClose={() => setShowTodayNotification(false)}
            />
          )}

          <div className="rounded-lg border shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-4">Ближайшие праздники</h2>
            <ul className="space-y-3">
              {mockHolidays
                .filter(holiday => holiday.date >= new Date())
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .slice(0, 5)
                .map(holiday => (
                  <li key={holiday.id} className="flex justify-between items-center">
                    <button
                      onClick={() => handleHolidaySelect(holiday)}
                      className="text-left hover:underline"
                    >
                      {holiday.name}
                    </button>
                    <span className="text-sm text-muted-foreground">
                      {getDaysUntilString(holiday.date)}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="rounded-lg border shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <div className="size-2 rounded-full bg-red-500"></div>
              Мои важные даты
            </h2>
            {userDates.length > 0 ? (
              <ul className="space-y-3">
                {userDates
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map(userDate => (
                    <li key={userDate.id} className="flex justify-between items-center">
                      <button
                        onClick={() => handleUserDateSelect(userDate)}
                        className="text-left hover:underline text-red-700 font-medium"
                      >
                        {userDate.name}
                      </button>
                      <span className="text-sm text-red-600">
                        {getDaysUntilString(userDate.date)}
                      </span>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">
                У вас пока нет важных дат. Добавьте их, нажав на кнопку "Добавить важную дату".
              </p>
            )}
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setShowGreetingGenerator(true)}
              className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Создать поздравление
            </button>
            <button
              onClick={() => setShowPostcardGallery(true)}
              className="w-full py-2 px-4 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
            >
              Галерея открыток
            </button>
            {userData && (
              <button
                onClick={() => setShowEmailHistory(true)}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                📧 История отправок
              </button>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t mt-8">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>© 2024 Календарь праздников. Все права защищены.</p>
        </div>
      </footer>

      {/* Галерея открыток */}
      {showPostcardGallery && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <PostcardGallery
            holiday={selectedHoliday || undefined}
            userDate={selectedUserDate || undefined}
            onClose={() => setShowPostcardGallery(false)}
            onShare={handleShare}
          />
        </div>
      )}

      {/* Модал авторизации */}
      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        onLogin={handleLogin}
      />

      {/* Модал отправки открытки на email */}
      {userData && (
        <EmailPostcardModal
          open={showEmailModal}
          onOpenChange={setShowEmailModal}
          holiday={selectedHoliday || undefined}
          userDate={selectedUserDate || undefined}
          userEmail={userData.email}
          userName={userData.name}
        />
      )}

      {/* История отправок email */}
      <EmailHistory
        open={showEmailHistory}
        onOpenChange={setShowEmailHistory}
      />
    </div>
  )

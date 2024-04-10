// /* eslint-disable max-depth */
// import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
// import {
//   Box,
//   Button,
//   Divider,
//   Hidden,
//   IconButton,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import i18next, { type TFunction } from "i18next";
// import moment from "moment-timezone";
// import "moment/locale/lt";
// import {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
//   type Dispatch,
//   type SetStateAction,
// } from "react";
// import {
//   Calendar,
//   Views,
//   momentLocalizer,
//   type View,
// } from "react-big-calendar";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
// import { useTranslation } from "react-i18next";
// import { toast } from "react-toastify";
// import {
//   WeekDayEnum,
//   getDate,
//   getDateFromTimeString,
//   setDateHours,
// } from "utils/ObjectUtils";
// import "./CalendarPage.css";
// import { createApi } from "utils/api/ApiCreator";

// moment.tz.setDefault("Europe/Vilnius");
// const CalendarPage = () => {
//   const [myEvents, setMyEvents] = useState<CalendarEvent[]>([]);
//   const [selectedView, setSelectedView] = useState<View>("week");
//   const [selectedDate, setSelectedDate] = useState<Date>(moment().toDate());
//   const [eventDialogOpen, setEventDialogOpen] = useState<{
//     open: boolean;
//     eventId: number | null;
//   }>({ open: false, eventId: null });
//   const [eventCopy, setEventCopy] = useState<CalendarEvent | undefined>();
//   const [lastFetchedDates, setLastFetchedDates] = useState<{
//     dateFrom: Date;
//     dateTo: Date;
//   }>({
//     dateFrom: moment().subtract(30, "days").toDate(),
//     dateTo: moment().add(30, "days").toDate(),
//   });
//   const [selectedEvent, setSelectedEvent] = useState<CalendarEvent>();
//   const [selectedEventResponse, setSelectedEventResponse] = useState<
//     EventResponse | undefined
//   >();
//   const [values, setValues] = useState<any>(null);
//   const [resizable, setResizable] = useState(true);
//   const [eventResponses, setEventResponses] = useState<EventResponse[]>([]);
//   const [newEvent, setNewEvent] = useState<CalendarEvent | undefined>();

//   const [minMaxHours, setMinMaxHours] = useState<
//     | { minHour: number; minMinute: number; maxHour: number; maxMinute: number }
//     | undefined
//   >();
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   moment.locale("lt", {
//     week: {
//       dow: 1,
//     },
//   });
//   moment.locale("lt");
//   const localizer = momentLocalizer(moment);
//   const calendarRef = useRef(null);
//   //   const appointmentAPI = useRef(createApi("appointment") as Appointments);
//   //   const accountAPI = useRef(createApi("account") as Account);
//   //   const serviceAPI = useRef(createApi("service") as Services);
//   //   const scheduleAPI = useRef(createApi("schedule") as Schedules);
//   const { t } = useTranslation("translation", { keyPrefix: "CalendarPage" });
//   const isMobile = useMediaQuery("(max-width: 600px)");

//   const getData = async () => {
//     setIsLoading(true);

//     setIsLoading(false);
//   };

//   useEffect(() => {
//     getData();

//     return () => {
//       moment.tz.setDefault("Europe/Vilnius");
//     };
//   }, []); // eslint-disable-line

//   const getEventResponses = (dateFrom: Date, dateTo: Date) => {};

//   const mapEventsToCalendarEvents = (eventResponses: EventResponse[]) => {
//     const events: CalendarEvent[] = eventResponses.map((eventResponse) => ({
//       id: eventResponse.id,
//       title: eventResponse.patient.name ?? "",
//       start: moment(eventResponse.startDate).toDate(),
//       end: moment(eventResponse.endDate).toDate(),
//       isResizable: true,
//       isDraggable: true,
//     }));

//     setMyEvents((previous: any) => {
//       const filtered = previous.filter(
//         (ev: any) =>
//           !eventResponses.some((appointment) => appointment.id === ev.id)
//       );
//       const newEvents = [...filtered, ...events];
//       return newEvents;
//     });
//   };

//   const handleDateChange = (date: Date) => {
//     setSelectedDate(date);

//     if (
//       moment(date).isAfter(moment(lastFetchedDates.dateTo).subtract(10, "days"))
//     ) {
//       getEventResponses(
//         lastFetchedDates.dateFrom,
//         moment(lastFetchedDates.dateTo).add(30, "days").toDate()
//       );
//       return;
//     }

//     if (
//       moment(date).isBefore(moment(lastFetchedDates.dateFrom).add(10, "days"))
//     ) {
//       getEventResponses(
//         moment(lastFetchedDates.dateFrom).subtract(30, "days").toDate(),
//         lastFetchedDates.dateTo
//       );
//     }
//   };

//   const handleViewChange = (view: View) => {
//     setSelectedView(view);
//   };

//   const { components, defaultDate, views, formats } = useMemo(
//     () => ({
//       components: {
//         week: {
//           header: WeekHeader,
//         },
//         eventWrapper(props: any) {
//           // Create clone of the component but with the new props
//           const newProps = {
//             ...props,
//             style: {
//               ...props.style,
//             },
//             children: {
//               ...props.children,
//               props: {
//                 ...props.children.props,
//                 style: {
//                   ...props.children.props.style,
//                 },
//               },
//             },
//           };
//           return <div {...newProps}>{newProps.children}</div>;
//         },
//       },
//       defaultDate: new Date(),
//       views: (Object.keys(Views) as Array<keyof typeof Views>).map(
//         (k) => Views[k]
//       ),
//       formats: {
//         timeGutterFormat: (date: any, culture: any, localizer: any) =>
//           localizer.format(date, "HH:mm", culture),
//       },
//     }),
//     []
//   );

//   const getClassName = (event: any) => {
//     let className = "";
//     if (isPastDate(event.end)) {
//       className += "pastDate";
//     }

//     if (event.isDayOff) {
//       className += " dayOff";
//     }

//     if (moment(event.end).diff(moment(event.start), "minute") < 45) {
//       className += " short-event";
//     }

//     return className;
//   };

//   const eventPropGetter = useCallback(
//     (event: any) => ({
//       ...((!resizable || !event.isResizable) && { className: "nonResizable" }),
//       className: getClassName(event),
//     }),
//     [resizable]
//   );

//   const dayPropGetter = useCallback(
//     (date: any) => ({
//       className: isWeekend(date) ? "weekend" : "",
//     }),
//     []
//   );

//   const DnDCalendar = withDragAndDrop(Calendar);

//   const handleSelectSlot = useCallback(
//     ({ start, end }: any) => {
//       const newCalendarEvent: CalendarEvent = {
//         id: 0,
//         start,
//         end,
//         title: "New appointment",
//         isResizable: true,
//         isDraggable: true,
//       };
//       if (values) {
//         setMyEvents((previous) => [...previous, newCalendarEvent]);
//       }

//       setNewEvent(newCalendarEvent);
//       setEventDialogOpen({ open: true, eventId: 0 });
//     },
//     [setMyEvents, values]
//   );

//   const moveEvent = useCallback(
//     async ({
//       event,
//       start,
//       end,
//       isAllDay: droppedOnAllDaySlot = false,
//     }: any) => {
//       const eventResponse = eventResponses.find(
//         (appointment) => appointment.id === event.id
//       );

//       if (!appointment) {
//         return;
//       }

//       appointment.startDate = start.toISOString();
//       appointment.endDate = end.toISOString();

//       const { allDay } = event;
//       if (!allDay && droppedOnAllDaySlot) {
//         event.allDay = true;
//       }

//       setEventCopy(event);
//       setMyEvents((previous: any) => {
//         const existing = previous.find((ev: any) => ev.id === event.id) ?? {};
//         const filtered = previous.filter((ev: any) => ev.id !== event.id);
//         return [...filtered, { ...existing, start, end, allDay }];
//       });

//       setSelectedAppointment(appointment);
//       setEventDialogOpen({ open: true, eventId: event.id });
//     },
//     [setMyEvents, appointments]
//   );

//   const resizeEvent = useCallback(
//     async ({ event, start, end }: any) => {
//       const appointment = appointments.find(
//         (appointment) => appointment.id === event.id
//       );

//       if (!appointment) {
//         return;
//       }

//       appointment.startDate = start.toISOString();
//       appointment.endDate = end.toISOString();

//       setEventCopy(event);
//       setMyEvents((previous: any) => {
//         const existing = previous.find((ev: any) => ev.id === event.id) ?? {};
//         const filtered = previous.filter((ev: any) => ev.id !== event.id);
//         return [...filtered, { ...existing, start, end }];
//       });

//       setSelectedAppointment(appointment);
//       setEventDialogOpen({ open: true, eventId: event.id });
//     },
//     [setMyEvents, appointments]
//   );

//   const selectEvent = useCallback(
//     (event: any) => {
//       if (event.isDayOff) {
//         return;
//       }

//       const appointment = appointments.find(
//         (appointment) => appointment.id === event.id
//       );
//       if (!appointment) {
//         return;
//       }

//       appointment.startDate = event.start.toISOString();
//       appointment.endDate = event.end.toISOString();

//       setSelectedEvent(event);
//       setSelectedAppointment(appointment);
//       setMyEvents((previous: any) => {
//         const existing = previous.find((ev: any) => ev.id === event.id) ?? {};
//         const filtered = previous.filter((ev: any) => ev.id !== event.id);
//         return [...filtered, { ...existing, selected: true }];
//       });
//       setEventDialogOpen({ open: true, eventId: event.id });
//     },
//     [setMyEvents, appointments]
//   );

//   const handleSubmit = async (values: AppointmentFormValues) => {
//     setValues(values);

//     if (
//       !values.service ||
//       !values.client ||
//       !values.location ||
//       !values.startTime ||
//       !values.endTime
//     ) {
//       return;
//     }

//     if (
//       eventDialogOpen.eventId &&
//       appointments.some(
//         (appointment) => appointment.id === eventDialogOpen.eventId
//       )
//     ) {
//       const updateAppointment: AppointmentUpdateRequest = {
//         id: eventDialogOpen.eventId,
//         patientId: values.client,
//         startDate: getDate(
//           values.date ?? values.startTime,
//           values.startTime
//         ).toISOString(),
//         endDate: getDate(
//           values.date ?? values.endTime,
//           values.endTime
//         ).toISOString(),
//         serviceId: values.service,
//         locationId: values.location,
//         notes: values.notes,
//         address: values.locationAddress,
//         sendNotifications: values.sendNotifications,
//       };

//       await appointmentAPI.current.updateSpecialistAppointment(
//         eventDialogOpen.eventId,
//         updateAppointment
//       );
//       setEventDialogOpen({ open: false, eventId: null });
//       setEventCopy(undefined);
//       setSelectedEvent(undefined);
//       setSelectedAppointment(undefined);
//       await getAppointments();
//       return;
//     }

//     const newAppointment: AppointmentCreateRequest = {
//       patientId: values.client,
//       startDate: getDate(
//         values.date ?? values.startTime,
//         values.startTime
//       ).toISOString(),
//       endDate: getDate(
//         values.date ?? values.endTime,
//         values.endTime
//       ).toISOString(),
//       serviceId: values.service,
//       locationId: values.location,
//       notes: values.notes,
//       address: values.locationAddress,
//       sendNotifications: values.sendNotifications,
//     };

//     await appointmentAPI.current.createSpecialistAppointment(newAppointment);
//     setEventDialogOpen({ open: false, eventId: null });
//     if (newEvent) {
//       setMyEvents((previous) => {
//         const filtered = previous.filter((ev: any) => ev.id !== newEvent.id);
//         return [...filtered];
//       });
//       setNewEvent(undefined);
//     }

//     setEventCopy(undefined);
//     setSelectedEvent(undefined);
//     setSelectedAppointment(undefined);
//     await getAppointments();
//   };

//   if (isLoading) {
//     return <LengvaLoadingSpinner />;
//   }

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         width: "100%",
//         height: isMobile ? "150%" : "100%",
//         gap: isMobile ? "1rem" : "2rem",
//       }}
//       className="height600"
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography variant="h2">{t("Calendar")}</Typography>
//         {!isMobile && (
//           <LengvaButton
//             icon={PlusIcon}
//             title={t("New appointment")}
//             onClick={() => {
//               setEventDialogOpen({ open: true, eventId: null });
//             }}
//           />
//         )}
//       </Box>
//       <CalendarHeader
//         selectedDate={selectedDate}
//         selectedView={selectedView}
//         setSelectedDate={handleDateChange}
//         setSelectedView={handleViewChange}
//       />
//       {!isLoading && schedules.length === 0 && (
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             width: "100%",
//             backgroundColor: "#EB0E0E",
//             borderRadius: "12px",
//             padding: "1rem",
//             gap: "0.5rem",
//             boxSizing: "border-box",
//           }}
//         >
//           <Typography
//             variant="h4"
//             color="#FFFFF"
//             sx={{
//               color: "#FFFFFF",
//             }}
//           >
//             {t("You have no schedules set up.")}
//           </Typography>
//           <Typography
//             variant="h5"
//             sx={{
//               color: "#FFFFFF",
//             }}
//           >
//             {t(
//               "Please create a schedule to be able to see and create appointments."
//             )}
//           </Typography>
//         </Box>
//       )}
//       <Box
//         sx={{
//           backgroundColor: "#FFFFFF",
//           borderRadius: "12px",
//           height: "100%",
//           padding: isMobile ? "0.75rem" : "1.5rem",
//           marginBottom: isMobile ? "4rem" : "0",
//         }}
//       >
//         <DnDCalendar
//           ref={calendarRef}
//           popup
//           showMultiDayTimes
//           resizable
//           selectable
//           style={{
//             width: "100%",
//           }}
//           draggableAccessor={(event: any) => event.isDraggable}
//           defaultView="week"
//           localizer={localizer}
//           components={components}
//           toolbar={false}
//           defaultDate={defaultDate}
//           events={myEvents}
//           formats={formats}
//           date={selectedDate}
//           view={selectedView}
//           min={
//             minMaxHours?.minHour
//               ? moment(selectedDate)
//                   .hours(minMaxHours.minHour)
//                   .minutes(minMaxHours.minMinute)
//                   .toDate()
//               : moment(selectedDate).hours(8).minutes(0).toDate()
//           }
//           max={
//             minMaxHours?.maxHour
//               ? moment(selectedDate)
//                   .hours(minMaxHours.maxHour)
//                   .minutes(0)
//                   .toDate()
//               : moment(selectedDate).hours(17).minutes(0).toDate()
//           }
//           eventPropGetter={eventPropGetter}
//           dayPropGetter={dayPropGetter}
//           step={15}
//           views={views}
//           timeslots={4}
//           resizableAccessor={(event: any) =>
//             event.isResizable && !isPastDate(event.start)
//           }
//           selected={selectedEvent}
//           onSelectSlot={handleSelectSlot}
//           onEventDrop={moveEvent}
//           onEventResize={resizeEvent}
//           onSelectEvent={selectEvent}
//         />
//         <Hidden mdUp>
//           <Box
//             sx={{
//               display: "flex",
//               padding: "1rem",
//               position: "fixed",
//               right: "0",
//               bottom: "0",
//               zIndex: 99,
//             }}
//           >
//             <LengvaButton
//               title="Appointment"
//               icon={PlusIcon}
//               onClick={() => {
//                 setEventDialogOpen({ open: true, eventId: null });
//               }}
//             />
//           </Box>
//         </Hidden>
//       </Box>
//       {eventDialogOpen.open && (
//         <AppointmentCreateEditDialog
//           isEdit={
//             eventDialogOpen.eventId !== null && eventDialogOpen.eventId !== 0
//           }
//           open={eventDialogOpen.open}
//           showStickyFooter={!isMobile}
//           showSubmitButton={isMobile}
//           dialogTitle={
//             eventDialogOpen.eventId
//               ? t("Edit appointment")
//               : t("New appointment")
//           }
//           appointment={selectedAppointment}
//           clients={clients}
//           services={services}
//           newEvent={newEvent}
//           handleSubmit={handleSubmit}
//           handleCancel={
//             newEvent ?? eventDialogOpen.eventId === null
//               ? undefined
//               : handleCancelAppointment
//           }
//           handleClose={() => {
//             setMyEvents((previous) => {
//               if (eventCopy) {
//                 const filtered = previous.filter(
//                   (ev: any) => ev.id !== eventCopy.id
//                 );
//                 return [...filtered, { ...eventCopy }];
//               }

//               if (newEvent) {
//                 const filtered = previous.filter(
//                   (ev: any) => ev.id !== newEvent.id
//                 );
//                 return [...filtered];
//               }

//               return previous;
//             });
//             setEventDialogOpen({ open: false, eventId: null });
//             setNewEvent(undefined);
//             setSelectedEvent(undefined);
//             setSelectedAppointment(undefined);
//             setEventCopy(undefined);
//           }}
//         />
//       )}
//     </Box>
//   );
// };

// export default CalendarPage;

// const CalendarHeader = ({
//   selectedView,
//   selectedDate,
//   setSelectedDate,
//   setSelectedView,
// }: {
//   selectedView: View;
//   selectedDate: Date;
//   setSelectedDate: (date: Date) => void;
//   setSelectedView: (view: View) => void;
// }) => {
//   const isMobile = useMediaQuery("(max-width: 600px)");
//   const { t } = useTranslation("translation", { keyPrefix: "CalendarPage" });

//   const handleNextWeek = () => {
//     setSelectedDate(moment(selectedDate).add(1, "week").toDate());
//   };

//   const handlePreviousWeek = () => {
//     setSelectedDate(moment(selectedDate).subtract(1, "week").toDate());
//   };

//   const handleNextMonth = () => {
//     setSelectedDate(moment(selectedDate).add(1, "month").toDate());
//   };

//   const handlePreviousMonth = () => {
//     setSelectedDate(moment(selectedDate).subtract(1, "month").toDate());
//   };

//   const handleNextDay = () => {
//     setSelectedDate(moment(selectedDate).add(1, "day").toDate());
//   };

//   const handlePreviousDay = () => {
//     setSelectedDate(moment(selectedDate).subtract(1, "day").toDate());
//   };

//   return (
//     <Box display="flex" width="100%">
//       {!isMobile && (
//         <>
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             marginRight="auto"
//             gap="2rem"
//             flex={2}
//           >
//             <Box display="flex" alignItems="center" gap="16px">
//               {selectedView !== "day" && (
//                 <Typography
//                   variant="h3"
//                   sx={{
//                     textTransform: "capitalize",
//                   }}
//                 >
//                   {moment(selectedDate).locale(i18next.language).format("MMMM")}{" "}
//                   {moment(selectedDate).format("YYYY")}
//                 </Typography>
//               )}
//               {selectedView === "week" && (
//                 <>
//                   <Divider
//                     flexItem
//                     orientation="vertical"
//                     sx={{
//                       borderColor: "#E9E9EB",
//                     }}
//                   />
//                   <Typography variant="h4" color="text.tertiary" fontSize={18}>
//                     {moment(selectedDate).format("w")} {t("week")}
//                   </Typography>
//                 </>
//               )}
//               {selectedView === "day" && (
//                 <Typography variant="h3" textTransform="capitalize">
//                   {moment(selectedDate)
//                     .weekday(selectedDate.getDay() - 1)
//                     .locale(i18next.language)
//                     .format("ddd")}
//                   , {moment(selectedDate).format("DD")}
//                 </Typography>
//               )}
//             </Box>
//             <Box display="flex">
//               <CalendarViewSelector
//                 selectedView={selectedView}
//                 setSelectedView={setSelectedView}
//               />
//             </Box>
//           </Box>
//           <Box
//             display="flex"
//             gap="12px"
//             flex={1}
//             justifyContent="flex-end"
//             alignItems="center"
//             marginLeft="24px"
//           >
//             <IconButton
//               sx={{
//                 padding: "12px",
//                 backgroundColor: "#F4F4F5",
//                 borderRadius: "12px",
//                 height: "44px",
//                 width: "44px",
//               }}
//               onClick={
//                 selectedView === "day"
//                   ? handlePreviousDay
//                   : selectedView === "week"
//                     ? handlePreviousWeek
//                     : handlePreviousMonth
//               }
//             >
//               <ChevronLeftRounded />
//             </IconButton>
//             <IconButton
//               sx={{
//                 padding: "12px",
//                 backgroundColor: "#F4F4F5",
//                 borderRadius: "12px",
//                 height: "44px",
//                 width: "44px",
//               }}
//               onClick={
//                 selectedView === "day"
//                   ? handleNextDay
//                   : selectedView === "week"
//                     ? handleNextWeek
//                     : handleNextMonth
//               }
//             >
//               <ChevronRightRounded />
//             </IconButton>
//           </Box>
//         </>
//       )}
//       {isMobile && (
//         <Box display="flex" flexDirection="column" gap="16px" width="100%">
//           <CalendarViewSelector
//             selectedView={selectedView}
//             setSelectedView={setSelectedView}
//           />
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             gap="1rem"
//           >
//             <Box display="flex" alignItems="center" gap="16px">
//               {selectedView !== "day" && (
//                 <Typography
//                   variant="h4"
//                   sx={{
//                     textTransform: "capitalize",
//                   }}
//                 >
//                   {moment(selectedDate).locale(i18next.language).format("MMMM")}{" "}
//                   {moment(selectedDate).format("YYYY")}
//                 </Typography>
//               )}
//               {selectedView === "day" && (
//                 <Typography variant="h4" textTransform="capitalize">
//                   {moment(selectedDate)
//                     .weekday(selectedDate.getDay())
//                     .locale(i18next.language)
//                     .format("ddd")}
//                   , {moment(selectedDate).format("DD")}
//                 </Typography>
//               )}
//             </Box>
//             <Box
//               display="flex"
//               gap="12px"
//               justifyContent="flex-end"
//               alignItems="center"
//               marginLeft="24px"
//             >
//               <IconButton
//                 sx={{
//                   padding: "12px",
//                   backgroundColor: "#F4F4F5",
//                   borderRadius: "12px",
//                   height: "44px",
//                   width: "44px",
//                 }}
//                 onClick={
//                   selectedView === "day"
//                     ? handlePreviousDay
//                     : selectedView === "week"
//                       ? handlePreviousWeek
//                       : handlePreviousMonth
//                 }
//               >
//                 <ChevronLeftRounded />
//               </IconButton>
//               <IconButton
//                 sx={{
//                   padding: "12px",
//                   backgroundColor: "#F4F4F5",
//                   borderRadius: "12px",
//                   height: "44px",
//                   width: "44px",
//                 }}
//                 onClick={
//                   selectedView === "day"
//                     ? handleNextDay
//                     : selectedView === "week"
//                       ? handleNextWeek
//                       : handleNextMonth
//                 }
//               >
//                 <ChevronRightRounded />
//               </IconButton>
//             </Box>
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// };

// interface CalendarViewSelectorProps {
//   selectedView: View;
//   setSelectedView: (view: View) => void;
// }

// export const CalendarViewSelector = ({
//   selectedView,
//   setSelectedView,
// }: CalendarViewSelectorProps) => {
//   const isMobile = useMediaQuery("(max-width: 600px)");
//   const { t } = useTranslation("translation", {
//     keyPrefix: "CalendarViewSelector",
//   });

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         padding: "4px",
//         boxSizing: "border-box",
//         gap: "4px",
//         backgroundColor: "#F4F4F5",
//         borderRadius: "12px",
//         width: isMobile ? "100%" : "fit-content",
//       }}
//     >
//       <Button
//         sx={{
//           padding: "8px 16px",
//           backgroundColor: selectedView === "day" ? "#FFF" : "#F4F4F5",
//           transition: "all 0.3s ease",
//           boxShadow:
//             selectedView === "day"
//               ? "0px 1px 4px 0px rgba(0, 0, 0, 0.19);"
//               : "none",
//           "&:hover": {
//             opacity: 0.7,
//             backgroundColor: "#FFF",
//           },
//           width: isMobile ? "100%" : "fit-content",
//         }}
//         onClick={() => setSelectedView("day")}
//       >
//         <Typography
//           variant="body2"
//           fontWeight={600}
//           color={selectedView === "day" ? "text.primary" : "#585C65"}
//         >
//           {t("Day")}
//         </Typography>
//       </Button>
//       <Button
//         sx={{
//           padding: "8px 16px",
//           backgroundColor: selectedView === "week" ? "#FFF" : "#F4F4F5",
//           transition: "all 0.3s ease",
//           boxShadow:
//             selectedView === "week"
//               ? "0px 1px 4px 0px rgba(0, 0, 0, 0.19);"
//               : "none",
//           "&:hover": {
//             opacity: 0.7,
//             backgroundColor: "#FFF",
//           },
//           width: isMobile ? "100%" : "fit-content",
//         }}
//         onClick={() => setSelectedView("week")}
//       >
//         <Typography
//           variant="body2"
//           fontWeight={600}
//           color={selectedView === "week" ? "text.primary" : "#585C65"}
//         >
//           {t("Week")}
//         </Typography>
//       </Button>
//       {/* <Button
//         disabled
//         sx={{
//           padding: '8px 16px',
//           backgroundColor: selectedView === 'month' ? '#FFF' : '#F4F4F5',
//           transition: 'all 0.3s ease',
//           boxShadow: selectedView === "month" ? '0px 1px 4px 0px rgba(0, 0, 0, 0.19);' : 'none',
//           "&:hover": {
//             opacity: 0.7,
//             backgroundColor: '#FFF',
//           },
//           width: isMobile ? '100%' : 'fit-content',
//         }}
//         onClick={() => setSelectedView('month')}
//       >
//         <Typography
//           variant='body2' fontWeight={600}
//           color={selectedView === 'month' ? 'text.primary' : '#585C65'}
//         >
//           {t('Month')}
//         </Typography>
//       </Button> */}
//     </Box>
//   );
// };

// export const WeekHeader = (props: any) => {
//   const today = moment();
//   const isToday = moment(props.date).isSame(today, "day");
//   const isMobile = useMediaQuery("(max-width: 600px)");
//   const { t } = useTranslation("translation");
//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       gap="6px"
//       sx={{
//         cursor: "default",
//       }}
//     >
//       <Typography
//         variant="body"
//         fontSize={14}
//         color={isWeekend(props.date) ? "text.light" : "text.tertiary"}
//       >
//         {moment(props.date).locale(i18next.language).format("ddd")}
//       </Typography>
//       <Box
//         sx={{
//           display: "flex",
//           height: isMobile ? "30px" : "40px",
//           width: isMobile ? "30px" : "40px",
//           borderRadius: "50%",
//           alignItems: "center",
//           justifyContent: "center",
//           backgroundColor: isToday ? "#3872E1" : "transparent",
//         }}
//       >
//         <Typography
//           variant={isMobile ? "body" : "h4"}
//           fontWeight={isMobile ? 600 : 700}
//           color={
//             isToday
//               ? "#FFFFFF"
//               : isWeekend(props.date)
//                 ? "text.light"
//                 : "text.primary"
//           }
//         >
//           {moment(props.date).format("DD")}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// const getCalendarMinMaxHour = (schedules: ScheduleResponse[]) => {
//   const schedulesWithNoEntries = schedules.filter(
//     (schedule) =>
//       !schedule.scheduleEntries || schedule.scheduleEntries.length === 0
//   );
//   if (
//     schedules.length === 0 ||
//     schedulesWithNoEntries.length === schedules.length
//   ) {
//     return { minHour: 8, minMinute: 0, maxHour: 17, maxMinute: 0 };
//   }

//   const earliestStartingTimes = schedules.map((schedule) =>
//     schedule.scheduleEntries?.reduce((min, entry) => {
//       const startingTime = moment(entry.startTime);
//       const entryStart = moment()
//         .hours(startingTime.hours())
//         .minutes(startingTime.minutes())
//         .seconds(0)
//         .milliseconds(0);
//       const minStart = moment(min.startTime);
//       const minEntryStart = moment()
//         .hours(minStart.hours())
//         .minutes(minStart.minutes())
//         .seconds(0)
//         .milliseconds(0);
//       return entryStart.isBefore(minEntryStart) ? entry : min;
//     })
//   );

//   const latestEndingTimes = schedules.map((schedule) =>
//     schedule.scheduleEntries?.reduce((max, entry) => {
//       const endingTime = moment(entry.endTime);
//       const entryEnd = moment()
//         .hours(endingTime.hours())
//         .minutes(endingTime.minutes())
//         .seconds(0)
//         .milliseconds(0);
//       const maxEndingTime = moment(max.endTime);
//       const maxEntryEnd = moment()
//         .hours(maxEndingTime.hours())
//         .minutes(maxEndingTime.minutes())
//         .seconds(0)
//         .milliseconds(0);
//       return entryEnd.isAfter(maxEntryEnd) ? entry : max;
//     })
//   );

//   const earliestStartingTime = earliestStartingTimes.reduce((min, entry) => {
//     const startingTime = moment(entry?.startTime);
//     const entryStart = moment()
//       .hours(startingTime.hours())
//       .minutes(startingTime.minutes())
//       .seconds(0)
//       .milliseconds(0);
//     const minStart = moment(min?.startTime);
//     const minEntryStart = moment()
//       .hours(minStart.hours())
//       .minutes(minStart.minutes())
//       .seconds(0)
//       .milliseconds(0);
//     return entryStart.isBefore(minEntryStart) ? entry : min;
//   });

//   const latestEndingTime = latestEndingTimes.reduce((max, entry) => {
//     const endingTime = moment(entry?.endTime);
//     const entryEnd = moment()
//       .hours(endingTime.hours())
//       .minutes(endingTime.minutes())
//       .seconds(0)
//       .milliseconds(0);
//     const maxEndingTime = moment(max?.endTime);
//     const maxEntryEnd = moment()
//       .hours(maxEndingTime.hours())
//       .minutes(maxEndingTime.minutes())
//       .seconds(0)
//       .milliseconds(0);
//     return entryEnd.isAfter(maxEntryEnd) ? entry : max;
//   });

//   const minHour = earliestStartingTime
//     ? moment(earliestStartingTime?.startTime).hours()
//     : 8;
//   const minMinute = earliestStartingTime
//     ? moment(earliestStartingTime?.startTime).minutes()
//     : 0;
//   const maxHour = latestEndingTime
//     ? moment(latestEndingTime?.endTime).hours()
//     : 17;
//   const maxMinute = latestEndingTime
//     ? moment(latestEndingTime?.endTime).minutes()
//     : 0;

//   return { minHour, minMinute, maxHour, maxMinute };
// };

// const isWeekend = (date: Date) => {
//   const day = date.getDay();
//   return day === 0 || day === 6;
// };

// const isPastDate = (date: Date) => {
//   const today = moment();
//   return moment(date).isBefore(today, "minute");
// };

// export interface CalendarEvent {
//   id: number;
//   title: string;
//   start: Date;
//   end: Date;
//   isResizable?: boolean;
//   isDraggable?: boolean;
//   isDayOff?: boolean;
// }

// const mapUnavailableEvents = (
//   schedules: ScheduleResponse[],
//   minHour: number,
//   minMinute: number,
//   maxHour: number,
//   maxMinute: number,
//   setMyEvents: Dispatch<SetStateAction<CalendarEvent[]>>,
//   t: TFunction,
//   lastFetchedDates: {
//     dateFrom: Date;
//     dateTo: Date;
//   },
//   isRefetch?: boolean
// ) => {
//   // eslint-disable-line max-params
//   moment.tz.setDefault("Europe/Vilnius");
//   const events: CalendarEvent[] = [];
//   const dateFromIndex = isRefetch
//     ? moment(lastFetchedDates.dateTo).tz("Europe/Vilnius").toDate()
//     : moment().tz("Europe/Vilnius").toDate();
//   const dateToIndex = isRefetch
//     ? moment(lastFetchedDates.dateTo).add(29, "days").toDate()
//     : lastFetchedDates.dateTo;
//   const schedulesWithNoEntries = schedules.filter(
//     (schedule) =>
//       !schedule.scheduleEntries || schedule.scheduleEntries.length === 0
//   );

//   if (
//     schedules.length === 0 ||
//     schedulesWithNoEntries.length === schedules.length
//   ) {
//     for (
//       let i = 0;
//       i <= moment(dateToIndex).diff(moment(dateFromIndex), "days");
//       i++
//     ) {
//       const date = moment(dateFromIndex).add(i, "days").toDate();
//       const startBeginning = setDateHours(date, minHour, minMinute);
//       const endBeginning = setDateHours(date, maxHour, maxMinute);
//       const startEventNegativeId =
//         0 -
//         Number(
//           date.getFullYear().toString() +
//             date.getMonth().toString() +
//             date.getDate().toString() +
//             "0"
//         );
//       const startEvent: CalendarEvent = {
//         id: startEventNegativeId,
//         title: t("Unavailable"),
//         start: startBeginning,
//         end: endBeginning,
//         isResizable: false,
//         isDraggable: false,
//         isDayOff: true,
//       };

//       events.push(startEvent);
//     }

//     setMyEvents((previous) => {
//       const filtered = previous.filter(
//         (ev: any) => !events.some((event) => event.id === ev.id)
//       );
//       return [...filtered, ...events];
//     });
//     return;
//   }

//   for (
//     let i = 0;
//     i <= moment(dateToIndex).diff(moment(dateFromIndex), "days");
//     i++
//   ) {
//     const date = moment(dateFromIndex).add(i, "days").toDate();
//     const dayOfWeek = moment(date).weekday();

//     let weekDayHasEntry = false;
//     const scheduleEntryWeekDayMap = new Map<number, ScheduleEntryResponse[]>();
//     schedules.forEach((schedule) => {
//       schedule.scheduleEntries?.forEach((entry) => {
//         if (scheduleEntryWeekDayMap.has(WeekDayEnum[entry.weekday])) {
//           const entries = scheduleEntryWeekDayMap.get(
//             WeekDayEnum[entry.weekday]
//           );
//           entries?.push(entry);
//           scheduleEntryWeekDayMap.set(
//             WeekDayEnum[entry.weekday],
//             entries ?? []
//           );
//         } else {
//           scheduleEntryWeekDayMap.set(WeekDayEnum[entry.weekday], [entry]);
//         }
//       });
//     });

//     schedules.forEach((schedule) => {
//       schedule.scheduleEntries?.forEach((entry) => {
//         const scheduleEntriesForWeekDay = scheduleEntryWeekDayMap.get(
//           WeekDayEnum[entry.weekday]
//         );
//         if (
//           scheduleEntriesForWeekDay &&
//           scheduleEntriesForWeekDay.length === 1
//         ) {
//           const startBeginning = setDateHours(date, minHour, minMinute);
//           const endBeginning = getDateFromTimeString(entry.startTime, date);
//           const startEnd = getDateFromTimeString(entry.endTime, date);
//           const endEnd = setDateHours(date, maxHour, maxMinute);

//           if (WeekDayEnum[dayOfWeek] === entry.weekday) {
//             weekDayHasEntry = true;
//             const startEventNegativeId =
//               0 -
//               Number(
//                 date.getFullYear().toString() +
//                   date.getMonth().toString() +
//                   date.getDate().toString() +
//                   "0"
//               );
//             const startEvent: CalendarEvent = {
//               id: startEventNegativeId,
//               title: t("Unavailable"),
//               start: startBeginning,
//               end: endBeginning,
//               isResizable: false,
//               isDraggable: false,
//               isDayOff: true,
//             };

//             const endEventNegativeId =
//               0 -
//               Number(
//                 date.getFullYear().toString() +
//                   date.getMonth().toString() +
//                   date.getDate().toString() +
//                   "1"
//               );
//             const endEvent: CalendarEvent = {
//               id: endEventNegativeId,
//               title: t("Unavailable"),
//               start: startEnd,
//               end: endEnd,
//               isResizable: false,
//               isDraggable: false,
//               isDayOff: true,
//             };

//             if (
//               !events.some(
//                 (event) =>
//                   hasEqualYearDateHoursAndMinutes(
//                     event.start,
//                     startBeginning
//                   ) && hasEqualYearDateHoursAndMinutes(event.end, endBeginning)
//               )
//             ) {
//               if (
//                 !hasEqualYearDateHoursAndMinutes(startBeginning, endBeginning)
//               ) {
//                 weekDayHasEntry = true;
//                 events.push(startEvent);
//               }

//               if (!hasEqualYearDateHoursAndMinutes(startEnd, endEnd)) {
//                 weekDayHasEntry = true;
//                 events.push(endEvent);
//               }
//             }
//           }
//         } else if (
//           scheduleEntriesForWeekDay &&
//           scheduleEntriesForWeekDay.length > 1
//         ) {
//           const sortedEntriedByStartTime = scheduleEntriesForWeekDay?.sort(
//             (a, b) => {
//               if (a.startTime < b.startTime) {
//                 return -1;
//               }

//               if (a.startTime > b.startTime) {
//                 return 1;
//               }

//               return 0;
//             }
//           );

//           for (let i = 0; i < sortedEntriedByStartTime?.length; i++) {
//             if (i === 0) {
//               const startBeginning = setDateHours(date, minHour, minMinute);
//               const endBeginning = getDateFromTimeString(
//                 sortedEntriedByStartTime[0].startTime,
//                 date
//               );

//               if (WeekDayEnum[dayOfWeek] === entry.weekday) {
//                 weekDayHasEntry = true;
//                 const startOFDayEventNegativeId =
//                   0 -
//                   Number(
//                     date.getFullYear().toString() +
//                       date.getMonth().toString() +
//                       date.getDate().toString() +
//                       "2"
//                   );
//                 const startOFDayEvent: CalendarEvent = {
//                   id: startOFDayEventNegativeId,
//                   title: t("Unavailable"),
//                   start: startBeginning,
//                   end: endBeginning,
//                   isResizable: false,
//                   isDraggable: false,
//                   isDayOff: true,
//                 };

//                 if (
//                   !hasEqualYearDateHoursAndMinutes(
//                     startBeginning,
//                     endBeginning
//                   ) &&
//                   !events.some(
//                     (event) =>
//                       hasEqualYearDateHoursAndMinutes(
//                         event.start,
//                         startBeginning
//                       ) &&
//                       hasEqualYearDateHoursAndMinutes(event.end, endBeginning)
//                   )
//                 ) {
//                   weekDayHasEntry = true;
//                   events.push(startOFDayEvent);
//                 }
//               }
//             } else if (
//               i === sortedEntriedByStartTime.length - 1 &&
//               moment(sortedEntriedByStartTime[i].endTime).toDate().getHours() <
//                 maxHour
//             ) {
//               const startEnd = getDateFromTimeString(
//                 sortedEntriedByStartTime[i].endTime,
//                 date
//               );
//               const endEnd = setDateHours(date, maxHour, maxMinute);

//               if (WeekDayEnum[dayOfWeek] === entry.weekday) {
//                 weekDayHasEntry = true;
//                 const endOfDayEventNegativeId =
//                   0 -
//                   Number(
//                     date.getFullYear().toString() +
//                       date.getMonth().toString() +
//                       date.getDate().toString() +
//                       "3"
//                   );
//                 const endOfDayEvent: CalendarEvent = {
//                   id: endOfDayEventNegativeId,
//                   title: t("Unavailable"),
//                   start: startEnd,
//                   end: endEnd,
//                   isResizable: false,
//                   isDraggable: false,
//                   isDayOff: true,
//                 };

//                 if (
//                   !hasEqualYearDateHoursAndMinutes(startEnd, endEnd) &&
//                   !events.some(
//                     (event) =>
//                       hasEqualYearDateHoursAndMinutes(event.start, startEnd) &&
//                       hasEqualYearDateHoursAndMinutes(event.end, endEnd)
//                   )
//                 ) {
//                   weekDayHasEntry = true;
//                   events.push(endOfDayEvent);
//                 }
//               }
//             }

//             if (
//               (i === 0 && sortedEntriedByStartTime.length === 2) ||
//               i < sortedEntriedByStartTime.length - 1
//             ) {
//               const startMiddle = getDateFromTimeString(
//                 sortedEntriedByStartTime[i].endTime,
//                 date
//               );
//               const endMiddle = getDateFromTimeString(
//                 sortedEntriedByStartTime[i + 1].startTime,
//                 date
//               );

//               if (WeekDayEnum[dayOfWeek] === entry.weekday) {
//                 weekDayHasEntry = true;

//                 const middleEventNegativeId =
//                   0 -
//                   Number(
//                     date.getFullYear().toString() +
//                       date.getMonth().toString() +
//                       date.getDate().toString() +
//                       "4"
//                   );
//                 const event: CalendarEvent = {
//                   id: middleEventNegativeId,
//                   title: t("Unavailable"),
//                   start: startMiddle,
//                   end: endMiddle,
//                   isResizable: false,
//                   isDraggable: false,
//                   isDayOff: true,
//                 };

//                 if (
//                   !hasEqualYearDateHoursAndMinutes(startMiddle, endMiddle) &&
//                   !events.some(
//                     (event) =>
//                       hasEqualYearDateHoursAndMinutes(
//                         event.start,
//                         startMiddle
//                       ) && hasEqualYearDateHoursAndMinutes(event.end, endMiddle)
//                   )
//                 ) {
//                   weekDayHasEntry = true;
//                   events.push(event);
//                 }
//               }
//             }
//           }
//         }
//       });
//     });

//     if (!weekDayHasEntry) {
//       const startBeginning = setDateHours(date, minHour, minMinute);
//       const endBeginning = setDateHours(date, maxHour, maxMinute);

//       const fullDayEventNegativeId =
//         0 -
//         Number(
//           date.getFullYear().toString() +
//             date.getMonth().toString() +
//             date.getDate().toString() +
//             "5"
//         );
//       const event: CalendarEvent = {
//         id: fullDayEventNegativeId,
//         title: t("Unavailable"),
//         start: startBeginning,
//         end: endBeginning,
//         isResizable: false,
//         isDraggable: false,
//         isDayOff: true,
//       };

//       if (
//         !hasEqualYearDateHoursAndMinutes(startBeginning, endBeginning) &&
//         !events.some(
//           (event) =>
//             hasEqualYearDateHoursAndMinutes(event.start, startBeginning) &&
//             hasEqualYearDateHoursAndMinutes(event.end, endBeginning)
//         )
//       ) {
//         weekDayHasEntry = true;
//         events.push(event);
//       }
//     }
//   }

//   setMyEvents((previous) => {
//     const filtered = previous.filter(
//       (ev: any) => !events.some((event) => event.id === ev.id)
//     );
//     return [...filtered, ...events];
//   });
// };

// const hasEqualYearDateHoursAndMinutes = (date1: Date, date2: Date) =>
//   date1.getFullYear() === date2.getFullYear() &&
//   date1.getMonth() === date2.getMonth() &&
//   date1.getDate() === date2.getDate() &&
//   date1.getHours() === date2.getHours() &&
//   date1.getMinutes() === date2.getMinutes();

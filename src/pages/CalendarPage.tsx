/* eslint-disable max-depth */
import { AddRounded } from "@mui/icons-material";
import { Box, Hidden, Typography, useMediaQuery } from "@mui/material";
import {
  EventCreateRequest,
  EventResponse,
  EventUpdateRequest,
} from "api/data-contracts";
import { Event } from "api/Event";
import CalendarHeader from "components/calendar/CalendarHeader";
import WeekHeader, { isWeekend } from "components/calendar/WeekHeader";
import EventCreateEditDialog from "components/EventCreateEditDialog";
import { EventFormValues } from "components/EventCreateEditForm";
import HiveButton from "components/HiveButton";
import HiveLoadingSpinner from "components/HiveLoadingSpinner";
import CalendarEvent from "models/calendar/CalendarEvent";
import moment from "moment-timezone";
import "moment/locale/lt";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Calendar,
  Views,
  momentLocalizer,
  type View,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "src/components/calendar/Calendar.css";
import { createApi } from "utils/api/ApiCreator";
import { getDate } from "utils/ObjectUtils";

moment.tz.setDefault("Europe/Vilnius");
const CalendarPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [myEvents, setMyEvents] = useState<CalendarEvent[]>([]);
  const [selectedView, setSelectedView] = useState<View>("week");
  const [selectedDate, setSelectedDate] = useState<Date>(moment().toDate());
  const [values, setValues] = useState<any>(null);
  const [resizable, setResizable] = useState(true);
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [newCalendarEvent, setNewCalendarEvent] = useState<
    CalendarEvent | undefined
  >();
  const [calendarEventCopy, setCalendarEventCopy] = useState<
    CalendarEvent | undefined
  >();
  const [selectedCalendarEvent, setSelectedCalendarEvent] =
    useState<CalendarEvent>();
  const [selectedEventResponse, setSelectedEventResponse] = useState<
    EventResponse | undefined
  >();
  const [eventDialogOpen, setEventDialogOpen] =
    useState<DialogState>(initialDialogState);
  const [lastFetchedDates, setLastFetchedDates] = useState<LastFetchedDates>(
    initialLastFetchedDates
  );

  moment.locale("lt", {
    week: {
      dow: 1,
    },
  });
  moment.locale("lt");
  const localizer = momentLocalizer(moment);
  const calendarRef = useRef(null);
  const eventAPI = useRef(createApi("event") as Event);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const DnDCalendar = withDragAndDrop(Calendar);

  useEffect(() => {
    getData();

    return () => {
      moment.tz.setDefault("Europe/Vilnius");
    };
  }, []); // eslint-disable-line

  const getData = async () => {
    setIsLoading(true);

    setIsLoading(false);
  };
  const getEventResponses = async (dateFrom?: Date, dateTo?: Date) => {
    if (!dateFrom || !dateTo) {
      const monthBefore = moment().subtract(30, "days").toISOString();
      const monthAfter = moment().add(30, "days").toISOString();
      const query = {
        dateFrom: dateFrom ? dateFrom.toISOString() : monthBefore,
        dateTo: dateTo ? dateTo.toISOString() : monthAfter,
      };

      const eventResponses =
        await eventAPI.current.findAllUserEventsFilteredBy(query);

      mapEventsToCalendarEvents(eventResponses);
      setEvents(eventResponses);
      setLastFetchedDates({
        dateFrom: moment(monthBefore).toDate(),
        dateTo: moment(monthAfter).toDate(),
      });
      return;
    }

    const query = {
      dateFrom: dateFrom?.toISOString(),
      dateTo: dateTo?.toISOString(),
    };

    const updatedLastFetchedDates: LastFetchedDates = {
      dateFrom,
      dateTo,
    };

    const eventResponses =
      await eventAPI.current.findAllUserEventsFilteredBy(query);

    mapEventsToCalendarEvents(eventResponses);
    setEvents(eventResponses);
    setLastFetchedDates(updatedLastFetchedDates);
  };

  const mapEventsToCalendarEvents = (responses: EventResponse[]) => {
    const events: CalendarEvent[] = responses.map((eventResponse) => ({
      id: eventResponse.id || "",
      title: eventResponse.title || "",
      start: moment(eventResponse.eventStart).toDate(),
      end: moment(eventResponse.eventEnd).toDate(),
      isResizable: true,
      isDraggable: true,
    }));

    setMyEvents((previous: any) => {
      const filtered = previous.filter(
        (ev: any) => !responses.some((appointment) => appointment.id === ev.id)
      );
      const newEvents = [...filtered, ...events];
      return newEvents;
    });
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);

    if (
      moment(date).isAfter(moment(lastFetchedDates.dateTo).subtract(10, "days"))
    ) {
      getEventResponses(
        lastFetchedDates.dateFrom,
        moment(lastFetchedDates.dateTo).add(30, "days").toDate()
      );
      return;
    }

    if (
      moment(date).isBefore(moment(lastFetchedDates.dateFrom).add(10, "days"))
    ) {
      getEventResponses(
        moment(lastFetchedDates.dateFrom).subtract(30, "days").toDate(),
        lastFetchedDates.dateTo
      );
    }
  };

  const handleViewChange = (view: View) => {
    setSelectedView(view);
  };

  const handleDialogClose = () => {
    setMyEvents((previous) => {
      if (calendarEventCopy) {
        const filtered = previous.filter(
          (ev: any) => ev.id !== calendarEventCopy.id
        );
        return [...filtered, { ...calendarEventCopy }];
      }

      if (newCalendarEvent) {
        const filtered = previous.filter(
          (ev: any) => ev.id !== newCalendarEvent.id
        );
        return [...filtered];
      }

      return previous;
    });
    setEventDialogOpen({ open: false, objectId: null });
    setNewCalendarEvent(undefined);
    setSelectedCalendarEvent(undefined);
    setSelectedEventResponse(undefined);
    setCalendarEventCopy(undefined);
  };

  const { components, defaultDate, views, formats } = useMemo(
    () => ({
      components: {
        week: {
          header: WeekHeader,
        },
        eventWrapper(props: any) {
          // Create clone of the component but with the new props
          const newProps = {
            ...props,
            style: {
              ...props.style,
            },
            children: {
              ...props.children,
              props: {
                ...props.children.props,
                style: {
                  ...props.children.props.style,
                },
              },
            },
          };
          return <div {...newProps}>{newProps.children}</div>;
        },
      },
      defaultDate: new Date(),
      views: (Object.keys(Views) as Array<keyof typeof Views>).map(
        (k) => Views[k]
      ),
      formats: {
        timeGutterFormat: (date: any, culture: any, localizer: any) =>
          localizer.format(date, "HH:mm", culture),
      },
    }),
    []
  );

  const eventPropGetter = useCallback(
    (event: any) => ({
      ...((!resizable || !event.isResizable) && { className: "nonResizable" }),
      className: getClassName(event),
    }),
    [resizable]
  );

  const dayPropGetter = useCallback(
    (date: any) => ({
      className: isWeekend(date) ? "weekend" : "",
    }),
    []
  );

  const getClassName = (event: any) => {
    let className = "";
    if (isPastDate(event.end)) {
      className += "pastDate";
    }

    if (event.isDayOff) {
      className += " dayOff";
    }

    if (moment(event.end).diff(moment(event.start), "minute") < 45) {
      className += " short-event";
    }

    return className;
  };

  const handleSelectSlot = useCallback(
    ({ start, end }: any) => {
      const newCalendarEvent: CalendarEvent = {
        id: "temp",
        start,
        end,
        title: "New appointment",
        isResizable: true,
        isDraggable: true,
      };
      if (values) {
        setMyEvents((previous) => [...previous, newCalendarEvent]);
      }

      setNewCalendarEvent(newCalendarEvent);
      setEventDialogOpen({ open: true, objectId: "temp" });
    },
    [setMyEvents, values]
  );

  const moveEvent = useCallback(
    async ({
      event,
      start,
      end,
      isAllDay: droppedOnAllDaySlot = false,
    }: any) => {
      const eventResponse = events.find(
        (eventResponse) => eventResponse.id === event.id
      );

      if (!eventResponse) {
        return;
      }

      eventResponse.eventStart = start.toISOString();
      eventResponse.eventEnd = end.toISOString();

      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      setCalendarEventCopy(event);
      setMyEvents((previous: any) => {
        const existing = previous.find((ev: any) => ev.id === event.id) ?? {};
        const filtered = previous.filter((ev: any) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay }];
      });

      setSelectedEventResponse(eventResponse);
      setEventDialogOpen({ open: true, objectId: event.id });
    },
    [setMyEvents, events]
  );

  const resizeEvent = useCallback(
    async ({ event, start, end }: any) => {
      const eventResponse = events.find(
        (eventResponse) => eventResponse.id === event.id
      );

      if (!eventResponse) {
        return;
      }

      eventResponse.eventStart = start.toISOString();
      eventResponse.eventEnd = end.toISOString();

      setCalendarEventCopy(event);
      setMyEvents((previous: any) => {
        const existing = previous.find((ev: any) => ev.id === event.id) ?? {};
        const filtered = previous.filter((ev: any) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });

      setSelectedEventResponse(eventResponse);
      setEventDialogOpen({ open: true, objectId: event.id });
    },
    [setMyEvents, events]
  );

  const selectEvent = useCallback(
    (event: any) => {
      if (event.isDayOff) {
        return;
      }

      const eventResponse = events.find(
        (eventResponse) => eventResponse.id === event.id
      );
      if (!eventResponse) {
        return;
      }

      eventResponse.eventStart = event.start.toISOString();
      eventResponse.eventEnd = event.end.toISOString();

      setSelectedCalendarEvent(event);
      setSelectedEventResponse(eventResponse);
      setMyEvents((previous: any) => {
        const existing = previous.find((ev: any) => ev.id === event.id) ?? {};
        const filtered = previous.filter((ev: any) => ev.id !== event.id);
        return [...filtered, { ...existing, selected: true }];
      });
      setEventDialogOpen({ open: true, objectId: event.id });
    },
    [setMyEvents, events]
  );

  const handleSubmit = async (values: EventFormValues) => {
    setValues(values);

    if (
      !values.description ||
      !values.location ||
      !values.eventStart ||
      !values.eventEnd ||
      !values.date
    ) {
      return;
    }

    if (
      eventDialogOpen.objectId &&
      events.some(
        (eventResponse) => eventResponse.id === eventDialogOpen.objectId
      )
    ) {
      const eventUpdateRequest: EventUpdateRequest = {
        id: eventDialogOpen.objectId,
        title: values.title,
        description: values.description,
        location: values.location,
        eventStart: getDate(
          values.date ?? values.eventStart,
          values.eventStart
        ).toISOString(),
        eventEnd: getDate(
          values.date ?? values.eventEnd,
          values.eventEnd
        ).toISOString(),
      };

      await eventAPI.current.update(eventUpdateRequest);
      setEventDialogOpen({ open: false, objectId: null });
      setCalendarEventCopy(undefined);
      setSelectedCalendarEvent(undefined);
      setSelectedEventResponse(undefined);
      await getEventResponses();
      return;
    }

    const eventCreateRequest: EventCreateRequest = {
      title: values.title,
      description: values.description,
      location: values.location,
      eventStart: getDate(
        values.date ?? values.eventStart,
        values.eventStart
      ).toISOString(),
      eventEnd: getDate(
        values.date ?? values.eventEnd,
        values.eventEnd
      ).toISOString(),
    };

    await eventAPI.current.create(eventCreateRequest);
    setEventDialogOpen({ open: false, objectId: null });
    if (newCalendarEvent) {
      setMyEvents((previous) => {
        const filtered = previous.filter(
          (ev: any) => ev.id !== newCalendarEvent.id
        );
        return [...filtered];
      });
      setNewCalendarEvent(undefined);
    }

    setCalendarEventCopy(undefined);
    setSelectedCalendarEvent(undefined);
    setSelectedEventResponse(undefined);
    await getEventResponses();
  };

  if (isLoading) {
    return <HiveLoadingSpinner />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: isMobile ? "150%" : "100%",
        gap: isMobile ? "1rem" : "2rem",
        padding: isMobile ? "1rem" : "3rem",
        paddingBottom: "8rem",
        boxSizing: "border-box",
      }}
      className="height600"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h2">Calendar</Typography>
        {!isMobile && (
          <HiveButton
          compact
            startIcon={<AddRounded />}
            variant="contained"
            text="New appointment"
            onClick={() => {
              setEventDialogOpen({ open: true, objectId: null });
            }}
          />
        )}
      </Box>
      <CalendarHeader
        selectedDate={selectedDate}
        selectedView={selectedView}
        setSelectedDate={handleDateChange}
        setSelectedView={handleViewChange}
      />
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          height: "100%",
          padding: isMobile ? "0.75rem" : "1.5rem",
          marginBottom: isMobile ? "4rem" : "0",
        }}
      >
        <DnDCalendar
          ref={calendarRef}
          popup
          showMultiDayTimes
          resizable
          selectable
          style={{
            width: "100%",
          }}
          draggableAccessor={(event: any) => event.isDraggable}
          defaultView="week"
          localizer={localizer}
          components={components}
          toolbar={false}
          defaultDate={defaultDate}
          events={myEvents}
          formats={formats}
          date={selectedDate}
          view={selectedView}
          min={moment(selectedDate).hours(8).minutes(0).toDate()}
          max={moment(selectedDate).hours(17).minutes(0).toDate()}
          eventPropGetter={eventPropGetter}
          dayPropGetter={dayPropGetter}
          step={15}
          views={views}
          timeslots={4}
          resizableAccessor={(event: any) =>
            event.isResizable && !isPastDate(event.start)
          }
          selected={selectedCalendarEvent}
          onSelectSlot={handleSelectSlot}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          onSelectEvent={selectEvent}
        />
        <Hidden mdUp>
          <Box
            sx={{
              display: "flex",
              padding: "1rem",
              position: "fixed",

              right: "0",
              bottom: "0",
              zIndex: 99,
            }}
          >
            <HiveButton
              text="Appointment"
              startIcon={<AddRounded />}
              onClick={() => {
                setEventDialogOpen({ open: true, objectId: null });
              }}
            />
          </Box>
        </Hidden>
      </Box>
      {eventDialogOpen.open && (
        <EventCreateEditDialog
          open={eventDialogOpen.open}
          isEdit={newCalendarEvent?.id !== "temp"}
          dialogTitle={
            eventDialogOpen.objectId ? "Edit appointment" : "New appointment"
          }
          event={selectedEventResponse}
          newEvent={newCalendarEvent}
          handleSubmit={handleSubmit}
          handleClose={handleDialogClose}
          handleCancel={handleDialogClose}
        />
      )}
    </Box>
  );
};

export default CalendarPage;

const isPastDate = (date: Date) => {
  const today = moment();
  return moment(date).isBefore(today, "minute");
};

interface LastFetchedDates {
  dateFrom: Date;
  dateTo: Date;
}

const initialLastFetchedDates: LastFetchedDates = {
  dateFrom: moment().subtract(30, "days").toDate(),
  dateTo: moment().add(30, "days").toDate(),
};

export interface DialogState {
  open: boolean;
  objectId: string | null;
}

export const initialDialogState: DialogState = {
  open: false,
  objectId: null,
};

const hasEqualYearDateHoursAndMinutes = (date1: Date, date2: Date) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate() &&
  date1.getHours() === date2.getHours() &&
  date1.getMinutes() === date2.getMinutes();

export abstract class Observable<Event> {
  protected subscribersMap = new Map<keyof Event, Event[keyof Event][]>();

  addSubscriber<EventName extends keyof Event>(
    eventName: EventName,
    subscriber: Event[EventName],
  ) {
    if (!this.subscribersMap.has(eventName)) {
      this.subscribersMap.set(eventName, []);
    }

    this.subscribersMap.get(eventName).push(subscriber);
  }

  publishEvent<EventName extends keyof Event>(
    event: EventName,
    wrappedSubscriber: (fn: Event[EventName]) => Promise<void>,
  ) {
    const subscribers = this.subscribersMap.get(event) || [];
    subscribers.forEach((subscriber) =>
      wrappedSubscriber(subscriber as Event[EventName]),
    );
  }
}

export const addAvailableSpots = (meetup) => ({
  ...meetup.toObject(),
  availableSpots: meetup.capacity - meetup.attendees.length,
});

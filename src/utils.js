function getResultsFromResponse (res) {
  const { coordinates, duration, distance } = res;
  return {
    coordinates,
    duration: parseFloat(duration / 3600).toFixed(2),
    distance: parseFloat(distance / 1000).toFixed(2)
  }
}

function formatCoordinatesForAPICall (rawCoordinates) {
  return rawCoordinates.map(pair => [pair.lng, pair.lat])
}

function createPayload ({markers, carType, fragileCargo, maxSpeed}) {
  const formattedCoordinates = formatCoordinatesForAPICall(markers);
  console.log(carType)
  return {
    coordinates: formattedCoordinates,
    carType: carType === 'Car' ? 'car' : 'heavy',
    fragileCargo,
    maxSpeed
  }
}

module.exports = { getResultsFromResponse, createPayload };